import React, { useState } from 'react';

const Tag = ({ name, handleButtonClick}) => {
    // eslint-disable-next-line no-constant-condition
    const [isClicked, setIsClicked] = useState(false);
    let color =  isClicked ? "bg-gradient-to-bl from-pink-500 to-orange-400" : "bg-slate-400";
    let hoverColor = "bg-gradient-to-bl from-pink-500 to-orange-400";

    const handleTagClicked = () => {
        setIsClicked(!isClicked);
        handleButtonClick(name);
    }


    return (
        <button type="button" 
        onClick={ handleTagClicked }
        className={`text-white ${color} hover:${hoverColor} font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-3`}>
            {name}
        </button>
    );
}

export default Tag; 


// className={`text-white ${color} from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>
