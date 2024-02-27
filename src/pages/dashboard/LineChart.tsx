import React, { useEffect, useRef, useState } from "react";
import { GetListResponse } from "@refinedev/core";
import { IChart, IChartDatum } from "../../interfaces";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { FaPencilAlt, FaChartLine } from "react-icons/fa";

import { IoMdArrowDropup } from "react-icons/io";

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import { BsQuestionCircle } from "react-icons/bs";

import { DateRangePicker } from "react-date-range";
import Modal from "react-modal";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

type TStats = {
  dailyRevenue?: GetListResponse<IChartDatum> | any;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
  total?: any;
};

const LineChart = ({
  dailyRevenue,
  dailyOrders,
  newCustomers,
  total,
}: TStats) => {

  // Showing bg colors toggle
  const [showbg1, setShowbg1] = useState(false);
  const [showbg2, setShowbg2] = useState(false);
  const [showbg3, setShowbg3] = useState(false);

  // Showing Options toggle on click of edit
  const [showOptions1, setShowOptions1] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [showOptions3, setShowOptions3] = useState(false);
  const [showOptions4, setShowOptions4] = useState(false);

  // Showing chart toggle on click of arrow
  const [showChart, setShowChart] = useState(true);

  // Showing modal
  const [showModal, setShowModal] = useState(false); 

  //Modal functions
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  // Date picker State
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      endDate: new Date(),
      key: "selection",
    },
  ]);

  //Date Picker Functions
  const handleDateRangeChange = (ranges: any) => {
    setSelectedDateRange([ranges.selection]);
  };

  //data filter on basis of date
  const filteredRevenueData = dailyRevenue?.filter((item: any) => {
    const date = new Date(item.date);
    return (
      date >= selectedDateRange[0].startDate &&
      date <= selectedDateRange[0].endDate
    );
  });

  const filteredDailyOrdersData = dailyOrders?.filter((item: any) => {
    const date = new Date(item.date);
    return (
      date >= selectedDateRange[0].startDate &&
      date <= selectedDateRange[0].endDate
    );
  });

  const filteredNewCustomersData = newCustomers?.filter((item: any) => {
    const date = new Date(item.date);
    return (
      date >= selectedDateRange[0].startDate &&
      date <= selectedDateRange[0].endDate
    );
  });

  // Function to calculate total value
  const calculateTotal = (data: any) => {
    return data?.reduce((acc: any, item: any) => acc + item.value, 0);
  };

  // Calculate total values
  const totalNewCustomers = calculateTotal(newCustomers);
  const totalDailyOrders = calculateTotal(dailyOrders);
  const totalDailyRevenue = calculateTotal(dailyRevenue);

  // Calculate net cost
  const totalExpenses = totalNewCustomers + totalDailyOrders;
  const netCosts = totalDailyRevenue - totalExpenses;

  const totalRevenue: number = dailyRevenue?.reduce(
    (acc: Number, curr: any) => acc + curr?.value,
    0
  );

  const netReturnValue = totalRevenue - netCosts;

  const totalOrders = dailyOrders?.reduce(
    (acc: Number, curr: any) => acc + curr?.value,
    0
  );

  const onlineStoreSessions = newCustomers?.reduce(
    (acc: Number, curr: any) => acc + curr?.value,
    0
  );

  const conversionRate = totalOrders / onlineStoreSessions;


  // Calculate filter total values
  const filteredTotalNewCustomers = calculateTotal(filteredNewCustomersData);
  const filteredTotalDailyOrders = calculateTotal(filteredDailyOrdersData);
  const filteredTotalDailyRevenue = calculateTotal(filteredDailyOrdersData);


   // Calculate net cost
   const filteredTotalExpenses = totalNewCustomers + totalDailyOrders;
   const filteredNetCosts = totalDailyRevenue - totalExpenses;
 
   const filteredTotalRevenue: number = dailyRevenue?.reduce(
     (acc: Number, curr: any) => acc + curr?.value,
     0
   );
 
   const filteredTNetReturnValue = filteredTotalRevenue - filteredNetCosts;
 
   const filteredTotalOrders = filteredDailyOrdersData?.reduce(
     (acc: Number, curr: any) => acc + curr?.value,
     0
   );
 
   const filteredOnlineStoreSessions = filteredNewCustomersData?.reduce(
     (acc: Number, curr: any) => acc + curr?.value,
     0
   );
 
   const filteredConversionRate = filteredTotalOrders / filteredOnlineStoreSessions;


  // Functions on Click of edit
  const handlePencilClick = (divNumber: Number) => {
    if (divNumber === 1) {
      setShowOptions1(!showOptions1);
    } else if (divNumber === 2) {
      setShowOptions2(!showOptions2);
    } else if (divNumber === 3) {
      setShowOptions3(!showOptions3);
    } else if (divNumber === 4) {
      setShowOptions3(!showOptions4);
    }
  };

  const handleChartClickDown = () => {
    setShowChart(false);
  };

  const handleChartClickUp = () => {
    setShowChart(true);
  };
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setShowOptions1(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedDateRange]);

  const [hoverStates, setHoverStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const options = [
    { label: "Average Order Value" },
    { label: "Conversion rate" },
    { label: "Gross Sales" },
    { label: "Net return value" },
    { label: "Store search conversion" },
    { label: "Return rate" },
  ];

  const handleMouseOver = (index: number) => {
    const newHoverStates = hoverStates.map((state, i) =>
      i === index ? true : i === 1 ? true : false
    );
    setHoverStates(newHoverStates);
  };

  return (
    <div className="line-chart p-2 bg-white border rounded-lg">
     <div className="mb-3">
        {showChart ? <button className="text-md text-white font-bold bg-gray-500 rounded-lg p-2" onClick={openModal}>Select Date Range</button> :""}
       
        {/* Modal for Date Range Picker */}
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="Date Range Modal"
          style={{
            content: {
              zIndex: 10, // Custom z-index
              top: "55%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)", // Center modal
            },
          }}
        >
          <div className="flex justify-end">
            <button onClick={closeModal}>Close</button>
          </div>
          <DateRangePicker
            ranges={selectedDateRange}
            onChange={handleDateRangeChange}
          />
          <div className="flex justify-end">
            <button onClick={closeModal}>Submit</button>
          </div>
        </Modal>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between ">
        <div
          className="flex flex-col items-start gap-1 justify-around bg-gray-200 border rounded-lg p-2  w-full "
          onMouseLeave={() => {
            setShowOptions1(false);
          }}
        >
          <div className="w-full flex items-center justify-between gap-6 ">
            <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 decoration-gray-300">
              Online Store Sessions
            </h3>
            <div className="rounded-md p-2 text-l cursor-pointer text-gray-500 hover:bg-gray-300" onClick={() => handlePencilClick(1)}>
              <FaPencilAlt
                // className={` ${showbg1 ? "opacity-100" : "opacity-0"}`}
                
              />
            </div>
          </div>
          <div className="flex items-center gap-0.2 justify-around ">
            <h3 className="text-base font-bold">{selectedDateRange.length == 0 ? onlineStoreSessions : filteredOnlineStoreSessions}</h3>
            <IoMdArrowDropup className="text-sm" />
            <h3 className="text-sm text-gray-400">9%</h3>
          </div>
          {showOptions1 && (
            <div className="w-1/4 absolute z-50 top-56 left-72 bg-white border rounded-md shadow-md">
              <div className="p-2" ref={optionsRef}>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between gap-6 w-full cursor-pointer text-gray-500 hover:bg-gray-300 py-1 px-3 ${
                      hoverStates[index] ? "bg-gray-200" : ""
                    }`}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={() =>
                      setHoverStates(
                        hoverStates.map((state, i) =>
                          i === index ? true : false
                        )
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaChartLine />
                      <p>{option.label}</p>
                    </div>
                    {(index === 1 || hoverStates[index]) && (
                      <BsQuestionCircle />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className={`relative flex flex-col items-start gap-1 justify-around w-full rounded-lg p-2 bg-${
            showbg1 ? "gray-200" : "white"
          }  rounded-lg p-2`}
          onMouseEnter={() => setShowbg1(true)}
          onMouseLeave={() => {
            setShowbg1(false);
            setShowOptions2(false);
          }}
          ref={optionsRef}
        >
          <div className="relative flex items-center justify-between gap-6 w-full">
            <h3 className="relative text-base font-semibold underline decoration-dashed underline-offset-4 decoration-gray-300">
              Net return value
            </h3>
            <div className="rounded-md p-2 text-l cursor-pointer text-gray-500 hover:bg-gray-300">
              <FaPencilAlt
                className={` ${showbg1 ? "opacity-100" : "opacity-0"}`}
                onClick={() => handlePencilClick(2)}
              />
            </div>
          </div>

          <div className="flex items-center gap-0.2">
            <h2 className="text-l font-bold">{selectedDateRange.length == 0 ? `$ ${netReturnValue}` : `$ ${filteredTNetReturnValue}`}</h2>,
            <IoMdArrowDropup className="text-sm" />
            <h3 className="text-sm text-gray-400">14%</h3>
          </div>
          {showOptions2 && (
            <div className="w-full absolute z-50 top-10 left-64 bg-white border rounded-md shadow-md">
              <div className="p-2" ref={optionsRef}>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between gap-6 w-full cursor-pointer text-gray-500 hover:bg-gray-300 py-1 px-3 ${
                      hoverStates[index] ? "bg-gray-200" : ""
                    }`}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={() =>
                      setHoverStates(
                        hoverStates.map((state, i) =>
                          i === index ? true : false
                        )
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaChartLine />
                      <p>{option.label}</p>
                    </div>
                    {(index === 1 || hoverStates[index]) && (
                      <BsQuestionCircle />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className={`relative flex flex-col items-start gap-1 justify-around  w-full bg-${
            showbg2 ? "gray-200" : "white"
          }  rounded-lg p-2`}
          onMouseEnter={() => setShowbg2(true)}
          onMouseLeave={() => {
            setShowbg2(false);
            setShowOptions3(false);
          }}
        >
          <div className="flex items-center justify-between gap-6 w-full">
            <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 decoration-gray-300">
              Total orders
            </h3>
            <div className="rounded-md p-2 text-l cursor-pointer text-gray-500 hover:bg-gray-300">
              <FaPencilAlt
                className={` ${showbg2 ? "opacity-100" : "opacity-0"}`}
                onClick={() => handlePencilClick(3)}
              />
            </div>
          </div>

          <div className="flex items-center gap-0.2">
            <h2 className="text-l font-bold">{selectedDateRange.length == 0  ? totalOrders : filteredTotalOrders}</h2>,
            <IoMdArrowDropup className="text-sm" />
            <h3 className="text-sm text-gray-400">2%</h3>
          </div>
          {showOptions3 && (
            <div className="w-full absolute z-50 top-10 left-64 bg-white border rounded-md shadow-md">
              <div className="p-2" ref={optionsRef}>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between gap-6 w-full cursor-pointer text-gray-500 hover:bg-gray-300 py-1 px-3 ${
                      hoverStates[index] ? "bg-gray-200" : ""
                    }`}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={() =>
                      setHoverStates(
                        hoverStates.map((state, i) =>
                          i === index ? true : false
                        )
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaChartLine />
                      <p>{option.label}</p>
                    </div>
                    {(index === 1 || hoverStates[index]) && (
                      <BsQuestionCircle />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className={`relative flex flex-col items-start gap-1 justify-around  w-full bg-${
            showbg3 ? "gray-200" : "white"
          }  rounded-lg p-2`}
          onMouseEnter={() => setShowbg3(true)}
          onMouseLeave={() => {
            setShowbg3(false);
            setShowOptions4(false);
          }}
        >
          <div className="flex items-center justify-between gap-6 w-full">
            <h3 className="text-base font-semibold underline decoration-dashed underline-offset-4 decoration-gray-300">
              Conversion rate
            </h3>
            <div
              className="rounded-md p-2 text-l cursor-pointer text-gray-500 hover:bg-gray-300"
              onClick={() => handlePencilClick(4)}
            >
              <FaPencilAlt
                className={` ${showbg3 ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-0.2">
            <h2 className="text-l font-bold ">
              {selectedDateRange.length == 0  ? conversionRate.toFixed(2) : filteredConversionRate.toFixed(2)}
              {"%"}
            </h2>
            ,
            <IoMdArrowDropup className="text-sm" />
            <h3 className="text-sm text-gray-400">7%</h3>
          </div>
          {showOptions4 && (
            <div className="w-1/2 absolute z-50 top-10 left-64 bg-white border rounded-md shadow-md">
              <div className="p-2" ref={optionsRef}>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between gap-6 w-full cursor-pointer text-gray-500 hover:bg-gray-300 py-1 px-3 ${
                      hoverStates[index] ? "bg-gray-200" : ""
                    }`}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={() =>
                      setHoverStates(
                        hoverStates.map((state, i) =>
                          i === index ? true : false
                        )
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaChartLine />
                      <p>{option.label}</p>
                    </div>
                    {(index === 1 || hoverStates[index]) && (
                      <BsQuestionCircle />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex w-1/6 items-start">
          {showChart ? (
            <MdKeyboardArrowDown
              className="text-xl font-bold text-gray-500 cursor-pointer"
              onClick={handleChartClickDown}
            />
          ) : (
            <MdKeyboardArrowUp
              className="text-xl font-bold text-gray-500 cursor-pointer"
              onClick={handleChartClickUp}
            />
          )}
        </div>
      </div>

      {showChart ? (
        <div className=" p-3 m-2">
          {selectedDateRange.length == 0 ? (
            <ResponsiveContainer height={400}>
              <AreaChart
                data={dailyRevenue}
                height={400}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="0 0 0" />
                <XAxis
                  dataKey="date"
                  tickCount={dailyRevenue?.length ?? 0}
                  tick={{
                    stroke: "light-grey",
                    strokeWidth: 0.5,
                    fontSize: "12px",
                  }}
                />
                <YAxis
                  tickCount={13}
                  tick={{
                    stroke: "light-grey",
                    strokeWidth: 0.5,
                    fontSize: "12px",
                  }}
                  interval="preserveStartEnd"
                  domain={[0, "dataMax + 10"]}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  strokeWidth={3}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer height={400}>
              <AreaChart
                data={filteredRevenueData}
                height={400}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="0 0 0" />
                <XAxis
                  dataKey="date"
                  tickCount={filteredRevenueData?.length ?? 0}
                  tick={{
                    stroke: "light-grey",
                    strokeWidth: 0.5,
                    fontSize: "12px",
                  }}
                />
                <YAxis
                  tickCount={13}
                  tick={{
                    stroke: "light-grey",
                    strokeWidth: 0.5,
                    fontSize: "12px",
                  }}
                  interval="preserveStartEnd"
                  domain={[0, "dataMax + 10"]}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  strokeWidth={3}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LineChart;
