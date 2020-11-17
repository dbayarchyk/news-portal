export type City = {
  id: string;
  name: string;
};

type CityCollection = {
  items: City[];
};

const getCities = async (fetch: typeof window.fetch): Promise<CityCollection> => {
  const response = await fetch("/market/cities/");

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

export default getCities;
