import { Token } from "@/dictionary/types";

export const getDefaultTokenSummary = () => ({
  article: {
    total: 0,
    previousTotal: 0,
    lastAddedTotal: 0,
  },
  noun: {
    total: 0,
    previousTotal: 0,
    lastAddedTotal: 0,
  },
  verb: {
    total: 0,
    previousTotal: 0,
    lastAddedTotal: 0,
  },
  adjective: {
    total: 0,
    previousTotal: 0,
    lastAddedTotal: 0,
  },
  adverb: {
    total: 0,
    previousTotal: 0,
    lastAddedTotal: 0,
  },
  other: {
    total: 0,
    previousTotal: 0,
    lastAddedTotal: 0,
  },
  error: {
    total: 0,
    previousTotal: 0,
    lastAddedTotal: 0,
  },
});

export const getInitialResultByToken = () => {
  const initialResult: {
    [key in Token]: {
      lexemes: string[];
      positions: string[];
    };
  } = {
    article: {
      lexemes: [],
      positions: [],
    },
    noun: {
      lexemes: [],
      positions: [],
    },
    verb: {
      lexemes: [],
      positions: [],
    },
    adjective: {
      lexemes: [],
      positions: [],
    },
    adverb: {
      lexemes: [],
      positions: [],
    },
    other: {
      lexemes: [],
      positions: [],
    },
    error: {
      lexemes: [],
      positions: [],
    },
  };
  return initialResult;
};
