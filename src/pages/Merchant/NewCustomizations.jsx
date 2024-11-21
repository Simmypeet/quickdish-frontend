// @ts-check

import React, { createContext, Fragment, useRef, useState } from 'react';
import Modal from '../../components/Modal';
import merge from '../../utils/className';
import { Title } from '../../components/Title';
import GradientTextButton from '../../components/GradientTextButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faEdit,
    faPlus,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';

/**
 * @import {CustomizationCreate} from '../../types/restaurant'
 */

/**
 * @typedef {Object} NewCustomizationsContextValue
 *
 * @property {number} menu_id
 * @property {CustomizationCreate[]} customizations
 * @property {React.Dispatch<React.SetStateAction<CustomizationCreate[]>>} setCustomizations
 */

const NewCustomizationsContext = createContext(
    /** @type {undefined | NewCustomizationsContextValue} */ (undefined)
);

/**
 *
 * @param {{
 *  title: string,
 *  description: string,
 *  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
 *  checked: boolean
 * }} param0
 * @returns
 */
const OptionCheckBox = ({ title, description, onChange, checked }) => {
    return (
        <div className="flex flex-col gap-y-1">
            <div className="flex flex-row justify-between gap-x-2">
                <div>
                    <div className="">{title}</div>
                    <div className="line-clamp-1 text-sm text-slate-600">
                        {description}
                    </div>
                </div>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
            </div>
            <hr />
        </div>
    );
};

/**
 *
 * @param {{
 *  customizationIndex: number,
 *  optionIndex: number
 * }} props
 * @returns {React.ReactNode}
 */
const Option = ({ customizationIndex, optionIndex }) => {
    const { customizations, setCustomizations } = useNewCustomizations();
    const duplicated = customizations[customizationIndex].options.some(
        (option, i) =>
            option.name ==
                customizations[customizationIndex].options[optionIndex].name &&
            i != optionIndex
    );
    const noName =
        customizations[customizationIndex].options[optionIndex].name.trim() ==
        '';

    return (
        <>
            <div
                className={merge(
                    'relative flex h-6 w-full items-center',
                    optionIndex % 2 == 0
                        ? 'rounded-l-md border-y border-l bg-slate-50'
                        : ''
                )}
            >
                <input
                    className="absolute left-2 right-0 bg-transparent text-sm"
                    value={
                        customizations[customizationIndex].options[optionIndex]
                            .name
                    }
                    onChange={(e) => {
                        const newCustomizations = [...customizations];
                        newCustomizations[customizationIndex].options[
                            optionIndex
                        ].name = e.target.value;
                        setCustomizations(newCustomizations);
                    }}
                    type="text"
                ></input>
            </div>
            <div
                className={merge(
                    'relative flex h-6 w-full items-center text-sm',
                    optionIndex % 2 == 0 ? 'border-y bg-slate-50' : ''
                )}
            >
                <input
                    className="
                        absolute left-0 right-0 bg-transparent text-center
                    "
                    value={
                        customizations[customizationIndex].options[optionIndex]
                            .extra_price ?? ''
                    }
                    onChange={(e) => {
                        const newCustomizations = [...customizations];
                        newCustomizations[customizationIndex].options[
                            optionIndex
                        ].extra_price = e.target.value;
                        setCustomizations(newCustomizations);
                    }}
                    placeholder="Free"
                    type="number"
                ></input>
            </div>
            <button
                className={merge(
                    `my-auto flex h-full cursor-pointer pr-2 
                                    text-xs text-slate-600`,
                    optionIndex % 2 == 0
                        ? 'rounded-r-md border-y border-r bg-slate-50'
                        : ''
                )}
                onClick={(e) => {
                    e.preventDefault();
                    const newCustomizations = [...customizations];
                    newCustomizations[customizationIndex].options =
                        newCustomizations[customizationIndex].options.filter(
                            (_, i) => i !== optionIndex
                        );
                    setCustomizations(newCustomizations);
                }}
            >
                <FontAwesomeIcon icon={faTrash} className="my-auto" />
            </button>
            {noName ? (
                <div className="col-span-3 my-1 text-xs italic text-red-400">
                    * option name cannot be empty
                </div>
            ) : duplicated ? (
                <div className="col-span-3 my-1 text-xs italic text-red-400">
                    * option name already exists
                </div>
            ) : null}
        </>
    );
};

/**
 * @param {{index: number}} prop
 * @returns {React.ReactNode}
 */
const OptionsTopic = ({ index }) => {
    const { customizations, setCustomizations } = useNewCustomizations();

    return (
        <div>
            <h1 className="mt-1 text-lg font-semibold">Options</h1>
            <hr className="my-2" />
            <div
                className="
                    grid grid-cols-[2fr_1fr_auto] items-center rounded-md 
                    bg-white px-2 py-2 shadow-inner
                "
            >
                <div className="text-sm font-semibold text-slate-600">Name</div>
                <div className="text-sm font-semibold text-slate-600">
                    Extra Price
                </div>
                <button
                    className="my-auto cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        const newCustomizations = [...customizations];
                        newCustomizations[index].options.push({
                            name: 'New Option',
                            extra_price: null,
                            description: null,
                        });
                        setCustomizations(newCustomizations);
                    }}
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="text-sm text-slate-600"
                    />
                </button>
                <hr className="col-span-3 my-2" />
                {customizations[index].options.length == 0 ? (
                    <div
                        className="
                            col-span-3 text-center italic text-slate-600
                        "
                    >
                        You haven't added any options
                    </div>
                ) : (
                    customizations[index].options.map((_, optionIndex) => (
                        <Option
                            key={optionIndex}
                            customizationIndex={index}
                            optionIndex={optionIndex}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

/**
 * @param {{index: number}} prop
 * @returns {React.ReactNode}
 */
const Customization = ({ index }) => {
    const { customizations, setCustomizations } = useNewCustomizations();
    const duplicated = customizations.some(
        (customization, i) =>
            customization.title == customizations[index].title && i != index
    );
    const noName = customizations[index].title.trim() == '';

    const customizationTitleRef = useRef(
        /**@type{HTMLInputElement | null}*/ (null)
    );

    return (
        <form>
            <div
                className="
                    w-full rounded-md bg-slate-50 px-2 py-2 shadow-inner
                "
            >
                <div className="flex flex-row gap-x-2">
                    <input
                        type="text"
                        value={customizations[index].title}
                        placeholder="Customization Name"
                        onChange={(e) => {
                            const newCustomizations = [...customizations];
                            newCustomizations[index].title = e.target.value;
                            setCustomizations(newCustomizations);
                        }}
                        className="
                            w-full grow bg-transparent text-lg 
                            font-semibold focus:outline-none
                        "
                        ref={customizationTitleRef}
                    />
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="
                            text-xstext-slate-600 my-auto cursor-text
                        "
                        onClick={() => {
                            if (customizationTitleRef.current) {
                                customizationTitleRef.current.focus();
                            }
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="
                            my-auto cursor-pointer text-xs text-slate-600
                        "
                        onClick={() => {
                            setCustomizations(
                                customizations.filter((_, i) => i !== index)
                            );
                        }}
                    />
                </div>
                <hr />

                {duplicated ? (
                    <div className="my-1 text-xs italic text-red-400">
                        * customization name already exists
                    </div>
                ) : noName ? (
                    <div className="my-1 text-xs italic text-red-400">
                        * customization name cannot be empty
                    </div>
                ) : null}

                <div
                    className="
                        my-2 flex flex-col gap-y-2 rounded-md px-2  
                    "
                >
                    <OptionCheckBox
                        title={'Unique'}
                        description={'Allows only one option to be selected'}
                        onChange={(e) => {
                            const newCustomizations = [...customizations];
                            newCustomizations[index].unique = e.target.checked;
                            setCustomizations(newCustomizations);
                        }}
                        checked={customizations[index].unique}
                    />
                    <OptionCheckBox
                        title={'Required'}
                        description={'At least one option must be selected'}
                        onChange={(e) => {
                            const newCustomizations = [...customizations];
                            newCustomizations[index].required =
                                e.target.checked;
                            setCustomizations(newCustomizations);
                        }}
                        checked={customizations[index].required}
                    />
                    <InputBoxWithIcon
                        icon={faCircleInfo}
                        value={customizations[index].description ?? ''}
                        onChange={(e) => {
                            const newCustomizations = [...customizations];
                            newCustomizations[index].description =
                                e.target.value;
                            setCustomizations(newCustomizations);
                        }}
                        placeholder={'Description of Customization'}
                        type={'text'}
                    />
                    <OptionsTopic index={index} />
                    {/* <CustomizationOption index={index} /> */}
                </div>
            </div>
        </form>
    );
};

/**
 *
 * @param {{
 *  children: React.ReactNode,
 *  menu_id: number
 * }} param0
 * @returns {React.ReactNode}
 */
const NewCustomizationsProvider = ({ children, menu_id }) => {
    const [customizations, setCustomizations] = useState(
        /** @type{CustomizationCreate[]} */ ([])
    );
    return (
        <NewCustomizationsContext.Provider
            value={{ menu_id, customizations, setCustomizations }}
        >
            {children}
        </NewCustomizationsContext.Provider>
    );
};

/**
 * @returns {NewCustomizationsContextValue}
 */
const useNewCustomizations = () => {
    const value = React.useContext(NewCustomizationsContext);

    if (value === undefined) {
        throw new Error(
            'useNewCustomizations must be used within a NewCustomizationsProvider'
        );
    }

    return value;
};

const Customizations = () => {
    const { customizations, setCustomizations } = useNewCustomizations();

    return (
        <Fragment>
            {customizations.length == 0 ? (
                <div className="p-2 text-center italic text-slate-600">
                    You haven't added any customizations
                </div>
            ) : (
                customizations.map((_, index) => (
                    <Customization key={index} index={index} />
                ))
            )}

            <div
                className="
                    flex cursor-pointer flex-col items-center rounded-md
                    bg-slate-50 p-2 text-sm font-semibold text-slate-600
                    shadow-inner hover:bg-slate-100
                "
                onClick={() => {
                    const newCustomizations = [...customizations];
                    newCustomizations.push({
                        title: 'New Customization',
                        description: null,
                        unique: false,
                        required: false,
                        menu_id: 0,
                        options: [],
                    });
                    setCustomizations(newCustomizations);
                }}
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>New Customization</span>
            </div>
        </Fragment>
    );
};

const ConfirmButton = ({ onSubmit }) => {
    const { customizations } = useNewCustomizations();

    return (
        <GradientTextButton
            className="sticky bottom-0"
            onClick={() => {
                onSubmit(customizations);
            }}
        >
            Confirm
        </GradientTextButton>
    );
};

/**
 * @param {{
 *  menu_id: number
 *  onSubmit: (customizations: CustomizationCreate[]) => void
 * }} prop
 *
 * @returns {React.ReactNode}
 */
export default ({ menu_id, onSubmit }) => {
    return (
        <NewCustomizationsProvider menu_id={menu_id}>
            <Modal
                onClose={undefined}
                title={<Title>New Customizations</Title>}
                className="flex w-fit min-w-96 flex-col"
            >
                <div className="flex h-full flex-col px-2">
                    <div
                        className="
                            flex h-0 grow flex-col gap-y-2 overflow-y-auto
                        "
                    >
                        {/* <Customizations /> */}
                        <Customizations />

                        <div className="h-0 grow"></div>
                        <ConfirmButton onSubmit={onSubmit} />
                    </div>
                </div>
            </Modal>
        </NewCustomizationsProvider>
    );
};
