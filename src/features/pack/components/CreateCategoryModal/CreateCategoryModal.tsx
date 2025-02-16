import { useState } from "react";
import { Modal } from "components/Modal";
import { Button } from "components/Button";
import { useCreateCategoryMutation } from "api/categories";

type CreateCategoryModalProps = {
  packId?: string;
  refetch: () => void;
};

export const CreateCategoryModal = ({
  packId,
  refetch,
}: CreateCategoryModalProps) => {
  // modal state
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);

  // form state
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#44584B");

  // create category -----------------------------------------------------------
  const [createCategory] = useCreateCategoryMutation();
  const addCategory = async () => {
    if (!packId) return;
    await createCategory({
      name: categoryName,
      color: categoryColor,
      pack_id: packId,
    });
    setIsCreateCategoryModalOpen(false);
    refetch();
  };

  return (
    <div>
      <Modal
        isOpen={isCreateCategoryModalOpen}
        onClose={() => setIsCreateCategoryModalOpen(false)}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addCategory();
          }}
          className="form-widget"
          role="form"
        >
          <fieldset>
            <label htmlFor="name">name</label>
            <input
              id="name"
              type="text"
              value={categoryName}
              placeholder="name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="color">color</label>
            <input
              id="color"
              type="color"
              value={categoryColor}
              placeholder="color"
              onChange={(e) => setCategoryColor(e.target.value)}
            />
          </fieldset>

          <button className="button block primary" type="submit">
            Add category
          </button>
        </form>
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
