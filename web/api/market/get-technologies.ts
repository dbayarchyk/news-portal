export type Technology = {
  id: string;
  name: string;
};

type TechnologyCollection = {
  items: Technology[];
};

const getTechnologies = async (): Promise<TechnologyCollection> => {
  const response = await fetch("/market/technologies/");

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

export default getTechnologies;
