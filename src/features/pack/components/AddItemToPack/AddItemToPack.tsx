import { ChangeEvent, useEffect, useRef, useState } from "react";

import type { Item } from "api/items";
import useOutsideClick from "hooks/useOutsideClick/useOutsideClick";

import { Button } from "components/Button";
import { Input } from "components/Input";

import {
  ButtonWrapper,
  Centered,
  InputWrapper,
  Result,
  ResultList,
} from "./AddItemToPack.styled";
import { useDropdownPosition } from "hooks/useDropdownPosition/useDropdownPosition";
import { TextSansBold, TextSansRegular } from "components/Typography";

type AddItemToPackProps = {
  results: Item[];
  onInitiateCreate: (query: string) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (item: Item) => void;
};

export const AddItemToPack = ({
  results,
  onInitiateCreate,
  onSearch,
  onSelect,
}: AddItemToPackProps) => {
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    if (isAddMode) {
      ref.current?.querySelector("input")?.focus();
    }
  }, [isAddMode]);

  // add mode results ----------------------------------------------------------
  const sortedResults = [...results].sort((a, b) => {
    if (!a.type || !b.type) return 0;
    return a.type.localeCompare(b.type);
  });

  // query handler & initial search --------------------------------------------
  const [query, setQuery] = useState("");
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e);
  };

  // reset ---------------------------------------------------------------------
  const reset = () => {
    setQuery("");
    handleOnChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    setIsAddMode(false);
  };

  // click handlers ------------------------------------------------------------
  const ref = useOutsideClick<HTMLDivElement>(reset);

  const handleOnInitiateCreate = () => {
    onInitiateCreate(query);
    reset();
  };

  const handleOnSelect = (item: Item) => {
    onSelect(item);
    reset();
  };

  // dropdown position --------------------------------------------------------
  const position = useDropdownPosition(ref, 160);

  // open state
  if (isAddMode) {
    return (
      <>
        <InputWrapper ref={ref}>
          <Input
            onChange={handleOnChange}
            value={query}
            placeholder="Search for an item..."
          />
          <ResultList $position={position}>
            {query && (
              <Result onClick={handleOnInitiateCreate}>
                <p>Create "{query}"</p>
              </Result>
            )}
            {!query && !sortedResults.length && (
              <Centered>
                <TextSansRegular color="stone">
                  Start searching to add an item
                </TextSansRegular>
              </Centered>
            )}
            {sortedResults?.map((item) => (
              <Result onClick={() => handleOnSelect(item)} key={item.id}>
                <p>
                  {item.type} – {item.description}
                </p>
              </Result>
            ))}
          </ResultList>
        </InputWrapper>
      </>
    );
  }

  // default state
  return (
    <ButtonWrapper>
      <Button
        variant="secondary"
        size="large"
        expandWidth
        onClick={(e) => setIsAddMode(true)}
      >
        Add item
      </Button>
    </ButtonWrapper>
  );
};
