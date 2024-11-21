import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevenueCardWithGraph from "../../components/Merchant/Revenue";
import RatingChart from "../../components/Merchant/RatingChart";
import Calendar from "../../components/Merchant/Calendar";
import TableStickyHeader from "../../components/Merchant/TableStickyHeader";

const Msales = () => {
  return (
    <div className="w-full mx-auto bg-slate-200 rounded-lg shadow-md">
        <div className="flex justify-between">
            <div className="w-1/2">
                <RevenueCardWithGraph></RevenueCardWithGraph>
            </div>
            
            <div className="">
                <RatingChart score={3}></RatingChart>
            </div>
        </div>
        <div className="flex mt-10">
            <div className=" mr-10">
                <Calendar/>
            </div>
            
            <TableStickyHeader/>
        </div>
        
    </div>
  );
};

export default Msales;
