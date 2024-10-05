
const QueueCard = () => {  

    return (
        <div 
            className="
                relative w-44 min-w-44 h-64 bg-gradient-to-b from-orange-500 
                to-orange-700 mr-2 mb-5 shadow-lg rounded-2xl -z-20
            "
        >
            <div className="w-full h-full p-2 absolute -z-10">
                <img className="rounded-2xl w-full h-full" src="/card2.png" alt="" />
            </div>

            <div className="w-full h-full flex flex-col">
                <div className="h-[40%] grid">
                    <div className="my-auto">
                        <h3 className="comment-heading-font line-clamp-1">Queue: 44</h3>
                        <p className="comment-sub-heading-bold-font text-center line-clamp-1">Status: preparing</p>
                    </div>
                </div>
                <div className="h-[60%] grid">
                    <div className="my-auto">
                        <p className="comment-sub-heading-font text-center"><b>Foods:</b> BigMac</p>
                        <p className="comment-sub-heading-font text-center"><b>ETA:</b> 11.05 AM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QueueCard;