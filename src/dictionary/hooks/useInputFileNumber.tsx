import { useState } from "react";

function useInputFileNumber() {
  const initialInputFileNumber = Number(
    localStorage.getItem("inputFileNumber") ?? 0
  );
  const [inputFileNumber, privateSetInputFileNumber] = useState<number>(
    initialInputFileNumber
  );

  const setInputFileNumber = (inputFileNumber: number) => {
    localStorage.setItem("inputFileNumber", String(inputFileNumber));
    privateSetInputFileNumber(inputFileNumber);
  };

  return { inputFileNumber, setInputFileNumber };
}

export default useInputFileNumber;
