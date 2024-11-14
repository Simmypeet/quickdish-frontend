// @ts-check

import EventSourceStream from '@server-sent-stream/web';
import { createContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import React from 'react';
import axios from 'axios';

/**
 * @import { AxiosInstance } from 'axios';
 * @import { Notification } from '../types/event';
 */

export class EventHandler {
    constructor() {
        /**
         * @private
         * @type {((notification: Notification) => void)[]}
         */
        this.callbacks = [];
        /**
         * @private
         * @type {boolean}
         */
        this.connected = false;
        /**
         * @private
         * @type {AbortController}
         */
        this.controller = new AbortController();
    }

    /**
     *
     * @param {AxiosInstance} axiosPrivate
     */
    initiateConnection(axiosPrivate) {
        this.controller = new AbortController();
        this.connected = true;

        this.connection = axiosPrivate
            .get(`/events`, {
                validateStatus: (status) => status === 200,
                headers: {
                    Accept: 'text/event-stream',
                },
                responseType: 'stream',
                adapter: 'fetch',
                signal: this.controller.signal,
            })
            .then(async (response) => {
                let test = this;
                const stream = response.data;

                const decoder = new EventSourceStream();
                stream.pipeThrough(decoder);

                const reader = decoder.readable.getReader();

                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        break;
                    }

                    const notification = JSON.parse(value.data);

                    test.callbacks.forEach((callback) => {
                        callback(notification);
                    });
                }
            })
            .catch(() => {});
    }

    /**
     *
     * @param {(notification: Notification) => void} callback
     *
     * @returns {() => void} A cleanup function used to remove the callback
     */
    addCallback(callback) {
        this.callbacks.push(callback);

        return () => {
            this.callbacks = this.callbacks.filter((cb) => cb !== callback);
        };
    }

    /**
     * Close the connection
     */
    close() {
        this.connected = false;
        this.controller.abort();
    }
}

/**
 * @typedef {Object} EventHandlerContextValue
 *
 * @property {EventHandler} eventHandler
 * @property {React.Dispatch<React.SetStateAction<EventHandler>>} setEventHandler
 */

export const EventHandlerContext = createContext(
    /** @type{undefined | EventHandlerContextValue} */ (undefined)
);

/**
 * Place this component at the place where you want to recieve events from the
 * server. Please be aware that this component will open a SSE connection to the
 * server and there's a hard limit on the number of connections that can be open
 * at the same time (most likely 6).
 *
 * @param {{children: React.ReactNode}} props
 * @returns {React.ReactNode}
 */
export const EventHandlerProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const [eventHandler, setEventHandler] = useState(
        /** @type{() => EventHandler}*/ (
            () => {
                return new EventHandler();
            }
        )
    );

    // cleanup the event handler when the component is unmounted
    useEffect(() => {
        eventHandler.initiateConnection(axiosPrivate);
        return () => {
            eventHandler.close();
        };
    }, [axiosPrivate, eventHandler]);

    return (
        <EventHandlerContext.Provider
            value={{
                eventHandler,
                setEventHandler,
            }}
        >
            {children}
        </EventHandlerContext.Provider>
    );
};
