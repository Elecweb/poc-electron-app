import { useEffect, useState } from 'react';
import { fetchGet } from '../utils/services/fetch';

type PokemonItem = {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    other: {
      ['dream_world']: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  };
};

const usePokemon = (id: string) => {
  const [pokemon, setPokemon] = useState<PokemonItem>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchGet(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((data: PokemonItem) => {
        console.log('data', data);
        setLoading(false);
        setPokemon(data);
      })
      .catch(() => {
        setLoading(false);
      });
    return () => {};
  }, []);

  return {
    pokemon,
    loading,
    error,
  };
};

export default usePokemon;
