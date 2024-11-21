
import { useEffect, useState } from 'react';
import { getRestaurantMenus, getMenuImage } from '../../api/restaurantApi';
import useMerchant from '../../hooks/useMerchant';
import { faEdit, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';
import NewMenu from "./NewMenu"
import NewCustomizations from './NewCustomizations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosPrivate } from '../../api/axios';

const MenuCard = ({ menu, image, onEdit, onCustom }) => {
    return (
        <div
            className="
                flex h-32 max-h-32 flex-row overflow-hidden rounded-2xl 
                bg-slate-50 shadow-lg hover:shadow-xl md:h-fit md:max-h-none
                md:w-64 md:max-w-64 md:flex-col
            "
        >
            <img
                src={image}
                className="
                    aspect-square h-full w-auto rounded-xl object-cover 
                    object-center p-2 drop-shadow-sm md:h-auto md:w-full 
                    md:rounded-none md:p-0 
              "
            />
            <div className="flex grow justify-between p-2">
                <div className="flex flex-col">
                    <div className="line-clamp-1 text-lg font-semibold">
                        {menu.name}
                    </div>
                    <div className="mt-4 line-clamp-1 text-sm">
                        {menu.description}
                    </div>
                    <div className="mt-4 line-clamp-1 text-sm">
                        {`฿${menu.price}`}
                    </div>
                    <div className="mt-4 hidden gap-x-2 md:flex">
                        <FontAwesomeIcon
                            className="self-center text-sm"
                            icon={faClock}
                        />
                        <div className="line-clamp-1 text-sm">
                            {menu.estimated_prep_time == null
                                ? 'Not Specified'
                                : `${menu.estimated_prep_time} mins`}
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-x-2'>
                    <FontAwesomeIcon
                        className="
                            mb-1 self-end rounded-full bg-green-400 p-2 text-sm
                            shadow-sm  hover:cursor-pointer hover:bg-green-500
                            hover:shadow-lg
                        "
                        icon={faPlus}
                        onClick={onEdit}
                    />
                    <FontAwesomeIcon
                        className="
                            mb-1 self-end rounded-full bg-orange-400 p-2 text-sm
                            shadow-sm  hover:cursor-pointer hover:bg-orange-500
                            hover:shadow-lg
                        "
                        icon={faEdit}
                        onClick={onCustom}
                    />
                </div>
            </div>
        </div>
    );
};

const Mmenu = () => {
    const [menusImg, setMenusImg] = useState([]); 
    const [menus, setMenus] = useState([]);
    const { merchant } = useMerchant();
    const [ openModal, setOpenModal ] = useState(undefined); 
    const [ editMenuId, setEditMenuId ] = useState(0);
    const getAllMenus = async () => {
        try {
            const response = await getRestaurantMenus(merchant.restaurant_id);
            setMenus(response);

            let menuImgs = {};
            for(let i = 0; i < response.length; i++){ 
                const responseImg = await getMenuImage(response[i].id);
                let actualImage = responseImg != null ? URL.createObjectURL(responseImg) : '/defaultMenu.webp';

                menuImgs[response[i].id] = actualImage;
            }
            setMenusImg(menuImgs);
        } catch (err) {
            console.log('Error fetching menus: ', err);
        }
    } 

    const getMenusImg = async () => {
        let menuImgs = [];
        for(let i = 0; i < menus.length; i++){ 
            try{
                const response = await getMenuImage(menus[i].id);
                let actualImage = URL.createObjectURL(response);

                menuImgs[menus[i].id] = actualImage;
            }catch(err){
                console.log("Error fetching menu image: ", err);
            }
        }
        setMenusImg(menuImgs);
    }

    const makeModalOpen = (id) => {
        setEditMenuId(id);
        setOpenModal("update"); 
    } 
 
    const showModal = () => {
        console.log("show modal");
    }

    useEffect(() => {
        getAllMenus();
        if(menus.length > 0){
            getMenusImg(); 
        }
    }, [menus]);

    return ( 
        <div>
            <h1 className="heading-font"> Menus </h1>
            <div className="grid grid-cols-3 gap-10 mt-10">
                {
                    menus.map((menu) => {
                        return <MenuCard menu={menu} key={menu.id} image={menusImg[menu.id]} onEdit={() => makeModalOpen(menu.id)} onCustom={() => {setOpenModal("custom"); setEditMenuId(menu.id);}}></MenuCard>
                    })
                }
            </div>
            <div className="fixed bottom-10 right-10">
                <button 
                    className="add-button shadow-2xl" 
                    onClick = {() => { 
                        
                        setOpenModal("update");  
                        setEditMenuId(0);

                    }}>
                    <h2 className='text-3xl'>+</h2> 
                </button> 
            </div>

            {
                openModal === 'update' ? 
                <div className="fixed top-52">
                    <NewMenu setOpenModal={setOpenModal} editMenuId={editMenuId}></NewMenu>
                </div>
                : openModal === 'custom' ?
                <div className="fixed top-52">
                    <NewCustomizations
                        menu_id={editMenuId}
                        onClose={() => setOpenModal(undefined)}
                        onSubmit={async (customs) => {
                            for (let i = 0 ; i < customs.length; i++) {
                                await axiosPrivate.post(
                                    `/restaurants/menus/${editMenuId}/customizations`, 
                                    customs[i]
                                );
                            }

                            setOpenModal(undefined);
                        }}
                    />
                </div> 
                : null
            }

        </div>
    );
}
export default Mmenu;