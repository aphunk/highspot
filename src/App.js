import React, { useEffect, useState } from 'react';
import CardsList from './components/CardsList';
import ProgressSpinner from './components/ProgressSpinner';
// import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState();

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
        <input
          className="SearchBar"
          placeholder="Search cards..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <CardsList
          searchTerm={searchTerm}
          loading={isLoading}
          loadingComplete={cardsAreDoneFetch}
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
