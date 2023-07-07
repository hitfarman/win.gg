import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import React, { ForwardRefRenderFunction, HTMLInputTypeAttribute } from "react";
import { ChangeHandler } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
};

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, error, type, onBlur, onChange },
  ref
) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={name}
          name={name}
          className={`block w-full rounded-md border-0 bg-transparent py-1.5 text-white shadow-sm   ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
            error
              ? "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500"
              : "text-gray-900 ring-gray-300 placeholder:text-white focus:ring-white"
          }`}
          ref={ref}
          type={type || "text"}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 -right-0.5 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

const InputWithValidation = React.forwardRef(Input);

export default InputWithValidation;
