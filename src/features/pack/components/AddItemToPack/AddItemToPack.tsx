import { ChangeEvent, useEffect, useState } from "react";

import type { Item } from "api/items";
import useOutsideClick from "hooks/useOutsideClick/useOutsideClick";

import { Button } from "components/Button";
import { Input } from "components/Input";

import {
  ButtonWrapper,
  InputWrapper,
  Result,
  ResultList,
} from "./AddItemToPack.styled";

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
          {(!!results.length || !!query.length) && (
            <ResultList>
              {query && (
                <Result onClick={handleOnInitiateCreate}>
                  <p>Create "{query}"</p>
                </Result>
              )}
              {results?.map((item) => (
                <Result onClick={() => handleOnSelect(item)} key={item.id}>
                  <p>
                    {item.type} – {item.description}
                  </p>
                </Result>
              ))}
            </ResultList>
          )}
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
