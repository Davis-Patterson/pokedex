import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokeData = ({ selPokeUrl, setHasSelPoke }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (selPokeUrl) {
      axios.get(selPokeUrl).then(async (response) => {
        const speciesData = await axios.get(response.data.species.url);
        const evolutionChainData = await axios.get(
          speciesData.data.evolution_chain.url
        );

        setPokemonData({
          ...response.data,
          speciesData: speciesData.data,
          evolutionChainData: evolutionChainData.data,
        });
      });
    }
  }, [selPokeUrl]);

  if (!pokemonData) {
    // Loading state
    return <div>Loading...</div>;
  }

  const { name, id, sprites, stats, types } = pokemonData;
  const {
    flavor_text_entries,
    is_legendary,
    is_mythical,
    habitat,
    growth_rate,
    base_happiness,
    capture_rate,
  } = pokemonData.speciesData;

  const handleBack = () => {
    setHasSelPoke(false);
  };

  return (
    <>
      <div className='dataContainer'>
        <div className='pokeDataContainer'>
          <div className='headerBox'>
            <div className='nameBox'>
              <p className='detailId'>{id}:</p>
              <h2 className='detailName'>{name}</h2>
            </div>
            <div className='typeContainer'>
              <p className='typeText'>{'Type: '}</p>
              {types.map((type, index) => (
                <React.Fragment key={index}>
                  <h4 className='detailType'>{type.type.name}</h4>
                  {index < types.length - 1 && (
                    <span className='typeSeparator'>/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
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
                <p className='pokeDesc'>{flavor_text_entries[0].flavor_text}</p>
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
              <p className='evoText'>
                should include name of evolution pokemons, image of evolution
                pokemons, and the level that they evolve
              </p>
              <p className='evoText'>
                if no evolutions put 'no evolutions for this pokemon'
              </p>
            </div>
          </div>
          <div className='statsContainer2'>
            <p className='statsTextStats'>POKEMON INFO:</p>
            <div className='statsInfo2'>
              <div className='statsBox2'>
                <p className='statsName2'>Is Legendary:</p>
                <p className='statsStat2'>{is_legendary ? 'Yes' : 'No'}</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Is Mythical:</p>
                <p className='statsStat2'>{is_mythical ? 'Yes' : 'No'}</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Habitat:</p>
                <p className='statsStat2'>{habitat.name}</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Growth Rate:</p>
                <p className='statsStat2'>{growth_rate.name}</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Base Happiness:</p>
                <p className='statsStat2'>{base_happiness}</p>
              </div>
              <div className='statsBox2'>
                <p className='statsName2'>Capture Rate</p>
                <p className='statsStat2'>{capture_rate}</p>
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
