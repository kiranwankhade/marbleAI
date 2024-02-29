import React from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

const Skeleton: React.FC = () => {
    return (
        <>
          <div className="w-full flex flex-col  items-center gap-3 justify-between ">
            <div className="w-full flex flex-col sm:flex-row items-center gap-3 justify-between ">
                <div className="flex flex-col items-start gap-1 justify-around bg-gray-200  border rounded-lg p-2 w-full ">
                <div className="w-full flex items-center justify-between gap-6 ">
                    <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 h-5 w-4/5  bg-gray-300 decoration-gray-300">
                    </h3>
                </div>
                <div className="flex items-center w-full gap-0.2 justify-around ">
                <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 h-5 w-full  bg-gray-300 decoration-gray-300">
                    </h3>
                </div>
                </div>
        
                <div className="flex flex-col items-start gap-1 justify-around bg-gray-200  border rounded-lg p-2 w-full ">
                <div className="w-full flex items-center justify-between gap-6 ">
                    <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 h-5 w-4/5  bg-gray-300 decoration-gray-300">
                    </h3>
                </div>
                <div className="flex items-center w-full gap-0.2 justify-around ">
                <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 h-5 w-full  bg-gray-300 decoration-gray-300">
                    </h3>
                </div>
                </div>
        
                <div className="flex flex-col items-start gap-1 justify-around bg-gray-200  border rounded-lg p-2 w-full ">
                <div className="w-full flex items-center justify-between gap-6 ">
                    <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 h-5 w-4/5  bg-gray-300 decoration-gray-300">
                    </h3>
                </div>
                <div className="flex items-center w-full gap-0.2 justify-around ">
                <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 h-5 w-full  bg-gray-300 decoration-gray-300">
                    </h3>
                </div>
                </div>
        
                <div className="flex flex-col items-start gap-1 justify-around bg-gray-200  border rounded-lg p-2 w-full ">
                <div className="w-full flex items-center justify-between gap-6 ">
                    <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 h-5 w-4/5  bg-gray-300 decoration-gray-300">
                    </h3>
                </div>
                <div className="flex items-center w-full gap-0.2 justify-around ">
                <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 h-5 w-full  bg-gray-300 decoration-gray-300">
                    </h3>
                </div>
                </div>
        
                <div className="flex w-1/6 items-start">
                <MdKeyboardArrowDown className="text-sm" />
                </div>
            </div>

            <div className="h-48 bg-gray-200 w-full rounded-lg flex justify-center items-center"></div>
          </div>
        </>
      );
};

export default Skeleton;