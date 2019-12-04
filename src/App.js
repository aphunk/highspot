import React, { useEffect, useState } from 'react';
import CardsList from './components/CardsList';
import ProgressSpinner from './components/ProgressSpinner';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [filterTerm, setFilterTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const onInputChange = (e) => {
    setFilterTerm(e.target.value);
  };


  // const handleSearch = (value) => {
  //   console.log(value);
  //   const regex = new RegExp(`${value}`.toUpperCase());
  //   const filteredList = allCards.filter((card) => {
  //     return regex.test(`${card.name}${card.type}${card.types}${card.artist}`.toUpperCase());
  //   });
  //   setFetchedCards(filteredList);
  // };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
        return;
      }
      setIsLoading(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading]);

  const cardsAreDoneFetch = () => {
    setIsLoading(false);
  }

  return (
    <div className="App">
      <div className="appContainer">
        <SearchBar />
        {/* <input
          value={filterTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onEsc={() => setFilterTerm('')}
          placeholder="Filter cards"
          type="text"
        /> */}
        <CardsList loading={isLoading} loadingComplete={cardsAreDoneFetch} />
        {
          isLoading && (
            <ProgressSpinner />
          )
        }
      </div>
    </div>
  );
}

export default App;
