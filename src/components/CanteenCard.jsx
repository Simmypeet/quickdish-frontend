
const CanteenCard = ( {canteenName, img} ) => {
    return (
        <div className="w-full h-64 mt-3 mb-10 rounded-2xl drop-shadow-md hover:shadow-xl relative">
            {/* <div className="w-full h-full rounded-2xl bg-slate-300">
                
            </div> */} 
            {/* <div className="fixed bg-gradient-to-b from-transparent via-transparent to-black rounded-2xl w-96 mr-2 h-64 z-10"></div> */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black rounded-2xl z-10"></div>
            {/* <img className="w-full h-full rounded-2xl object-cover" src={img} alt="" /> */}
            <img className="w-full h-full rounded-2xl object-cover" src={img} alt="" />

            <h1 className="absolute bottom-5 left-7 text-lg text-white z-20">{canteenName}</h1>
        </div>
    );
}

export default CanteenCard;
