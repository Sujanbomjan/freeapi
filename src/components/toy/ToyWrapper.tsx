import React, { useState, useEffect } from "react";
import axios from "axios";
import ToyCard from "./ToyCard";
import { fetchToy } from "../../api/api";
import Skeleton from "react-loading-skeleton";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  base_experience: number;
  abilities: { ability: { name: string } }[];
}

const ToyWrapper: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const pokemonData = await fetchToy();
        const detailedPromises = pokemonData.map((pokemon: { url: string }) =>
          axios.get<Pokemon>(pokemon.url).then((details) => details.data)
        );

        const detailedPokemons = await Promise.all(detailedPromises);
        setPokemons(detailedPokemons);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="bg-white container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-6">Toy List</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <Skeleton width={200} height={300} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pokemons.map((pokemon) => (
            <ToyCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              type={pokemon.types.map((typeInfo) => typeInfo.type.name)}
              base_experience={pokemon.base_experience}
              abilities={pokemon.abilities.map(
                (abilityInfo) => abilityInfo.ability.name
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToyWrapper;
