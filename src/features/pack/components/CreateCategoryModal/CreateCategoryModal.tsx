import { useState } from "react";

import { useCreateCategoryMutation } from "api/categories";

import { Button } from "components/Button";
import { Field } from "components/Field";
import { Input } from "components/Input";
import { ActionsWrapper, Modal } from "components/Modal";
import { HeadingTwo } from "components/Typography";

import { StyledForm } from "./CreateCategoryModal.styled";

type CreateCategoryModalProps = {
  nextOrder: number;
  packId?: string;
  refetch: () => void;
};

export const CreateCategoryModal = ({
  nextOrder,
  packId,
  refetch,
}: CreateCategoryModalProps) => {
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
  const [createCategory] = useCreateCategoryMutation();
  const addCategory = async () => {
    if (!packId) return;
    await createCategory({
      name: categoryName,
      color: categoryColor,
      pack_id: packId,
      order: nextOrder,
    });
    setIsCreateCategoryModalOpen(false);
    resetFormState();
    refetch();
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
        onClick={(e) => setIsCreateCategoryModalOpen(true)}
      >
        Add category
      </Button>
    </div>
  );
};
