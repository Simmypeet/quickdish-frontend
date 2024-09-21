import React from "react";
import Comment from "../../components/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CommentWindow from "../../components/CommentWindow";

const RateAndReview = () => {
    const [addComment, setAddComment] = React.useState(false);
    //edit this 
    const handleAddComment = () => {
        setAddComment(!addComment);
    }

    return (
        <div className="gradient-color-orange overflow-scroll">
            {/* add black gradient */}
            <div className="fixed top-0 w-full pt-8 text-white text-3xl flex ">
                <FontAwesomeIcon className="m-1 ml-4 size-8 text-white z-10" icon={faArrowLeft} />
                <h1 className=" font-medium z-10">Rate & Review</h1>
                <div className="fixed top-0 h-32 w-full bg-gradient-to-b from-orange-800 to-transparent "></div>
            </div>


            <div className="h-screen flex flex-col items-center mt-28">
                
                <div className="bg-slate-100 w-8/12 h-screen rounded-3xl mb-6">
                    {/* white box */}
                    <div className="flex flex-col justify-center bg-slate-100 rounded-3xl">
                        {/* header */}
                        <div className="bg-slate-100 w-full p-2 rounded-t-3xl mb-6 flex flex-col space-y-3 shadow-2xl">
                            <div className="m-3 flex flex-col">
                                <h1 className="comment-heading-font">Resrautant Name</h1>
                                <div className="flex">
                                    <FontAwesomeIcon className="m-1 size-5 text-black" icon={faLocationDot}/>
                                    <h1>Canteen A</h1>
                                </div>
                                <hr className="border-t-2 border-black mt-3 mb-3"/>
                                <h1 className="comment-sub-heading-bold-font">Overall Rate(4.7)</h1>
                                <div className="">
                                    {
                                        [
                                            ...Array(5).fill(0).map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-8 text-yellow-500"/>
                                            )),
                                            ...Array(0).fill(0).map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-8"/>
                                            ))
                                        ]
                                    }
                                </div>
                                {/* <h1 className="comment-sub-heading-font">Flavour</h1>
                                <div className="">
                                    {
                                        [
                                            ...Array(3).fill(0).map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-5 text-yellow-500"/>
                                            )),
                                            ...Array(2).fill(0).map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-5"/>
                                            ))
                                        ]
                                    }
                                </div>
                                <h1 className="comment-sub-heading-font">Hygiene</h1>
                                <div className="">
                                    {
                                        [
                                            ...Array(3).fill(0).map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-5 text-yellow-500"/>
                                            )),
                                            ...Array(2).fill(0).map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-5"/>
                                            ))
                                        ]
                                    }
                                </div>
                                <h1 className="comment-sub-heading-font">Fast Delivery</h1>
                                <div className="">
                                    {
                                        [
                                            ...Array(3).fill(0).map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-5 text-yellow-500"/>
                                            )),
                                            ...Array(2).fill(0).map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} key={i} className="m-1 size-5"/>
                                            ))
                                        ]
                                    }
                                </div> */}
                            </div>
                            
                        </div>
                        <h1 className="comment-sub-heading-bold-font ml-3 mb-3">Reviews(50)</h1>
                        <div className="flex flex-col items-center">
                            <Comment username="Arhway" date="15 Sep 2020" menu="Fried Dog" numStar="4" comment="I Love it. So flavourful"/>
                            <Comment username="Arhway" date="15 Sep 2020" menu="Fried Dog" numStar="4" comment="I Love it. So flavourful"/>
                            <CommentWindow/>
                        </div>
                        <div className="fixed bottom-10 right-10">
                            <button className="add-button" type="submit" onClick={handleAddComment}>
                                <h2 className="text-3xl">+</h2>
                            </button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
        
    );
}

export default RateAndReview;