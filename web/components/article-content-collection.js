import React from "react";

import Paragraph from "./paragraph";

function ArticleContentCollection({ article }) {
  return (
    <>
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
    </>
  );
}

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
