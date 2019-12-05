import React, { useEffect, useState } from 'react';
import CardsList from './components/CardsList';
import ProgressSpinner from './components/ProgressSpinner';
import Select from 'react-select';
import './App.css';

import { get, keys, sortBy } from 'lodash/fp';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortOptions, setSortOptions] = useState(null);

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


  const cardSortOptions = [
    { value: 'id', label: 'ID' },
    { value: 'name', label: 'Name' },
    { value: 'artist', label: 'Artist' },
    { value: 'originalType', label: 'Original Type' },
    { value: 'set', label: 'Set' }
  ];

  const cardsAreDoneFetch = () => {
    setIsLoading(false);
  }

  const handleSortSelection = (e) => {
    console.log(`Option selected:`, e.value)
    setSelectedOption(e.value);
  }

  const getOptions = () => {
    setSortOptions(cardSortOptions)
  };

  return (
    <div className="App">
      <div className="appContainer">
        <Select
          onChange={handleSortSelection}
          options={cardSortOptions}
          placeholder="Sort cards"
          value={selectedOption}
        />
        <input
          className="SearchBar"
          placeholder="Search cards..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <CardsList
          loading={isLoading}
          loadingComplete={cardsAreDoneFetch}
          searchTerm={searchTerm}
          sortCardsBy={selectedOption}
          cardAttributes={getOptions}
        />
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
