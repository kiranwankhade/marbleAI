import React, { useState } from "react";

interface MonthRangePickerProps {
  onChange: (range: { startMonth: string; endMonth: string }) => void;
}

const MonthRangePicker: React.FC<MonthRangePickerProps> = ({ onChange }) => {
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const handleStartMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartMonth(e.target.value);
    onChange({ startMonth: e.target.value, endMonth });
  };

  const handleEndMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndMonth(e.target.value);
    onChange({ startMonth, endMonth: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
            <h1>Select Month and Year (January 2021 to Dec 2023)</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label className="text-sm font-semibold text-gray-600">Start Month:</label>
        <input
          type="month"
          value={startMonth}
          onChange={handleStartMonthChange}
          min="2021-01"
          max="2023-12"
          className="w-full sm:w-auto border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label className="text-sm font-semibold text-gray-600">End Month:</label>
        <input
          type="month"
          value={endMonth}
          onChange={handleEndMonthChange}
          min="2021-01"
          max="2023-12"
          className="w-full sm:w-auto border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default MonthRangePicker;
