// api.ts
import axios from "axios";

interface AttributeOptions {
  label: string;
  control: string;
  controlType: string;
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    required?: boolean;
    minDigits?: number;
    maxDigits?: number;
    minDate?: string;
  };
}

interface Attribute {
  name: string;
  type: string;
  options?: AttributeOptions;
}

interface OptionsResponse {
  message: string;
  result: {
    attributes: Attribute[];
  };
}

export const getOptionsFromBackend = async (): Promise<OptionsResponse> => {
  const response = await axios.get<OptionsResponse>(
    "http://localhost:8080/api/v1/users/options"
  );
  return response.data;
};
