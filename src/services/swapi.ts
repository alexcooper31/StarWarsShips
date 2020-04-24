import axios from 'axios';

const getShips = async (page: number) => {
  try {
    const data = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
    return data.data;
  } catch (e) {
    throw new Error('Failed to get resources.');
  }
};

export { getShips };
