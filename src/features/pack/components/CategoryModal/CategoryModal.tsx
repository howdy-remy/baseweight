import { useEffect, useState } from "react";

import { Category } from "api/categories";

import { Button } from "components/Button";
import { Field } from "components/Field";
import { Input } from "components/Input";
import { ActionsWrapper, Modal } from "components/Modal";
import { HeadingTwo } from "components/Typography";

import { FieldsWrapper, StyledForm } from "./CategoryModal.styled";

type CategoryModalProps = {
  isOpen: boolean;
  initialProps: Partial<Category> | null;
  onClose: () => void;
  onSubmit: (category: Partial<Category>) => void;
};

export const CategoryModal = ({
  isOpen,
  initialProps,
  onClose,
  onSubmit,
}: CategoryModalProps) => {
  // form state
  const [isEdit, setIsEdit] = useState(false);
  const [categoryName, setCategoryName] = useState<string | null | undefined>(
    "",
  );
  const [categoryColor, setCategoryColor] = useState<string | null | undefined>(
    "#44584B",
  );

  useEffect(() => {
    if (!!initialProps) {
      setIsEdit(true);
      setCategoryName(initialProps.name);
      setCategoryColor(initialProps.color);
    } else {
      setIsEdit(false);
      setCategoryName("");
      setCategoryColor("#44584B");
    }
  }, [initialProps?.name]);

  const resetFormState = () => {
    setCategoryName("");
    setCategoryColor("#44584B");
  };

  // create category -----------------------------------------------------------
  const addCategory = async () => {
    await onSubmit({
      ...initialProps,
      name: categoryName,
      color: categoryColor,
    });
    resetFormState();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HeadingTwo as="h2">
        {isEdit ? `Edit ${initialProps?.name}` : "Create a new category"}
      </HeadingTwo>
      <StyledForm
        onSubmit={(event) => {
          event.preventDefault();
          addCategory();
        }}
        className="form-widget"
        role="form"
      >
        <FieldsWrapper>
          <Field label="Category Name">
            <Input
              type="text"
              name="Category Name"
              value={categoryName || ""}
              placeholder="name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Field>
          <Field label="Color">
            <Input
              type="color"
              name="color"
              value={categoryColor || ""}
              placeholder="color"
              onChange={(e) => setCategoryColor(e.target.value)}
            />
          </Field>
        </FieldsWrapper>
        <ActionsWrapper>
          <Button variant="secondary" size="medium" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="medium" type="submit">
            Save
          </Button>
        </ActionsWrapper>
      </StyledForm>
    </Modal>
  );
};
