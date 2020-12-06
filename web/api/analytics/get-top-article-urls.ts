const getTopArticleUrls = async (fetch: typeof window.fetch): Promise<string[]> => {
  const response = await fetch('/analytics/top-article-urls/');

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      // eslint-disable-next-line no-console
      console.error(new Error(`Unsupported response status: ${response.status}`));
      return [];
    }
  }
};

export default getTopArticleUrls;
  