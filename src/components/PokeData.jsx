import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokeData = ({ selPokeUrl, setHasSelPoke }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (selPokeUrl) {
      axios.get(selPokeUrl).then((response) => {
        setPokemonData(response.data);
      });
    }
  }, [selPokeUrl]);

  if (!pokemonData) {
    // Loading state
    return <div>Loading...</div>;
  }

  const { name, id, sprites, stats } = pokemonData;

  const handleBack = () => {
    setHasSelPoke(false);
  };

  return (
    <>
      <div className='dataContainer'>
        <div className='pokeDataContainer'>
          <div className='dataImgBox'>
            <img src={sprites.front_default} alt={name} className='dataImg' />
          </div>
          <div className='dataInfo'>
            <div className='nameBox'>
              <h2 className='detailName'>{name}</h2>
            </div>
            <div className='statsBox'>
              {stats.map((stat, index) => (
                <p key={index} className='statsText'>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              ))}
            </div>{' '}
            // pokemon type, moves, weight, etc
          </div>
        </div>
        <div className='detailButtonBox'>
          <button onClick={handleBack} className='detailButtonText'>
            BACK
          </button>
        </div>
      </div>
    </>
  );
};

export default PokeData;
