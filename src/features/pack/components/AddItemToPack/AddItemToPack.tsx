import { ChangeEvent, useEffect, useState } from "react";

import type { Item } from "api/items";
import useOutsideClick from "hooks/useOutsideClick/useOutsideClick";

import { Button } from "components/Button";
import { Input } from "components/Input";

import { Result, ResultList } from "./AddItemToPack.styled";

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

  // query handler & initial search --------------------------------------------
  const [query, setQuery] = useState("");
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e);
  };

  useEffect(() => {
    handleOnChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  }, []);

  // reset on outside click ----------------------------------------------------
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setQuery("");
    handleOnChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    setIsAddMode(false);
  });

  // click handlers ------------------------------------------------------------
  const handleOnInitiateCreate = () => {
    onInitiateCreate(query);
    setQuery("");
    setIsAddMode(false);
  };

  const handleOnSelect = (item: Item) => {
    onSelect(item);
    setQuery("");
    setIsAddMode(false);
  };

  // open state
  if (isAddMode) {
    return (
      <>
        <div ref={ref}>
          <Input
            onChange={handleOnChange}
            value={query}
            placeholder="Search for an item..."
          />
          {(results.length || query) && (
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
        </div>
      </>
    );
  }

  // default state
  return (
    <Button
      variant="secondary"
      size="large"
      expandWidth
      onClick={(e) => setIsAddMode(true)}
    >
      Add item
    </Button>
  );
};
