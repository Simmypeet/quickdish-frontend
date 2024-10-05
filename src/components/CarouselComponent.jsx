import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CanteenCard from "./CanteenCard";

const CarouselComponent = () => {
    const [canteens, setCanteens] = useState(null); 
    useEffect(() => {
        const fetchData = async() => {
            try{
                const data = Array(10).fill(0).map((_, i) => ({
                    id: i,
                    name: `Canteen ${i+1}`,
                }));
                setCanteens(data);
            }catch(error){
                console.log("Error fetching: ", error);
            }
        };
        fetchData();
    }, []);  //empty arry = run once on mount

    if (canteens == null){
        return (
            <div className="w-full h-full"> 
                Loading... 
            </div>);
    }

    const item = canteens.map(canteen => ({
        id: canteen.id,
        name: canteen.name,
        img: canteen.img
    }))

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 2400, min: 1800 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1800, min: 1200 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1200, min: 600 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1, 
        }
    };

    return (
            <Carousel 
                className="z-0" 
                responsive={responsive} 
                renderDotsOutside={true} 
                itemClass="carousel-item-spacing"
                partialVisible={false}
                partialVisbile={false}
            >
                {item.map(it => (
                    // <CanteenCard key={it.id} canteenName={it.name} img={it.img}/>
                    <CanteenCard key={it.id} canteenName={it.name}/>
                ))}
            </Carousel>
    );
}

export default CarouselComponent;