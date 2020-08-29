import React from "react";

import Paragraph from "./paragraph";
import Stack from "./ui/layouts/stack";
import { ArticleContentCollection_ArticleFragment } from "../generated/graphql-types";

type ArticleContentCollectionProps = {
  article: ArticleContentCollection_ArticleFragment;
};

const ArticleContentCollection: React.FCWithFragments<ArticleContentCollectionProps> = ({
  article,
}) => {
  return (
    <Stack scale="6">
      {article.contentCollection.items.map((item) => {
        switch (item.__typename) {
          case "Paragraph": {
            return <Paragraph key={item.sys.id} paragraph={item} />;
          }

          default: {
            return null;
          }
        }
      })}
    </Stack>
  );
};

ArticleContentCollection.fragments = {
  article: /* GraphQL */ `
    fragment ArticleContentCollection_article on Article {
      contentCollection {
        items {
          __typename
          sys {
            id
          }
          ... on Paragraph {
            ...Paragraph_paragraph
          }
        }
      }
    }
    ${Paragraph.fragments.paragraph}
  `,
};

export default ArticleContentCollection;
