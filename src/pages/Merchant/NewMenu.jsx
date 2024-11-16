// @ts-check

import React, { createContext, Fragment, useState } from 'react';

import merge from '../../utils/className';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faClock,
    faClose,
    faInfoCircle,
    faPlus,
    faTag,
    faTrash,
    faUpload,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { Subtitle, Title } from '../../components/Title';
import Modal, { TopicBox } from '../../components/Modal';
import GradientTextButton from '../../components/GradientTextButton';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';

/**
 * @import { CustomizationCreate } from '../../types/restaurant'
 */

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
 * @property {CustomizationCreate[]} customizations
 * @property {React.Dispatch<React.SetStateAction<CustomizationCreate[]>>} setCustomizations
 * @property {File | null} image
 * @property {React.Dispatch<React.SetStateAction<File | null>>} setImage
 */

const NewMenuContext = createContext(
    /**@type{undefined | NewMenuContextValue}*/ (undefined)
);

const NewMenuProvider = ({ children }) => {
    const [menuName, setMenuName] = useState('');
    const [menuDescription, setMenuDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(/**@type{File | null}*/ (null));
    const [customizations, setCustomizations] = useState(
        /**@type{CustomizationCreate[]}*/ ([
            {
                title: 'Size',
                description: 'Choose a size',
                unique: true,
                required: true,
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
                image,
                setImage,
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
 * @returns {React.ReactNode}
 */
const MenuImageUpload = () => {
    const { setImage, image } = useNewMenu();
    const [error, setError] = useState(
        /**@type{'oneImage'|'notImage'|undefined} */ (undefined)
    );

    return (
        <TopicBox title={<Subtitle>Menu Image</Subtitle>}>
            <div className="aspect-square h-auto w-full p-3">
                <div
                    className={merge(
                        `flex aspect-square h-auto w-full rounded-md border 
                        border-dashed border-slate-300 bg-slate-50 
                        shadow-inner`,
                        image == null ? 'cursor-pointer' : ''
                    )}
                    onDrop={(e) => {
                        e.preventDefault();

                        // already have an image
                        if (image) return;

                        // expect only one image file

                        if (e.dataTransfer.items.length > 1) {
                            setError('oneImage');
                            return;
                        }

                        const file = e.dataTransfer.items[0].getAsFile();

                        if (!file) return;

                        // must be an image
                        if (!file.type.startsWith('image')) {
                            setError('notImage');
                            return;
                        }

                        setError(undefined);
                        setImage(file);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                    onClick={() => {
                        if (image) return;

                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = () => {
                            if (!input.files) return;

                            if (input.files.length > 1) {
                                setError('oneImage');
                                return;
                            }

                            const file = input.files[0];

                            setImage(file);
                        };
                        input.click();
                    }}
                >
                    <div
                        className="
                            mx-auto my-auto flex flex-col items-center gap-y-2
                        "
                    >
                        <FontAwesomeIcon
                            icon={image ? faCheck : faUpload}
                            className="text-4xl text-slate-300"
                        />

                        <div className="text-center text-sm text-slate-600">
                            {image ? (
                                <b>Image Uploaded</b>
                            ) : (
                                <>
                                    <b>Choose a file</b> or drag it here
                                </>
                            )}
                        </div>

                        {image && (
                            <h1
                                className="
                                    line-clamp-1 flex max-w-full flex-row 
                                    gap-x-2 rounded-sm border border-slate-300 
                                    bg-white p-1 px-2 text-sm text-slate-600 
                                    shadow-inner
                                "
                            >
                                <FontAwesomeIcon
                                    icon={faClose}
                                    className="my-auto cursor-pointer"
                                    onClick={() => setImage(null)}
                                />
                                <div>{image.name}</div>
                            </h1>
                        )}

                        {error === 'oneImage' ? (
                            <div className="text-center italic text-red-400">
                                *can only upload one image.
                            </div>
                        ) : error === 'notImage' ? (
                            <div className="text-center italic text-red-400">
                                *file must be an image.
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </TopicBox>
    );
};

/**
 * @returns {React.ReactNode}
 */
/*
const Customizations = () => {
    const { customizations, setCustomizations } = useNewMenu();

    return (
        <TopicBox title={<Subtitle>Customization</Subtitle>}>
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
*/

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
        <TopicBox title={<Subtitle>Basic Information</Subtitle>}>
            <form
                className="
                    mx-autobg-blue-200 justify-between2 mx-auto 
                    flex w-full max-w-96 grow basis-2/3
                    flex-col gap-y-2
                "
            >
                <InputBoxWithIcon
                    icon={faUtensils}
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                    placeholder={'Menu Name'}
                    type={'text'}
                />
                <InputBoxWithIcon
                    icon={faTag}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={'Price'}
                    type={'number'}
                />
                <InputBoxWithIcon
                    icon={faClock}
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder={'Estimated Preparation Time'}
                    type={'number'}
                />
                <InputBoxWithIcon
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
 * @param {{}} prop
 *
 * @returns {React.ReactNode}
 */
export default ({}) => {
    return (
        <NewMenuProvider>
            <Modal
                onClose={undefined}
                title={<Title>New Menu</Title>}
                className="flex w-fit min-w-96 flex-col"
            >
                <div className="flex h-full flex-col px-2">
                    <div
                        className="
                            flex h-0 grow flex-col gap-y-2 overflow-y-auto
                        "
                    >
                        <BasicInformation />
                        <MenuImageUpload />
                        {/* <Customizations /> */}

                        <div className="h-0 grow"></div>

                        <GradientTextButton className="sticky bottom-0">
                            Confirm
                        </GradientTextButton>
                    </div>
                </div>
            </Modal>
        </NewMenuProvider>
    );
};
