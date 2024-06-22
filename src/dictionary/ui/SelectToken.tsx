import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Token } from "@/dictionary/types";
import { useState } from "react";
type SelectTokenProps = {
  lexeme: string;
  handleSelectedToken: (selectedToken: Token) => void;
};
function SelectToken(props: SelectTokenProps) {
  const { lexeme, handleSelectedToken } = props;
  const [userSelectedToken, setUserSelectedToken] = useState<Token>(
    "" as Token
  );
  return (
    <div className="flex justify-center flex-col items-center gap-2">
      <h2>Oops, lexema no encontrado en el diccionario:</h2>
      <Label>
        <p className="text-8xl font-serif text-center">{lexeme}</p>
      </Label>
      <Select onValueChange={(value) => setUserSelectedToken(value as Token)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un token" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tokens</SelectLabel>
            <SelectItem value="article">Artículo</SelectItem>
            <SelectItem value="noun">Sustantivo</SelectItem>
            <SelectItem value="verb">Verbo</SelectItem>
            <SelectItem value="adjective">Adjectivo</SelectItem>
            <SelectItem value="adverb">Adverbio</SelectItem>
            <SelectItem value="other">Otros</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        className="w-min"
        onClick={() => handleSelectedToken(userSelectedToken)}
      >
        Guardar
      </Button>
    </div>
  );
}

export default SelectToken;
