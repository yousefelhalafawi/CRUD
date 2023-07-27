import React from "react";
import { Attribute } from "../../interfaces/interfaces";

interface FormData {
  [key: string]: string | number | null | File;
}

interface FormFieldsRendererProps {
  options: Attribute[];
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const FormFieldsRenderer: React.FC<FormFieldsRendererProps> = ({
  options,
  formData,
  handleChange,
}) => {
  const renderFormFields = () => {
    const rows: JSX.Element[] = [];
    let currentRowInputs: JSX.Element[] = [];

    options.forEach((attribute) => {
      const { name, type, options: attributeOptions } = attribute;
      const { label, controlType, placeholder, validation } =
        attributeOptions || {};

      const inputProps = {
        className: "form-control",
        id: name,
        name: name,
        value: String(formData[name] || ""),
        onChange: handleChange,
        placeholder: placeholder,
        required: validation?.required ? true : false,
        pattern: validation?.pattern ? String(validation.pattern) : undefined,
        minLength: validation?.min ? Number(validation.min) : undefined,
        maxLength: validation?.max ? Number(validation.max) : undefined,
      };

      if (
        controlType === "text" ||
        controlType === "email" ||
        controlType === "number" ||
        controlType === "date"
      ) {
        currentRowInputs.push(
          <div key={name} className="col-md-6 mb-3">
            <label htmlFor={name} className="form-label">
              {label}
            </label>
            <input type={controlType} {...inputProps} />
            {validation?.min && validation?.max && (
              <small className="form-text">
                Min: {validation.min}, Max: {validation.max}
              </small>
            )}
          </div>
        );
      } else if (controlType === "radio" && name === "gender") {
        currentRowInputs.push(
          <div key={name} className="col-md-6 mb-3">
            <label className="form-label">{label}</label>
            {attributeOptions?.values?.map((value: string) => (
              <div key={value} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={name}
                  value={value}
                  checked={formData[name] === value}
                  onChange={handleChange}
                  {...validation}
                />
                <label className="form-check-label">{value}</label>
              </div>
            ))}
          </div>
        );
      } else {
        currentRowInputs.push(
          <div key={name} className="col-md-6">
            <p>Unsupported control type: {controlType}</p>
          </div>
        );
      }

      if (currentRowInputs.length === 2) {
        rows.push(
          <div key={name} className="row">
            {currentRowInputs}
          </div>
        );
        currentRowInputs = [];
      }
    });

    // If there are any remaining inputs that didn't make it into a row, add them to the rows
    if (currentRowInputs.length > 0) {
      rows.push(
        <div key="remainingInputs" className="row">
          {currentRowInputs}
        </div>
      );
    }

    return rows;
  };

  return <>{renderFormFields()}</>;
};

export default FormFieldsRenderer;
