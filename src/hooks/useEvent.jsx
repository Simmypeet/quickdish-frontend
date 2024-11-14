// @ts-check

import { EventHandlerContext, EventHandler } from '../context/EventProvider';
import { useContext } from 'react';

/**
 * @returns {EventHandler}
 */
export default function useEventHandler() {
    const contextValue = useContext(EventHandlerContext);

    if (!contextValue) {
        throw new Error('useEventHandler must be used within an EventProvider');
    }

    const { eventHandler } = contextValue;

    return eventHandler;
}
