import React, { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

import { FaPencilAlt, FaChartLine } from "react-icons/fa";

import { IoMdArrowDropup } from "react-icons/io";

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import { BsQuestionCircle } from "react-icons/bs";

import Modal from "react-modal";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import CustomTooltip from "./CustomTooltip";
import MonthRangePicker from "./MonthRangePicker";
import DatesRange from "./DatesRange";
import Skeleton from "./Skeleton";

type TStats = {
  year2021?: [] | any;
  year2023?: [] | any;
  year2022?: [] | any;
};

const LineChartComponent = ({ year2021, year2023, year2022 }: TStats) => {
  // State to track loading state
  const [loading, setLoading] = useState(true);

  // Showing bg colors toggle
  const [showbg1, setShowbg1] = useState(false);
  const [showbg2, setShowbg2] = useState(false);
  const [showbg3, setShowbg3] = useState(false);

  // Showing Options toggle on click of edit
  const [showOptions1, setShowOptions1] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [showOptions3, setShowOptions3] = useState(false);
  const [showOptions4, setShowOptions4] = useState(false);

  const startDate2023 = new Date("2023-01-01");
  const endDate2023 = new Date("2023-12-31");
  const initialSelectedDateRange = [
    {
      startDate: startDate2023,
      endDate: endDate2023,
      key: "selection",
    },
  ];

  // Date picker State
  const [selectedDateRange, setSelectedDateRange] = useState(
    initialSelectedDateRange
  );
  console.log("selectedDateRange:", selectedDateRange);

  // Showing chart toggle on click of arrow
  const [showChart, setShowChart] = useState(true);

  // Showing modal
  const [showModal, setShowModal] = useState(false);

  //Modal functions
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedDateRange(initialSelectedDateRange);
    combinedFilteredData.length === 0;
    setShowModal(false);
  };

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const handleMonthRangeChange = ({
    startMonth,
    endMonth,
  }: {
    startMonth: string;
    endMonth: string;
  }) => {
    setStartMonth(startMonth);
    setEndMonth(endMonth);
  };

  const filterDataByMonthRange = (data: any[]) => {
    return data.filter((item) => {
      const date = new Date(item.date);
      const start = new Date(startMonth);
      const end = new Date(endMonth);
      return date >= start && date <= end;
    });
  };

  const submit = () => {
    setShowModal(false);
  };

  // Function to calculate total value
  const calculateTotalCustmers = (data: any) => {
    return data?.reduce((acc: any, item: any) => acc + item.newCustomers, 0);
  };

  // Function to calculate total value
  const calculateTotalOrders = (data: any) => {
    return data?.reduce((acc: any, item: any) => acc + item.totalOrders, 0);
  };

  // Function to calculate total value
  const calculateTotalValue = (data: any) => {
    return data?.reduce(
      (acc: any, item: any) => acc + item.total_month_amount,
      0
    );
  };

  // Calculate total values
  const totalNewCustomers = calculateTotalCustmers(year2023);
  const totalDailyOrders = calculateTotalOrders(year2023);
  const totalDailyRevenue = calculateTotalValue(year2023);

  // Calculate net cost
  const totalExpenses = totalNewCustomers + totalDailyOrders;
  const netCosts = totalDailyRevenue - totalExpenses;

  const totalRevenue: number = year2023?.reduce(
    (acc: Number, curr: any) => acc + curr?.total_month_amount,
    0
  );

  const netReturnValue = totalRevenue - netCosts;

  const totalOrders = year2023?.reduce(
    (acc: Number, curr: any) => acc + curr?.totalOrders,
    0
  );

  const onlineStoreSessions = year2023?.reduce(
    (acc: Number, curr: any) => acc + curr?.total_month_amount,
    0
  );

  const conversionRate = (totalOrders / onlineStoreSessions) * 100;

  // Filter data for both years and combine them
  const filteredYear2023Data = filterDataByMonthRange(year2023);
  const filteredYear2022Data = filterDataByMonthRange(year2022);
  const filteredYear2021Data = filterDataByMonthRange(year2021);
  const combinedFilteredData = [
    ...filteredYear2021Data,
    ...filteredYear2022Data,
    ...filteredYear2023Data,
  ];
  console.log("combinedFilteredData:", combinedFilteredData);

  // Calculate total values
  const combinedTotalNewCustomers =
    calculateTotalCustmers(combinedFilteredData);
  const combinedTotalDailyOrders = calculateTotalOrders(combinedFilteredData);
  const combinedTotalDailyRevenue = calculateTotalValue(combinedFilteredData);

  // Calculate net cost
  const combinedTotalExpenses =
    combinedTotalNewCustomers + combinedTotalDailyOrders;
  const combinedNetCosts = combinedTotalDailyRevenue - combinedTotalExpenses;

  const combinedTotalRevenue: number = combinedFilteredData?.reduce(
    (acc: Number, curr: any) => acc + curr?.total_month_amount,
    0
  );

  const combinedNetReturnValue = combinedTotalRevenue - combinedNetCosts;
  console.log("combinedNetReturnValue:", combinedNetReturnValue);

  const combinedTotalOrders = year2023?.reduce(
    (acc: Number, curr: any) => acc + curr?.totalOrders,
    0
  );

  const combinedOnlineStoreSessions = year2023?.reduce(
    (acc: Number, curr: any) => acc + curr?.total_month_amount,
    0
  );

  console.log("combinedTotalOrders:", combinedTotalOrders);
  const combinedConversionRate =
    (combinedTotalOrders / combinedOnlineStoreSessions) * 100;
  console.log("combinedConversionRate:", combinedConversionRate);

  console.log("combinedOnlineStoreSessions:", combinedOnlineStoreSessions);

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
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup function to clear timer
    return () => clearTimeout(timer);
  }, []);

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
      {loading ? (
        // Render loading
        <div className="flex w-full items-center justify-center">
          <Skeleton/>
        </div>
      ) : (
        <>
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
                <div
                  className="rounded-md p-2 text-l cursor-pointer text-gray-500 hover:bg-gray-300"
                  onClick={() => handlePencilClick(1)}
                >
                  <FaPencilAlt
                  // className={` ${showbg1 ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-0.2 justify-around ">
                <h3 className="text-base font-bold">
                  {combinedFilteredData.length == 0
                    ? onlineStoreSessions || 0
                    : combinedOnlineStoreSessions || 0}
                </h3>
                <IoMdArrowDropup className="text-sm" />
                <h3 className="text-sm text-gray-400">9%</h3>
              </div>
              {showOptions1 && (
                <div className="w-1/4 absolute z-50 top-48 left-72 bg-white border rounded-md shadow-md">
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
                <h2 className="text-l font-bold">
                  {combinedFilteredData.length == 0
                    ? `$ ${netReturnValue}`
                    : `$ ${combinedNetReturnValue}`}
                </h2>
                ,
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
                <h2 className="text-l font-bold">
                  {combinedFilteredData.length == 0
                    ? totalOrders
                    : combinedTotalOrders}
                </h2>
                ,
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
                  {combinedFilteredData.length == 0
                    ? conversionRate.toFixed(2)
                    : combinedConversionRate.toFixed(2)}
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
            <div className="p-1 m-1">
              {combinedFilteredData.length === 0 ? (
                <ResponsiveContainer height={300}>
                  <LineChart
                    data={year2023}
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
                      tickCount={year2023?.length ?? 0}
                      tick={{
                        stroke: "light-grey",
                        strokeWidth: 0.5,
                        fontSize: "12px",
                      }}
                    />
                    <YAxis
                      tickCount={3}
                      tickFormatter={(tick) => {
                        if (tick === 0) return "0";
                        if (tick === 20000) return "20k";
                        if (tick === 40000) return "40k";
                        return tick;
                      }}
                      tick={{
                        stroke: "light-grey",
                        strokeWidth: 0.5,
                        fontSize: "12px",
                      }}
                      interval="preserveStartEnd"
                      domain={[0, 40000]} // Adjusted domain to include 0, 1k, and 2k
                    />

                    <Tooltip
                       content={<CustomTooltip data={[
                        ...year2022,
                        ...year2023,
                      ]} />}
                       wrapperStyle={{
                         backgroundColor: "#fff",
                         border: "1px solid #e2e8f0",
                         borderRadius: "0.5rem",
                         padding: "0.5rem",
                         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                       }}
                    />

                      <Legend content={<DatesRange data={[
                        ...year2022,
                        ...year2023,
                      ]} />} />

                    <Line
                      type="monotone"
                      dataKey="sale_cost"
                      strokeWidth={5}
                      fill="none"
                      dot={false}
                    />
                    <Line
                      type="basis"
                      dataKey="production_cost"
                      strokeWidth={3}
                      stroke="#6FC2F3"
                      strokeDasharray="3 4 5 2"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer height={300}>
                  <LineChart
                    data={combinedFilteredData}
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
                      tickCount={combinedFilteredData?.length ?? 0}
                      tick={{
                        stroke: "light-grey",
                        strokeWidth: 0.5,
                        fontSize: "12px",
                      }}
                    />
                    <YAxis
                      tickCount={3}
                      tickFormatter={(tick) => {
                        if (tick === 0) return "0";
                        if (tick === 20000) return "20k";
                        if (tick === 40000) return "40k";
                        return tick;
                      }}
                      tick={{
                        stroke: "light-grey",
                        strokeWidth: 1,
                        fontSize: "12px",
                      }}
                      interval="preserveStartEnd"
                      domain={[0, 40000]} // Adjusted domain to include 0, 20k, and 40k
                    />
                   <Tooltip
                       content={<CustomTooltip data={[...year2023,...year2022,...year2021]} />}
                       wrapperStyle={{
                         backgroundColor: "#fff",
                         border: "1px solid #e2e8f0",
                         borderRadius: "0.5rem",
                         padding: "0.5rem",
                         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                       }}
                    />

                    <Legend content={<DatesRange data={combinedFilteredData}  />} />
                    <Line
                      type="monotone"
                      dataKey="sale_cost"
                      strokeWidth={3}
                      fill="none"
                      dot={false}
                    />
                    <Line
                      type="basis"
                      dataKey="production_cost"
                      strokeWidth={3}
                      stroke="#6FC2F3"
                      strokeDasharray="3 4 5 2"
                      fill="none"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          ) : <></>}

          <div className="p-3 m-1.5 mt-0 text-right">
            {showChart ? (
              <button
                className="text-md text-white font-bold bg-gray-500 rounded-lg p-2"
                onClick={openModal}
              >
                Select Date Range
              </button>
            ) : (
              ""
            )}

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
                <button className="text-xl p-3" onClick={closeModal}>
                  X
                </button>
              </div>
              <MonthRangePicker onChange={handleMonthRangeChange} />
              <div className="flex justify-end">
                <button onClick={submit}>Submit</button>
              </div>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default LineChartComponent;
