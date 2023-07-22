import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserForm.module.css";

interface UserFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  [key: string]: string | number | null | File;
}

interface AttributeOption {
  label: string;
  control: string;
  controlType: string;
  placeholder?: string;
  validation?: {
    [key: string]: string | boolean;
  };
  values?: string[];
}

interface Attribute {
  name: string;
  type: string;
  options?: AttributeOption;
}

interface OptionsResponse {
  message: string;
  result: {
    attributes: Attribute[];
  };
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [options, setOptions] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get<OptionsResponse>(
          "http://localhost:8080/api/v1/users/options"
        );
        const attributes = response.data.result.attributes;
        const initialFormData: FormData = {};
        for (const attribute of attributes) {
          initialFormData[attribute.name] = "";
        }
        setFormData(initialFormData);
        setOptions(attributes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching options:", error);
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let sanitizedValue: string | number | null | File;

    // Check if the value is null or a File
    if (value === null) {
      sanitizedValue = value;
    } else {
      // If it's not null or a File, convert to string or number as appropriate
      sanitizedValue = value === "" ? null : Number(value) || String(value);
    }

    setFormData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const renderFormFields = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

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
        required: validation?.required ? true : false, // Convert to boolean
        pattern: validation?.pattern ? String(validation.pattern) : undefined,
      };

      // Handle supported control types
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
          </div>
        );
      } else if (controlType === "radio" && name === "gender") {
        // Handle radio control type for "gender" field
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
        // Handle unsupported control types
        currentRowInputs.push(
          <div key={name} className="col-md-6">
            <p>Unsupported control type: {controlType}</p>
          </div>
        );
      }

      // If we have two inputs in the current row, push them to the rows array and reset currentRowInputs
      if (currentRowInputs.length === 2) {
        rows.push(
          <div key={name} className="row">
            {currentRowInputs}
          </div>
        );
        currentRowInputs = [];
      }
    });
    return rows;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit} className={styles.all}>
            <h2 className="text-center">Add User</h2>

            {renderFormFields()}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
