// // import React from 'react';
// // import { FaMinus } from 'react-icons/fa';
// // import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

// // const CustomTooltip = ({
// //   active,
// //   payload,
// //   label,
// //   previousYearData,
// // }: any) => {
// //   if (active && payload && payload.length) {
// //     const value = payload[0].value;
// //     console.log('previousYearData:', previousYearData)
// //     // const previousYearValue = previousYearData.date;
// //     const prev = value;
// //     const trendIcon =
// //         value && prev < value ? (
// //         <FiTrendingDown className="text-red-400" />
// //       ) : (
// //         <FiTrendingUp className="text-green-400" />
// //       );
// //     return (
// //       <div className="custom-tooltip flex items-center gap-3">
// //         <p className="flex items-center gap-1">
// //           <FaMinus className="text-teal-400" />
// //           {`${label}`}
// //         </p>
// //         <p>{value}</p>
// //         <p className="flex items-center gap-1">
// //           {trendIcon}
// //           {/* <p className="text-gray-400">
// //             {`${Math.abs(
// //               ((value - previousYearValue) / previousYearValue) * 100
// //             ).toFixed(0)}%`}
// //           </p> */}
// //         </p>
// //       </div>
// //     );
// //   }
// //   return null;
// // };

// // export default CustomTooltip;
// import React from 'react';
// import { FaMinus } from 'react-icons/fa';
// import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

// const CustomTooltip = ({
//   active,
//   payload,
//   label,
//   year2023Data,
//   year2022Data,
// }: any) => {
//   if (active && payload && payload.length) {
//     const value = payload[0].value;

//     // Find the value for the label (date) in the data for the previous year (2022)
//     const year2022Value = year2022Data?.find((item: any) => item.date === label)?.value;
//     console.log('year2022Value:', year2022Value)
    
//     // Find the value for the label (date) in the data for the current year (2023)
//     const year2023Value = year2023Data?.find((item: any) => item.date === label)?.value;

//     const trendIcon2023 =
//       value && year2023Value && year2023Value < value ? (
//         <FiTrendingDown className="text-red-400" />
//       ) : (
//         <FiTrendingUp className="text-green-400" />
//       );

    

//     return (
//       <div className="custom-tooltip flex flex-col items-center gap-3">
//         <div className="custom-tooltip flex items-center gap-3">
//         <p className="flex items-center gap-1">
//           <FaMinus className="text-teal-400" />
//           {`${label}`}
//         </p>
//         <p>{value}</p>
//         <p className="flex items-center gap-1">
//           {trendIcon2023}
//         </p>
//         </div>
//         <div className="custom-tooltip flex items-center gap-3">
//             <p className="flex items-center gap-1">
//               {`${label}`} (Previous Year)
//             </p>
//             <p>{year2022Value}</p>
//           </div>
       
//       </div>
//     );
//   }
//   return null;
// };

// export default CustomTooltip;

// Working 2023
import React from 'react';
import { FaMinus } from 'react-icons/fa';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

const CustomTooltip = ({ active, payload, coordinate, data }: any) => {
  console.log('active:', active);
  console.log('payload:', payload);
  console.log('data:', data);

  if (active && payload && payload.length && data && data.length >= 2) {
    const tooltipStyle = {
      left: coordinate.x,
      top: coordinate.y,
    };

    const currentMonthData = payload[0].payload;
    const currentDate = currentMonthData.date;
    const currentYear = parseInt(currentDate.split(' ')[1]); // Extract current year
    console.log('currentYear:', currentYear)
    const currentMonth = currentDate.split(' ')[0]; // Extract current month
    console.log('currentMonth:', currentMonth)

    // Find previous month data of the same year
    const previousMonthData = data.find(
      (item: any) => item.date === `${currentMonth} ${currentYear - 1}`
    );

    // Find same month data of the previous year
    const previousYearData = data.find(
        (item: any) => item.date === `${currentMonth} ${currentYear - 1}`
      );
    console.log('previousMonthData:', previousMonthData);
    console.log('previousYearData:', previousYearData);

    if (previousMonthData && previousYearData) {
      const percentageChange: number =
        ((currentMonthData.sale_cost - previousMonthData.sale_cost) / previousMonthData.sale_cost) * 100;
      const absPercentageChange = Math.abs(Math.round(percentageChange));

      return (
        <div
          className="p-1 py-2 px-4 flex flex-col shadow-lg bg-white justify-center items-start rounded-lg"
          style={tooltipStyle}
        >
          <p className="Previous text-xs py-1 flex items-center gap-2">
            <FaMinus className="text-teal-400" />
            {`${currentMonthData.date} `}
            <span className="p-1 flex flex-row gap-3 font-semibold">
              {currentMonthData.production_cost}
              <span className="flex flex-row gap-2">
                {previousMonthData.sale_cost > previousMonthData.sale_cost ? (
                  <FaArrowTrendDown className="text-lg font-bold text-[#676767]" />
                ) : (
                  <FaArrowTrendUp className="text-lg font-bold text-[#676767]" />
                )}
                {absPercentageChange}%
              </span>
            </span>
          </p>

          <p className="text-xs py-1 flex items-center gap-2">
            {`${previousMonthData.date} `}
            <span className="p-1 font-semibold">{previousMonthData.production_cost}</span>
          </p>
        </div>
      );
    }
  }

  return null;
};

export default CustomTooltip;


// import React from 'react';
// import { FaMinus } from 'react-icons/fa';
// import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

// const CustomTooltip = ({ active, payload, coordinate, data }: any) => {

//   console.log('CustomTooltip-data:', data);

//   if (active && payload && payload.length && data && data.length >= 2) {
//     const tooltipStyle = {
//       left: coordinate.x,
//       top: coordinate.y,
//     };

//     const currentMonthData = payload[0].payload;
//     console.log('currentMonthData:', currentMonthData)
//     const currentDate = currentMonthData.date;
//     const currentYear = parseInt(currentDate.split(' ')[1]); // Extract current year
//     console.log('currentYear:', currentYear)
//     const currentMonth = currentDate.split(' ')[0]; // Extract current month

//     // Find previous month data of the same year
//     const previousMonthData = data.filter(
//       (item: any) => item.date === `${currentMonth} ${currentYear - 1}`
//     );

//     // Find same month data of the previous year
//     const previousYearData = data.filter(
//         (item: any) => item.date === `${currentMonth} ${currentYear - 1}`);



//     console.log('previousMonthData:', previousMonthData);
//     console.log('previousYearData:', previousYearData);

//     const renderPreviousYearData = () => {
//       if (previousYearData) {
//         return (
//           <p className="text-xs py-1 flex items-center gap-2">
//             {`${previousYearData.date} `}
//             <span className="p-1 font-semibold">{previousYearData.production_cost}</span>
//           </p>
//         );
//       } else {
//         return (
//           <p className="text-xs py-1 flex items-center gap-2">
//             No data available for the previous year.
//           </p>
//         );
//       }
//     };

//     if (previousMonthData) {
//       const percentageChange: number =
//         ((currentMonthData.production_cost - previousMonthData.production_cost) / previousMonthData.production_cost) * 100;
//       const absPercentageChange = Math.abs(Math.round(percentageChange));

//       return (
//         <div
//           className="p-1 py-2 px-4 flex flex-col shadow-lg bg-white justify-center items-start rounded-lg"
//           style={tooltipStyle}
//         >
//           <p className="Previous text-xs py-1 flex items-center gap-2">
//             <FaMinus className="text-teal-400" />
//             {`${currentMonthData.date} `}
//             <span className="p-1 flex flex-row gap-3 font-semibold">
//               {currentMonthData.production_cost}
//               <span className="flex flex-row gap-2">
//                 {previousMonthData.sale_cost > previousMonthData.production_cost ? (
//                   <FaArrowTrendDown className="text-lg font-bold text-[#676767]" />
//                 ) : (
//                   <FaArrowTrendUp className="text-lg font-bold text-[#676767]" />
//                 )}
//                 {absPercentageChange}%
//               </span>
//             </span>
//           </p>

//           {renderPreviousYearData()}
//         </div>
//       );
//     } else {
//       return (
//         <div
//           className="p-1 py-2 px-4 flex flex-col shadow-lg bg-white justify-center items-start rounded-lg"
//           style={tooltipStyle}
//         >
//           <p className="Previous text-xs py-1 flex items-center gap-2">
//             No data available for the previous month.
//           </p>
//           {renderPreviousYearData()}
//         </div>
//       );
//     }
//   }

//   return null;
// };

// export default CustomTooltip;


// import React from 'react';
// import { FaMinus } from 'react-icons/fa';
// import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

// const CustomTooltip = ({ active, payload, coordinate, data }: any) => {
//   if (active && payload && payload.length && data && data.length >= 2) {
//     const tooltipStyle = {
//       left: coordinate.x,
//       top: coordinate.y,
//     };

//     const currentMonthData = payload[0].payload;
//     console.log('currentMonthData:', currentMonthData)
//     const currentDate = currentMonthData.date;
//     const currentYear = parseInt(currentDate.split(' ')[1]); // Extract current year
//     const currentMonth = currentDate.split(' ')[0]; // Extract current month

//     let previousMonthData = null;
//     let previousYearData = null;

//     if (currentYear > 2021) {
//       previousMonthData = data.find(
//         (item: any) => {
//           const itemYear = parseInt(item.date.split(' ')[1]);
//           const itemMonth = item.date.split(' ')[0];
//           return itemYear === currentYear - 1 && itemMonth === currentMonth;
//         }
//       );
//     }

//     if (currentYear > 2022) {
//       previousYearData = data.find(
//         (item: any) => {
//           const itemYear = parseInt(item.date.split(' ')[1]);
//           const itemMonth = item.date.split(' ')[0];
//           return itemYear === currentYear - 2 && itemMonth === currentMonth;
//         }
//       );
//     }

//     const displayPreviousYearData = currentYear > 2021 && previousYearData;
//     console.log('displayPreviousYearData:', displayPreviousYearData)

//     console.log('previousMonthData:', previousMonthData)
//     if (previousMonthData || displayPreviousYearData) {
//       const percentageChange: number =
//         ((currentMonthData.production_cost - (previousMonthData ? previousMonthData.production_cost : currentMonthData.production_cost)) / (previousMonthData ? previousMonthData.production_cost : currentMonthData.production_cost)) * 100;
//       const absPercentageChange = Math.abs(Math.round(percentageChange));

//       return (
//         <div
//           className="p-1 py-2 px-4 flex flex-col shadow-lg bg-white justify-center items-start rounded-lg"
//           style={tooltipStyle}
//         >
//           <p className="Previous text-xs py-1 flex items-center gap-2">
//             <FaMinus className="text-teal-400" />
//             {`${currentMonthData.date} `}
//             <span className="p-1 flex flex-row gap-3 font-semibold">
//               {currentMonthData.production_cost}
//               <span className="flex flex-row gap-2">
//                 {(previousMonthData ? previousMonthData.sale_cost : currentMonthData.production_cost) > currentMonthData.production_cost ? (
//                   <FaArrowTrendDown className="text-lg font-bold text-[#676767]" />
//                 ) : (
//                   <FaArrowTrendUp className="text-lg font-bold text-[#676767]" />
//                 )}
//                 {absPercentageChange}%
//               </span>
//             </span>
//           </p>

//           {previousMonthData && (
//             <p className="text-xs py-1 flex items-center gap-2">
//               {`${previousMonthData.date} `}
//               <span className="p-1 font-semibold">{previousMonthData.production_cost}</span>
//             </p>
//           )}

//           {displayPreviousYearData && (
//             <p className="text-xs py-1 flex items-center gap-2">
//               {`${previousYearData.date} `}
//               <span className="p-1 font-semibold">{previousYearData.production_cost}</span>
//             </p>
//           )}
//         </div>
//       );
//     }
//   }

//   return null;
// };

// export default CustomTooltip;

