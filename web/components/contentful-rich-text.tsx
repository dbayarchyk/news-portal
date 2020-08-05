import React from "react";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type ContentfulRichTextProps = {
  document: Document;
};

const ContentfulRichText: React.FC<ContentfulRichTextProps> = ({
  document,
}) => {
  return <>{documentToReactComponents(document)}</>;
};

export default ContentfulRichText;
