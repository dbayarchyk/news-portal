export type Position = {
  id: string;
  name: string;
};

type PositionCollection = {
  items: Position[];
};

const getPositions = async (): Promise<PositionCollection> => {
  const response = await fetch("/market/positions/");

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

export default getPositions;
