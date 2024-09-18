import React from "react";

export default function Input({
    type,
    placeholder,
    value,
    onChange,
    label,
    disabled,
}: {
    type: string;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    disabled?: boolean;
}) {
    return (
        <div className="w-60 my-2">
            <label
                htmlFor="first_name"
                className="block mt-2 mb-1 text-sm font-medium text-gray-500"
            >
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled ? true : false}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
            />
        </div>
    );
}
