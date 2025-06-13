"use client";

import React from 'react';

interface ToggleSwitchProps {
  value: string;
  onChange: (newValue: string) => void;
  option1Value: string;
  option1Label: string;
  option2Value: string;
  option2Label: string;
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onChange,
  option1Value,
  option1Label,
  option2Value,
  option2Label,
  disabled = false,
}) => {
  const isActive = (val: string) => value === val;
  const thumbSize = 'calc(50% - 0.25rem)'; // half of container minus padding

  return (
    <div
      className={`relative flex items-center w-44 h-10 rounded-full p-1 transition-colors duration-300 ease-in-out ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-200'
      }`}
    >
      {/* Moving highlight */}
      <span
        className="absolute top-1 left-1 h-8 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out"
        style={{
          width: thumbSize,
          transform: isActive(option2Value) ? 'translateX(100%)' : 'translateX(0)',
        }}
        aria-hidden="true"
      />

      {/* Option 1 */}
      <button
        type="button"
        onClick={() => !disabled && onChange(option1Value)}
        className="relative z-10 flex-1 text-center text-sm font-semibold rounded-full"
        disabled={disabled}
        aria-pressed={isActive(option1Value)}
      >
        <span
          className={`transition-all duration-300 ${
            isActive(option1Value) ? 'text-black scale-105' : 'text-gray-500'
          }`}
        >
          {option1Label}
        </span>
      </button>

      {/* Option 2 */}
      <button
        type="button"
        onClick={() => !disabled && onChange(option2Value)}
        className="relative z-10 flex-1 text-center text-sm font-semibold rounded-full"
        disabled={disabled}
        aria-pressed={isActive(option2Value)}
      >
        <span
          className={`transition-all duration-300 ${
            isActive(option2Value) ? 'text-black scale-105' : 'text-gray-500'
          }`}
        >
          {option2Label}
        </span>
      </button>
    </div>
  );
};
