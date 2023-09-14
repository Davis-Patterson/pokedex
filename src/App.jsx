import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from 'components/Header';
import PokeCard from 'components/PokeCard';
import Footer from 'components/Footer';
import './App.css';

function App() {
  const [allPokeData, setAllPokeData] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .then((response) => setAllPokeData(response.data.results));
  }, []);

  return (
    <>
      <Header />
      <div className='container'>
        <div className='pokeCards'>
          {allPokeData.map((poke, index) => (
            <PokeCard key={index} name={poke.name} url={poke.url} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
