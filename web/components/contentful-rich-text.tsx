import React from "react";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import BodyText from "./ui/body-text";
import Blockquote from "./ui/blockquote";
import Separator from "./ui/separator";

type ContentfulRichTextProps = {
  document: Document;
};

const ContentfulRichText: React.FC<ContentfulRichTextProps> = ({
  document,
}) => {
  return (
    <>
      {documentToReactComponents(document, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <BodyText>{children}</BodyText>
          ),
          [BLOCKS.HR]: () => <Separator orientation="horizontal" />,
          [BLOCKS.QUOTE]: (_, children) => <Blockquote>{children}</Blockquote>,
        },
      })}
    </>
  );
};

export default ContentfulRichText;
