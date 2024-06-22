export type Token = "article" | "noun" | "verb" | "adjective" | "adverb" | "other" | "error";

export type TokenSummary = {
  total: number;
  previousTotal: number;
  lastAddedTotal: number;
};

export type Dictionary = Record<string, Token >;


export type TokenizeResult = {
  lexeme: string;
  token: Token;
  position: number;
};