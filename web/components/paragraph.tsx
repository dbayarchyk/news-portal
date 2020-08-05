import React from "react";

import ContentfulRichText from "./contentful-rich-text";
import { Paragraph_ParagraphFragment } from "../generated/graphql-types";

type ParagraphProps = {
  paragraph: Paragraph_ParagraphFragment;
};

const Paragraph: React.FCWithFragments<ParagraphProps> = ({ paragraph }) => {
  return <ContentfulRichText document={paragraph.content.json} />;
};

Paragraph.fragments = {
  paragraph: /* GraphQL */ `
    fragment Paragraph_paragraph on Paragraph {
      content {
        json
      }
    }
  `,
};

export default Paragraph;
