import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokeCard = ({ name, url, setHasSelPoke, setSelPokeUrl }) => {
  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPokeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
      });
  }, [url]);

  const handleClick = () => {
    setHasSelPoke(true);
    setSelPokeUrl(url);
  };

  return (
    <>
      <div className='cardContainer' onClick={handleClick}>
        {pokeData ? (
          <>
            <p className='pokeNum'>#{pokeData.id}</p>
            <img
              src={pokeData.sprites.front_default}
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
