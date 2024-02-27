import { useState } from "react";

interface ICurrTabDetails {
  value: string;
  tabTitle: string;
  isCancel: boolean;
}

const useCurrTabDetails = (value: ICurrTabDetails) => {
  const [currTabDetails, setCurrTabDetails] = useState<ICurrTabDetails>(value);
  return {
    currTabDetails,
    setCurrTabDetails,
  };
};

export default useCurrTabDetails;
