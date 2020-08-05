import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function ContentfulRichText({ document }) {
  return documentToReactComponents(document);
}

export default ContentfulRichText;
