import { useState } from "react";

import { Category } from "api/categories";

import { Button } from "components/Button";
import { Field } from "components/Field";
import { Input } from "components/Input";
import { ActionsWrapper, Modal } from "components/Modal";
import { HeadingTwo } from "components/Typography";

import { FieldsWrapper, StyledForm } from "./CreateCategoryModal.styled";

type CreateCategoryModalProps = {
  onSubmit: (category: Partial<Category>) => void;
};

export const CreateCategoryModal = ({ onSubmit }: CreateCategoryModalProps) => {
  // modal state
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);

  // form state
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#44584B");

  const resetFormState = () => {
    setCategoryName("");
    setCategoryColor("#44584B");
  };

  // create category -----------------------------------------------------------
  const addCategory = async () => {
    await onSubmit({
      name: categoryName,
      color: categoryColor,
    });
    setIsCreateCategoryModalOpen(false);
    resetFormState();
  };

  return (
    <div>
      <Modal
        isOpen={isCreateCategoryModalOpen}
        onClose={() => setIsCreateCategoryModalOpen(false)}
      >
        <HeadingTwo as="h2">Create a new category</HeadingTwo>
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
                value={categoryName}
                placeholder="name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Field>
            <Field label="Color">
              <Input
                type="color"
                name="color"
                value={categoryColor}
                placeholder="color"
                onChange={(e) => setCategoryColor(e.target.value)}
              />
            </Field>
          </FieldsWrapper>
          <ActionsWrapper>
            <Button
              variant="secondary"
              size="medium"
              onClick={() => setIsCreateCategoryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="medium" type="submit">
              Create category
            </Button>
          </ActionsWrapper>
        </StyledForm>
      </Modal>

      <Button
        variant="secondary"
        size="large"
        expandWidth
        onClick={() => setIsCreateCategoryModalOpen(true)}
      >
        Add category
      </Button>
    </div>
  );
};
