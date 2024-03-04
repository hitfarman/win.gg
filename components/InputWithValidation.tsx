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
      <div className="relative mt-2">
        <input
          id={name}
          name={name}
          placeholder={label}
          className={`block w-full border border-b-win-primary bg-transparent py-1.5 text-white 
           ring-0 transition-colors focus:border-white focus:outline-none focus:ring-0 sm:text-sm sm:leading-6 ${
             error
               ? "border-red-900 text-red-900 hover:border-b-red-900"
               : "border-transparent hover:border-b-win-primary"
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
