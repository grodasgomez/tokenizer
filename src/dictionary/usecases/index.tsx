import { Dictionary } from "@/dictionary/types";
import { TokenizeResult } from "@/dictionary/types/index";

export const tokenizeLexemes = (
  dictionary: Dictionary,
  lexemes: string[],
  startIndex: number
) => {
  const result: TokenizeResult[] = [];
  for (let i = startIndex; i < lexemes.length; i++) {
    const lexeme = lexemes[i];
    const normalizedLexeme = normalizeLexeme(lexeme);
    const token = dictionary[normalizedLexeme];
    if (token) {
      result.push({ lexeme, token, position: i + 1 });
    } else {
      return { result, hasFinished: false, lastIndex: i };
    }
  }
  return { result, hasFinished: true, lastIndex: lexemes.length - 1 };
};

/**
 * Normaliza un lexema, por ahora sólo lo convierte a minúsculas y remueve los tildes.
 * Se podría mejorar, reduciendo la palabra a su raíz,
 * por ejemplo: "corriendo" -> "correr", "autos" -> "auto", etc.
 * @param lexeme Lexema a normalizar
 * @returns Lexema normalizado
 */
export const normalizeLexeme = (lexeme: string) => {
  return lexeme
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
