import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import useDictionary from "@/dictionary/hooks/useDictionary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dictionary, Token, TokenizeResult } from "@/dictionary/types";
import {
  getDefaultTokenSummary,
  getInitialResultByToken,
} from "@/dictionary/constants";
import {
  getLexemes,
  normalizeLexeme,
  tokenizeLexemes,
} from "@/dictionary/usecases";
import SelectToken from "@/dictionary/ui/SelectToken";

function Tokenizer() {
  const { dictionary, updateDictionary, saveDictionary, resetDictionary } =
    useDictionary();

  const initialTokenSummary = Object.entries(dictionary).reduce(
    (acc, [, token]) => {
      acc[token].total += 1;
      acc[token].previousTotal += 1;
      return acc;
    },
    getDefaultTokenSummary()
  );
  const [tokenSummary, setTokenSummary] = useState(initialTokenSummary);

  const [lexemes, setLexemes] = useState<string[]>([]);
  const [currentLexemeIndex, setCurrentLexemeIndex] = useState<number>(0);

  const [isUserSelectingToken, setIsUserSelectingToken] =
    useState<boolean>(false);
  const [result, setResult] = useState<TokenizeResult[]>([]);

  const [processedLexemes, setProcessedLexemes] = useState(0);
  const [assignedLexemes, setAssignedLexemes] = useState(0);

  const [hasFinished, setHasFinished] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setResult([]);
    setProcessedLexemes(0);
    setAssignedLexemes(0);
    setHasFinished(false);
    setLexemes([]);
    updateTokenSummary();
    if (!file) {
      return;
    }

    const text = await file.text();
    const lexemeArray = getLexemes(text);

    setLexemes(lexemeArray);

    const currentLexemeIndex = 0;
    setCurrentLexemeIndex(currentLexemeIndex);
    tokenize(dictionary, lexemeArray, currentLexemeIndex);
  }

  const tokenize = (
    dictionary: Dictionary,
    lexemes: string[],
    startIndex: number
  ) => {
    const { result, hasFinished, lastIndex } = tokenizeLexemes(
      dictionary,
      lexemes,
      startIndex
    );
    // We update the result
    if (result.length > 0) {
      updateResult(result, lastIndex, lexemes);
    }

    // If the process has finished, we save the dictionary
    if (hasFinished) {
      setIsUserSelectingToken(false);
      saveDictionary();
      setHasFinished(true);
      return;
    }

    // If we haven't found a token for a lexeme, we ask the user to select a token
    setCurrentLexemeIndex(lastIndex);
    setIsUserSelectingToken(true);
  };

  function handleSelectedToken(selectedToken: Token) {
    if (!selectedToken || currentLexemeIndex >= lexemes.length) {
      return;
    }
    setAssignedLexemes((previousValue) => previousValue + 1);
    const lexeme = lexemes[currentLexemeIndex];
    const result = [
      { lexeme, token: selectedToken, position: currentLexemeIndex + 1 },
    ];
    updateResult(result, currentLexemeIndex, lexemes);

    setIsUserSelectingToken(false);

    // Update the dictionary
    const normalizedLexeme = normalizeLexeme(lexeme);
    const updatedDictionary = updateDictionary({
      [normalizedLexeme]: selectedToken,
    });

    // Update the summary information
    const newValue = { ...tokenSummary };
    newValue[selectedToken].total += 1;
    newValue[selectedToken].lastAddedTotal += 1;
    setTokenSummary(newValue);

    // Continue with the next lexeme
    tokenize(updatedDictionary, lexemes, currentLexemeIndex + 1);
  }

  function updateResult(
    result: TokenizeResult[],
    lastIndex: number,
    lexemes: string[]
  ) {
    setResult((prevResult) => [...prevResult, ...result]);

    if (processedLexemes <= 100) {
      const newProgress = Math.round(((lastIndex + 1) / lexemes.length) * 100);
      setProcessedLexemes(newProgress);
    }
  }

  function updateTokenSummary() {
    const newValue = { ...tokenSummary };
    Object.entries(newValue).forEach(([key, value]) => {
      newValue[key].previousTotal = value.total;
      newValue[key].lastAddedTotal = 0;
    });
    setTokenSummary(newValue);
  }

  function downloadResult() {
    const resultByToken = getInitialResultByToken();
    result.forEach(({ lexeme, token, position }) => {
      resultByToken[token].lexemes.push(lexeme);
      resultByToken[token].positions.push(`TXT1-${position}`);
    });
    const resultStr = JSON.stringify(resultByToken, null, 2);
    const blob = new Blob([resultStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result.json";
    a.click();
  }

  function cleanUp() {
    setResult([]);
    setProcessedLexemes(0);
    setAssignedLexemes(0);
    setHasFinished(false);
    setLexemes([]);
    updateTokenSummary();
    if (fileInputRef.current?.value) fileInputRef.current.value = "";
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-row gap-10">
        <div>
          <Label htmlFor="picture">Archivo a tokenizar</Label>
          <Input
            id="picture"
            type="file"
            accept=".txt"
            onChange={handleUploadFile}
            ref={fileInputRef}
            disabled={lexemes.length > 0 && !hasFinished}
          />
        </div>
        {lexemes.length === 0 && (
          <Button
            className="w-min via-amber-5 mt-6"
            onClick={() => {
              resetDictionary();
              setTokenSummary(getDefaultTokenSummary());
            }}
            variant={"destructive"}
          >
            Resetear diccionario
          </Button>
        )}
      </div>
      {isUserSelectingToken && (
        <div className="flex justify-center flex-col items-center gap-4">
          <SelectToken
            lexeme={lexemes[currentLexemeIndex]}
            handleSelectedToken={handleSelectedToken}
          />
        </div>
      )}

      {lexemes.length > 0 && (
        <div className="flex flex-row justify-center gap-4">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Lexemas procesados</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <h2 className="text-xl">
                  <span className="font-extrabold">{processedLexemes}</span>%
                </h2>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Lexemas asignados</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <h2 className="text-xl">
                  <span className="font-extrabold">
                    {assignedLexemes &&
                      lexemes?.length &&
                      Math.round((assignedLexemes / lexemes.length) * 100)}
                  </span>
                  %
                </h2>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      {hasFinished && (
        <>
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Tokens
          </h2>
          <Table containerClassName="max-h-150">
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Cantidad de lexemas</TableHead>
                <TableHead>Cantidad de lexemas previos</TableHead>
                <TableHead>Cantidad de lexemas asignados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(tokenSummary).map(([key, summary]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>

                  <TableCell>{summary.total}</TableCell>
                  <TableCell>{summary.previousTotal}</TableCell>
                  <TableCell>{summary.lastAddedTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-3">
            <Button className="w-min" onClick={downloadResult}>
              Descargar resultado
            </Button>
            <Button className="w-min" variant={"ghost"} onClick={cleanUp}>
              Limpiar
            </Button>
          </div>
        </>
      )}
    </main>
  );
}

export default Tokenizer;
