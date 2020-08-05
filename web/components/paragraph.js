import React from "react";

import ContentfulRichText from "./contentful-rich-text";

function Paragraph({ paragraph }) {
  return <ContentfulRichText document={paragraph.content.json} />;
}

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
