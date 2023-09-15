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
          <div className='headerBox'>
            <h2 className='detailName'>{name}</h2>
          </div>
          <div className='detailBox'>
            <div className='pokeInfo'>
              <div className='dataImgBox'>
                <img
                  src={sprites.front_default}
                  alt={name}
                  className='dataImg'
                />
              </div>
              <div className='infoBox'>
                <p className='pokeDesc'>
                  This Pokemon's description should go here. It may be long or
                  short and this box should be big enough to accomodate.
                </p>
              </div>
            </div>
            <div className='statsContainer'>
              <p className='statsTextStats'>BASE STATS:</p>
              <div className=''>
                {stats.map((stat, index) => (
                  <div key={index} className='statsBox'>
                    <p className='statsName'>{stat.stat.name}:</p>
                    <p className='statsStat'>{stat.base_stat}</p>
                  </div>
                ))}
              </div>
            </div>
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
