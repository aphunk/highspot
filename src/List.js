import React, { useEffect, useState } from 'react';
import './List.css';
import ProgressSpinner from './components/ProgressSpinner';
import SearchBar from './components/SearchBar';
const mtg = require('mtgsdk')

const List = () => {
  const [page, setPage] = useState(0);
  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value) => {
    console.log(value);
    const regex = new RegExp(`${value}`.toUpperCase());
    const filteredList = cardsList.filter((card) => {
      return regex.test(`${card.name}${card.type}${card.types}${card.artist}`.toUpperCase());
    });
    setCardsList(filteredList);
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    setIsLoading(true);
  };

  const fetchCards = () => {
    mtg.card.where({
      types: 'creature',
      pageSize: 20,
      page: page,
    })
      .then((newCards) => {
        setCardsList(cardsList => ([...cardsList, ...newCards]));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return <p>Error loading: {error.message}</p>
      });
    setPage(page + 1);
    console.log(cardsList)
  };

  useEffect(() => {
    fetchCards();
    if (!isLoading) {
      return;
    };
  }, [isLoading]);

  // detect scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <SearchBar onChange={handleSearch} />
      <div className="ListPage">
        <h1>Creature Cards: {`(${cardsList.length})`}</h1>
        <div className="row">
          {cardsList.map(card =>
            card.imageUrl && (
              <div key={`key-${card.id}`} className="cardContainer">
                <img src={card.imageUrl} alt={card.name}></img>
                <ul>
                  <li><strong>Name: </strong>{card.name}</li>
                  <li><strong>Artist: </strong>{card.artist}</li>
                  <li><strong>Original Type: </strong>{card.originalType}</li>
                </ul>
              </div>
            )
          )}
        </div>
        {
          isLoading && (
            <ProgressSpinner />
          )
        }
      </div>
    </>
  );
};

export default List;