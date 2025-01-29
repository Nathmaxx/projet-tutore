import React from 'react';

interface ComboBoxProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function ComboBox({ options, value, onChange, placeholder = "Sélectionner..." }: ComboBoxProps) {
    return (
        <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}