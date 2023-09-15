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
              <div className='statsInfo'>
                {stats.map((stat, index) => (
                  <div key={index} className='statsBox'>
                    <p className='statsName'>{stat.stat.name}:</p>
                    <p className='statsStat'>{stat.base_stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='evoContainer'>
            <div className='evoBox'>
              <p className='evoText'>Pokemon Evolution Chain Goes In Here</p>
              <p className='evoText'>ie 'evolved from' & 'evolves into'</p>
            </div>
          </div>
          <div className='statsContainer2'>
            <p className='statsTextStats'>POKEMON INFO:</p>
            <div className='statsInfo2'>
              <div className='statsBox2'>
                <p className='statsName2'>Is Legendary:</p>
                <p className='statsStat2'>Yes/No</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Is Mythical:</p>
                <p className='statsStat2'>Yes/No</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Habitat:</p>
                <p className='statsStat2'>(Habitat data)</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Growth Rate:</p>
                <p className='statsStat2'>(Growth rate)</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Base Happiness:</p>
                <p className='statsStat2'>(Base happiness)</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Capture Rate</p>
                <p className='statsStat2'>(Capture rate)</p>
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
