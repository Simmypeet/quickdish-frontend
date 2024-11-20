// @ts-check

import React, { createContext, Fragment, useEffect, useState } from 'react';

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
import { getMenu } from '../../api/restaurantApi';
import { Subtitle, Title } from '../../components/Title';
import Modal, { TopicBox } from '../../components/Modal';
import GradientTextButton from '../../components/GradientTextButton';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useMerchant from '../../hooks/useMerchant';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { getMenuImage } from '../../api/restaurantApi';


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
 * @returns {React.ReactNode}
 */
const MenuImageUpload = ({editMenuId}) => {
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

                                editMenuId === 0 ? 
                                <>
                                    <b>Choose a file</b> or drag it here
                                </>
                                :
                                <>
                                    <b>Choose a file to change image</b>
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
const BasicInformation = ({ editMenuId }) => {

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

    useEffect(() => {
        const fetchMenu = async () => {
            if(editMenuId !== 0){
                try{
                    const response = await getMenu(editMenuId);
                    console.log("Response from edit: ", response);
                    setMenuName(response.name);
                    setMenuDescription(response.description);
                    setEstimatedTime(response.estimated_prep_time);
                    setPrice(response.price);
                }catch(err){
                    console.log("Error fetching menu: ", err);
                }
            }
        };

        fetchMenu(); 
    }, [editMenuId, setMenuName, setMenuDescription, setEstimatedTime, setPrice]); 

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
 *@property {(value: boolean) => void } setOpenModal
 * @returns {React.ReactNode}
*/

const Menu = ({ setOpenModal, editMenuId }) => {
    const { merchant } = useMerchant();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const { 
        menuName, 
        menuDescription, 
        estimatedTime, 
        price, 
        customizations, 
        image,
        setMenuName,
        setMenuDescription,
        setEstimatedTime,
        setPrice,
        setImage } = useNewMenu();

    const SubmitData = async () => {
        // const axiosPrivate = useAxiosPrivate();
        const payload = {
            name: menuName,
            description: menuDescription,
            price: price,
            estimated_prep_time: estimatedTime
        };
    
        //create new menu
        let menu_id = 0; 
        try{
            const response = await axios.post(
                `http://127.0.0.1:8000/restaurants/${merchant.restaurant_id}/menus`, 
                payload,
                {
                    headers: {
                        'accept': 'application/json',
                        'Authorization' : `Bearer ${auth.accessToken}`, 
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log("Response menu: ", response.data);
            menu_id = response.data;
        }catch(err){
            console.log("Error creating new menu: ", err);
        }
    
        //upload menu image
        UploadImage(menu_id);
        setOpenModal(false);
        resetState();
     
    }

    const UpdateData = async () => {
        const payload = {
            name: menuName,
            description: menuDescription,
            price: price,
            estimated_prep_time: estimatedTime
        };

        try{
            const response = await axiosPrivate.put(
                `/restaurants/menus/${editMenuId}`, 
                payload
            );    
        }catch(err){
            console.log("Error uploading image: ", err);
        }

        if(image != null){
            UploadImage(editMenuId);
        }  
        setOpenModal(false);
        resetState();
    }


    const UploadImage = async (menuId) => {
        const img_payload = new FormData();
        img_payload.append('image', image); 

        try{
            const response = await axiosPrivate.put(
                `/restaurants/menus/${menuId}/image`, 
                img_payload, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );    
        }catch(err){
            console.log("Error uploading image: ", err);
        }
    }

    const resetState = () => {
        setMenuName('');
        setMenuDescription('');
        setEstimatedTime('');
        setPrice('');
        setImage(null);
    }
   //here
    return (
           
            <Modal
                onClose={() => { setOpenModal(false) } }
                title={
                    <Title>
                        {
                            editMenuId === 0 ? 
                            "New Menu" : 
                            "Edit Menu"
                        }
                    </Title>}
                className="flex h-3/4 w-fit min-w-96 flex-col top-10 left-36"
            >
                <div className="flex h-full flex-col px-2">
                    <div
                        className="
                            flex h-0 grow flex-col gap-y-2 overflow-y-auto
                        "
                    >   
                        <BasicInformation editMenuId={editMenuId}/>
                        <MenuImageUpload editMenuId={editMenuId} />
                        {/* <Customizations /> */}

                        <div className="h-0 grow"></div>

                        <GradientTextButton 
                            className="sticky bottom-0"
                            onClick={
                                editMenuId === 0 ?
                                SubmitData
                                :
                                UpdateData
                            }>
                            Confirm
                        </GradientTextButton>
                    </div>
                </div>
            </Modal>
            
    );
};

export default function NewMenu({ setOpenModal, editMenuId }) {
    return (
        <NewMenuProvider>
            <Menu setOpenModal={setOpenModal} editMenuId={editMenuId}></Menu>
        </NewMenuProvider>
    ); 
}; 


