import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokeCard = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPokemonData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
      });
  }, [url]);

  return (
    <>
      <div className='cardContainer'>
        {pokemonData ? (
          <>
            <p className='pokeNum'>#{pokemonData.id}</p>
            <img
              src={pokemonData.sprites.front_default}
              alt={`${name}-img`}
              className='pokeSprite'
            />
            <p className='pokeName'>{name}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default PokeCard;
