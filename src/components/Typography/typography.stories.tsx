import type { Meta, StoryObj } from "@storybook/react";

import {
  HeadingOne,
  HeadingTwo,
  TextMonoBold,
  TextMonoBoldItalic,
  TextMonoRegular,
  TextMonoRegularItalic,
  TextSansBold,
  TextSansBoldItalic,
  TextSansRegular,
  TextSansRegularItalic,
  TextSerifBold,
  TextSerifBoldItalic,
  TextSerifRegular,
  TextSerifRegularItalic,
} from ".";

const meta: Meta<typeof HeadingOne> = {
  title: "Tokens/Typography",
  component: HeadingOne,
};

export default meta;
type Story = StoryObj<typeof HeadingOne>;

export const Typography: Story = {
  render: () => {
    return (
      <>
        <HeadingOne as="h1">Heading One</HeadingOne>
        <HeadingTwo as="h2">Heading Two</HeadingTwo>
        <hr />
        <TextSerifRegular>Text/Serif/Regular</TextSerifRegular>
        <TextSerifRegularItalic>
          Text/Serif/Regular/Italic
        </TextSerifRegularItalic>
        <TextSerifBold>Text/Serif/Bold</TextSerifBold>
        <TextSerifBoldItalic>Text/Serif/Bold/Italic</TextSerifBoldItalic>
        <hr />
        <TextSansRegular>Text/Sans/Regular</TextSansRegular>
        <TextSansRegularItalic>Text/Sans/Regular/Italic</TextSansRegularItalic>
        <TextSansBold>Text/Sans/Bold</TextSansBold>
        <TextSansBoldItalic>Text/Sans/Bold/Italic</TextSansBoldItalic>
        <hr />
        <TextSansRegular size="mini">Text/Sans/Regular/Mini</TextSansRegular>
        <TextSansRegularItalic size="mini">
          Text/Sans/Regular/Italic/Mini
        </TextSansRegularItalic>
        <TextSansBold size="mini">Text/Sans/Bold/Mini</TextSansBold>
        <TextSansBoldItalic size="mini">
          Text/Sans/Bold/Italic/Mini
        </TextSansBoldItalic>
        <hr />
        <TextSansRegular size="micro">Text/Sans/Regular/Micro</TextSansRegular>
        <TextSansRegularItalic size="micro">
          Text/Sans/Regular/Italic/Micro
        </TextSansRegularItalic>
        <TextSansBold size="micro">Text/Sans/Bold/Micro</TextSansBold>
        <TextSansBoldItalic size="micro">
          Text/Sans/Bold/Italic/Micro
        </TextSansBoldItalic>
        <hr />
        <TextMonoRegular>Text/Mono/Regular</TextMonoRegular>
        <TextMonoRegularItalic>Text/Mono/Regular/Italic</TextMonoRegularItalic>
        <TextMonoBold>Text/Mono/Bold</TextMonoBold>
        <TextMonoBoldItalic>Text/Mono/Bold/Italic</TextMonoBoldItalic>
        <hr />
      </>
    );
  },
};
