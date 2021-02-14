import { useEffect, useState } from 'react';
import { fetchGet } from '../utils/services/fetch';

type PokemonItem = {
  name: string;
  weight: number;
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
};

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Array<PokemonItem>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchGet('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then((data: { results: Array<{ url: string }> }) => {
        return Promise.all(data.results.map((item) => fetchGet(item.url)));
      })
      .then((items: Array<PokemonItem>) => {
        console.log('items', items);
        setLoading(false);
        setPokemons(items);
      })
      .catch(() => {
        setLoading(false);
      });
    return () => {};
  }, []);

  return {
    pokemons,
    loading,
    error,
  };
};

export default usePokemons;
