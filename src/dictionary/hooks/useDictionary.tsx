import { Dictionary } from "@/dictionary/types";
import { useState } from "react";

type DictionaryAction = {
  type: "update" | "save" | "get" | "reset";
  payload: Dictionary;
};
function useDictionary() {
  const dictionaryData = JSON.parse(localStorage.getItem("dictionary") ?? "{}");
  const [dictionary, setDictionary] = useState<Dictionary>(dictionaryData);

  function reducer(state: Dictionary, action: DictionaryAction) {
    switch (action.type) {
      case "update":
        return { ...state, ...action.payload };
      case "save":
        localStorage.setItem("dictionary", JSON.stringify(state));
        return state;
      case "reset":
        localStorage.removeItem("dictionary");
        return {};
      case "get":
        return state;
    }
  }

  function updateDictionary(payload: Dictionary) {
    const newDictionary = { ...dictionary, ...payload };
    setDictionary(newDictionary);
    return newDictionary;
  }

  function saveDictionary() {
    setDictionary((prevDictionary) =>
      reducer(prevDictionary, { type: "save", payload: {} })
    );
  }

  function getDictionary() {
    return dictionary;
  }

  function resetDictionary() {
    setDictionary((prevDictionary) =>
      reducer(prevDictionary, { type: "reset", payload: {} })
    );
  }

  return {
    dictionary,
    getDictionary,
    updateDictionary,
    saveDictionary,
    resetDictionary,
  };
}

export default useDictionary;
