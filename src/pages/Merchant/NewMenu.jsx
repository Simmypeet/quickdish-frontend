// @ts-check

import React, { createContext, Fragment, useRef, useState } from 'react';

import merge from '../../utils/className';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faClock,
    faClose,
    faEdit,
    faInfoCircle,
    faPlus,
    faPlusCircle,
    faStore,
    faTag,
    faTrash,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons/faUserSlash';

/**
 * @import {Customization} from '../../types/restaurant'
 */

/**
 * @param {{
 *  text: string,
 *  onclick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
 *  className?: string,
 * }} param0
 */
const GradientTextButton = ({ text, onclick, className }) => {
    return (
        <button
            onClick={onclick}
            className={merge(
                `rounded-md bg-gradient-to-r from-orange-300 to-red-500 
                px-2 py-1 text-sm font-semibold text-white drop-shadow-md`,
                className
            )}
        >
            {text}
        </button>
    );
};

/**
 * @typedef {Object} NewMenuContextValue
 *
 * @property {string} menuName
 * @property {React.Dispatch<React.SetStateAction<string>>} setMenuName
 * @property {string} menuDescription
 * @property {React.Dispatch<React.SetStateAction<string>>} setMenuDescription
 * @property {string} estimatedTime
 * @property {React.Dispatch<React.SetStateAction<string>>} setEstimatedTime
 * @property {string} price
 * @property {React.Dispatch<React.SetStateAction<string>>} setPrice
 * @property {Customization[]} customizations
 * @property {React.Dispatch<React.SetStateAction<Customization[]>>} setCustomizations
 */

const NewMenuContext = createContext(
    /**@type{undefined | NewMenuContextValue}*/ (undefined)
);

const NewMenuProvider = ({ children }) => {
    const [menuName, setMenuName] = useState('');
    const [menuDescription, setMenuDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [price, setPrice] = useState('');
    const [customizations, setCustomizations] = useState(
        /**@type{Customization[]}*/ ([
            {
                title: 'Size',
                description: 'Choose a size',
                unique: true,
                required: true,
                id: 1,
                options: [
                    {
                        name: 'Small',
                        extra_price: '0',
                    },
                    {
                        name: 'Medium',
                        extra_price: '0',
                    },
                    {
                        name: 'Large',
                        extra_price: '10',
                    },
                ],
                menu_id: 1,
            },
        ])
    );

    return (
        <NewMenuContext.Provider
            value={{
                menuName,
                setMenuName,
                menuDescription,
                setMenuDescription,
                estimatedTime,
                setEstimatedTime,
                price,
                setPrice,
                customizations,
                setCustomizations,
            }}
        >
            {children}
        </NewMenuContext.Provider>
    );
};

/**
 * @returns {NewMenuContextValue}
 */
const useNewMenu = () => {
    const context = React.useContext(NewMenuContext);
    if (context === undefined) {
        throw new Error('useNewMenu must be used within a NewMenuProvider');
    }
    return context;
};

/**
 *
 * @param {{title: string}} prop
 * @returns
 */
const SubTitle = ({ title }) => {
    return <h2 className="text-xl font-semibold">{title}</h2>;
};

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
 * @param {{index: number}} prop
 * @returns {React.ReactNode}
 */
const CustomizationOption = ({ index }) => {
    const { customizations, setCustomizations } = useNewMenu();

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
                <div className="font-semibold text-slate-600">Name</div>
                <div className="font-semibold text-slate-600">Extra Price</div>
                <FontAwesomeIcon
                    icon={faPlus}
                    className="my-auto text-sm text-slate-600"
                />
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
                    customizations[index].options.map((option, optionIndex) => (
                        <Fragment key={optionIndex}>
                            <div
                                className={merge(
                                    'relative flex h-6 w-full items-center',
                                    optionIndex % 2 == 0
                                        ? 'rounded-l-md border-y border-l bg-slate-50'
                                        : ''
                                )}
                            >
                                <input
                                    className="absolute left-2 right-0 bg-transparent"
                                    value={option.name}
                                    onChange={(e) => {
                                        const newCustomizations = [
                                            ...customizations,
                                        ];
                                        newCustomizations[index].options[
                                            optionIndex
                                        ].name = e.target.value;
                                        setCustomizations(newCustomizations);
                                    }}
                                    type="text"
                                ></input>
                            </div>
                            <div
                                className={merge(
                                    'relative flex h-6 w-full items-center',
                                    optionIndex % 2 == 0
                                        ? 'border-y bg-slate-50'
                                        : ''
                                )}
                            >
                                <input
                                    className="
                                        absolute left-0 right-0 bg-transparent 
                                        text-center
                                    "
                                    value={option.extra_price ?? ''}
                                    onChange={(e) => {
                                        const newCustomizations = [
                                            ...customizations,
                                        ];
                                        newCustomizations[index].options[
                                            optionIndex
                                        ].extra_price = e.target.value;
                                        setCustomizations(newCustomizations);
                                    }}
                                    placeholder="Free"
                                    type="number"
                                ></input>
                            </div>
                            <div
                                className={merge(
                                    'my-auto flex h-full pr-2 text-xs text-slate-600',
                                    optionIndex % 2 == 0
                                        ? 'rounded-r-md border-y border-r bg-slate-50'
                                        : ''
                                )}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="my-auto"
                                />
                            </div>
                        </Fragment>
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
const CustomizationBox = ({ index }) => {
    const { customizations, setCustomizations } = useNewMenu();

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
                            my-auto cursor-text text-xs text-slate-600
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
                            my-auto cursor-text text-xs text-slate-600
                        "
                        onClick={() => {
                            if (customizationTitleRef.current) {
                                customizationTitleRef.current.focus();
                            }
                        }}
                    />
                </div>
                <hr />

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
                    <TextBox
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
                    <CustomizationOption index={index} />
                </div>
            </div>
        </form>
    );
};

/**
 * @returns {React.ReactNode}
 */
const Customizations = () => {
    const { customizations, setCustomizations } = useNewMenu();

    return (
        <TopicBox title={<SubTitle title="Customizations" />}>
            <div className="mx-auto flex min-h-32 w-full flex-col rounded-md ">
                {customizations.length == 0 ? (
                    <div
                        className="
                            flex flex-grow flex-col items-center justify-center
                            gap-y-1 text-slate-500 
                        "
                    >
                        <FontAwesomeIcon icon={faUserSlash} />
                        <div>You haven't add any customizations</div>

                        <div
                            className="
                                w-fit cursor-pointer self-center rounded-md 
                                border border-orange-500 bg-white px-2 py-1 
                                text-sm font-semibold text-orange-500 
                                drop-shadow-md hover:bg-orange-500 
                                hover:text-white hover:drop-shadow-lg
                            "
                        >
                            Add Customization
                        </div>
                    </div>
                ) : (
                    <div className="">
                        {customizations.map((_, id) => (
                            <CustomizationBox key={id} index={id} />
                        ))}
                    </div>
                )}
            </div>
        </TopicBox>
    );
};

/**
 *
 * @param {{
 *  icon: import('@fortawesome/fontawesome-svg-core').IconDefinition,
 *  value: string,
 *  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
 *  placeholder: string,
 *  type: 'text' | 'number',
 *  className?: string
 * }} param0
 * @returns
 */
const TextBox = ({ icon, value, onChange, placeholder, type, className }) => {
    return (
        <div className={merge('relative flex flex-col gap-y-1', className)}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full rounded-md border border-slate-300 px-2 py-1
                    pl-7 text-sm focus:border-blue-300 
                    focus:outline-none focus:ring-1 focus:ring-blue-300
                "
            />
            <div className="absolute left-0 top-0 flex h-full p-2">
                <FontAwesomeIcon
                    icon={icon}
                    className="my-auto text-sm text-slate-500"
                />
            </div>
        </div>
    );
};

/**
 * @returns {React.ReactNode}
 */
const BasicInformation = () => {
    const {
        menuName,
        setMenuName,
        menuDescription,
        setMenuDescription,
        estimatedTime,
        setEstimatedTime,
        price,
        setPrice,
    } = useNewMenu();

    return (
        <TopicBox title=<SubTitle title="Basic Information" />>
            <form
                className="
                    mx-autobg-blue-200 justify-between2 mx-auto 
                    flex w-full max-w-96 grow basis-2/3
                    flex-col gap-y-2
                "
            >
                <TextBox
                    icon={faUtensils}
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                    placeholder={'Menu Name'}
                    type={'text'}
                />
                <TextBox
                    icon={faTag}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={'Price'}
                    type={'number'}
                />
                <TextBox
                    icon={faClock}
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder={'Estimated Preparation Time'}
                    type={'number'}
                />
                <TextBox
                    icon={faInfoCircle}
                    value={menuDescription}
                    onChange={(e) => setMenuDescription(e.target.value)}
                    placeholder={'Description'}
                    type={'text'}
                />
            </form>
        </TopicBox>
    );
};

/**
 *
 * @param {{
 * title: React.ReactNode,
 * children?: React.ReactNode,
 * className?: string
 * }} props
 *
 * @returns {React.ReactNode}
 */
const TopicBox = ({ title, children, className }) => {
    return (
        <div className={merge(`flex flex-col rounded-md`, className)}>
            {title}

            <hr className="my-2 w-full"></hr>

            {children}
        </div>
    );
};

/**
 * @param {{}} prop
 *
 * @returns {React.ReactNode}
 */
export default ({}) => {
    return (
        <NewMenuProvider>
            <div
                className="
                    fixed left-0 top-0 grid h-full w-full bg-black 
                    bg-opacity-10
                "
            >
                <div
                    className="
                        relative mx-auto my-auto flex h-[90%] w-fit 
                        min-w-96 flex-col rounded-md bg-white p-4
                    "
                >
                    <h1 className="text-2xl font-semibold">New Menu</h1>
                    <hr className="my-2" />
                    <FontAwesomeIcon
                        icon={faClose}
                        className="
                            absolute right-5 top-5 cursor-pointer font-light 
                            text-slate-600
                        "
                    />
                    <div className="flex h-full flex-col px-2">
                        <div
                            className="
                                flex h-0 grow flex-col gap-y-2 
                                overflow-y-auto
                            "
                        >
                            <BasicInformation />
                            <Customizations />

                            <div className="h-0 grow"></div>

                            <GradientTextButton
                                text="Confirm"
                                className="sticky bottom-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </NewMenuProvider>
    );
};
