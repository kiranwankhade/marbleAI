import React from 'react'
import { FaMinus } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string | number | Date;
  }

const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="custom-tooltip flex items-center gap-3">
          <p className="flex items-center gap-1">
            <FaMinus className="text-teal-400" />
            {`${label}`}
          </p>
          <p>{value}</p>
          <p className="flex items-center gap-1">
            <FiTrendingUp />
            <p className="text-gray-400">9%</p>
          </p>
        </div>
      );
    }
    return null;
  };
export default CustomTooltip