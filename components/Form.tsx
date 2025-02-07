"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { formFields } from "@/constant/index";

interface FormProps {
  containerClass?: string;
  prop: string;
  bgclass: string;
}

const Form: React.FC<FormProps> = ({ containerClass = "", prop, bgclass }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errors: { [key: string]: string } = {};
    formFields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        errors[field.id] = `${field.label} is required.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log("Form data:", formData);

    setFormData({});
  };

  return (
    <div className={`bg-white ${containerClass}`}>
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          {formFields.map((field) => (
            <div key={field.id} className="relative z-0 w-full mb-5 group">
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none peer outline-none"
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={handleInputChange}
                required={field.required}
              />
              <label
                htmlFor={field.id}
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                {field.label}
              </label>
              {formErrors[field.id] && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors[field.id]}
                </p>
              )}
            </div>
          ))}
        </div>

        <Button
          type="submit"
          className={`text-white font-medium py-2 px-4 mt-4 rounded-md ${bgclass}`}
        >
          {prop}
        </Button>
      </form>
    </div>
  );
};

export default Form;
