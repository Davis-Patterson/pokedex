import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from 'components/Header';
import PokeCard from 'components/PokeCard';
import PokeData from 'components/PokeData';
import Footer from 'components/Footer';
import './App.css';

function App() {
  const [allPokeData, setAllPokeData] = useState([]);
  const [hasSelPoke, setHasSelPoke] = useState(false);
  const [selPokeUrl, setSelPokeUrl] = useState(null);

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
          {hasSelPoke ? (
            <PokeData selPokeUrl={selPokeUrl} setHasSelPoke={setHasSelPoke} />
          ) : (
            allPokeData.map((poke, index) => (
              <PokeCard
                key={index}
                name={poke.name}
                url={poke.url}
                setHasSelPoke={setHasSelPoke}
                setSelPokeUrl={setSelPokeUrl}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
