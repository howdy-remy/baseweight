import { DragHandle } from "../DragHandle";
import { IconButton } from "../IconButton";
import {
  HeadingTwo,
  TextMonoBoldItalic,
  TextMonoRegularItalic,
} from "../Typography";
import { Block, CategoryColor, CategoryWrapper } from "./Category.styled";

type CategoryProps = {
  categoryName?: string | null;
  color: string;
  quantity: number;
  weight: number;
  weightUnit: string;
};

export const Category = ({
  categoryName,
  color,
  quantity,
  weight,
  weightUnit,
}: CategoryProps) => {
  return (
    <CategoryWrapper>
      <Block>
        <DragHandle />
        <CategoryColor $color={color} />
        <HeadingTwo>{categoryName}</HeadingTwo>
      </Block>
      <Block>
        <TextMonoBoldItalic>
          {weight} {weightUnit}
        </TextMonoBoldItalic>
        <TextMonoRegularItalic>x {quantity}</TextMonoRegularItalic>
        <IconButton variant="secondary" icon="menu" />
      </Block>
    </CategoryWrapper>
  );
};
