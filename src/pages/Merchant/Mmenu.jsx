
import MenuCard from '../../components/MenuCard';
import { useEffect, useState } from 'react';
import { getRestaurantMenus, getMenuImage } from '../../api/restaurantApi';
import useMerchant from '../../hooks/useMerchant';
import NewMenu from './NewMenu';

const Mmenu = () => {
    const [menusImg, setMenusImg] = useState([]); 
    const [menus, setMenus] = useState([]);
    const { merchant } = useMerchant();
    const [ openModal, setOpenModal ] = useState(false); 
    const getAllMenus = async () => {
        try {
            const response = await getRestaurantMenus(merchant.restaurant_id);
            setMenus(response);
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

    const showModal = () => {
        console.log("show modal");
    }

    useEffect(() => {
        getAllMenus();
        getMenusImg(); 
    }, []);

    return (
        <div>
            <h1 className="heading-font"> Menus </h1>
            <div className="grid grid-cols-3 gap-0 mt-10">
                {
                    menus.map((menu) => {
                        return <MenuCard menu={menu} key={menu.id} image={menusImg[menu.id]} onClick={showModal}></MenuCard>
                    })
                }
            </div>
            <div className="fixed bottom-10 right-10">
                <button 
                    className="add-button shadow-2xl" 
                    onClick = {() => { 
                        setOpenModal(true);  
                    }}>
                    <h2 className='text-3xl'>+</h2>
                </button>
            </div>

            {
                openModal ? 
                <div className="fixed top-52">
                    <NewMenu setOpenModal={setOpenModal}></NewMenu>
                </div>
                : null
            }
        </div>
    );
}
export default Mmenu;