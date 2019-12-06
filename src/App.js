import React, { useEffect, useState } from 'react';
import CardsList from './components/CardsList';
import ProgressSpinner from './components/ProgressSpinner';
import Select from 'react-select';
import './App.css';

import { capitalize as _capitalize } from 'lodash/fp';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    // https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
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

  const selectPlaceholder =
    selectedOption ? `Sort by: ${_capitalize(selectedOption)}` : "Sort cards"

  const cardsAreDoneFetch = () => {
    setIsLoading(false);
  }

  const handleSortSelection = (e) => {
    setSelectedOption(e.value);
  }

  const getErrorState = () => {
    setErrorState(true)
  };

  return (
    <div className="App">
      <div className="pageContainer">
        <header className="pageHeader">
          <h1>Infinitely Peep Magic: The Gathering</h1>
        </header>
        <div className="contentContainer">
          <header className="contentHeader">
            <h2>Creatures</h2>

            <div className="pageActions">
              <input
                className="SearchBar"
                placeholder="Search cards by name"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <Select
                className="SelectDropdown"
                onChange={handleSortSelection}
                options={cardSortOptions}
                placeholder={selectPlaceholder}
                value={selectedOption}
              />
            </div>
          </header>
          <CardsList
            loading={isLoading}
            loadingComplete={cardsAreDoneFetch}
            searchTerm={searchTerm}
            sortCardsBy={selectedOption}
            error={getErrorState}
          />
          {
            isLoading && searchTerm === '' && !errorState && (
              <ProgressSpinner />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
