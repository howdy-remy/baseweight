import { useEffect, useMemo, useState } from "react";

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
  categoryNumber: number;
  onClose: () => void;
  onSubmit: (category: Partial<Category>) => void;
};

export const CategoryModal = ({
  isOpen,
  initialProps,
  categoryNumber,
  onClose,
  onSubmit,
}: CategoryModalProps) => {
  // form state
  const [isEdit, setIsEdit] = useState(false);
  const [categoryName, setCategoryName] = useState<string | null | undefined>(
    "",
  );

  const colors = [
    "#FFC31B", // Golden Yellow
    "#D13D1F", // Red Orange
    "#1A495D", // Dark Blue
    "#8B4513", // Saddle Brown
    "#FF6B35", // Bright Orange
    "#2E8B57", // Sea Green
    "#9B59B6", // Purple
    "#F39C12", // Orange
    "#3498DB", // Blue
    "#FA8072", // Salmon
    "#34495E", // Dark Gray Blue
    "#E67E22", // Carrot Orange
  ];

  const color = useMemo(() => {
    return colors[(categoryNumber + 1) % colors.length];
  }, [categoryNumber, colors]);

  const [categoryColor, setCategoryColor] = useState<string | null | undefined>(
    color,
  );

  useEffect(() => {
    if (!!initialProps) {
      setIsEdit(true);
      setCategoryName(initialProps.name);
      setCategoryColor(initialProps.color);
    } else {
      setIsEdit(false);
      setCategoryName("");
      setCategoryColor(color);
    }
  }, [initialProps?.name, initialProps?.color, color]);

  const resetFormState = () => {
    setCategoryName("");
    setCategoryColor(color);
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
        role="form"
      >
        <FieldsWrapper>
          <Field label="Category name">
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
