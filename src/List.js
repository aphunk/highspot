import React, { useEffect, useState } from 'react';
import './List.css';
import ProgressSpinner from './components/ProgressSpinner';
const mtg = require('mtgsdk')

function List() {
  const [page, setPage] = useState(0);
  // current list of cards
  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCards = () => {
    setIsLoading(true);
    mtg.card.where({
      types: 'creature',
      pageSize: 20,
      page: page,
    })
      .then((newCards) => {
        setCardsList(cardList => ([...cardList, ...newCards]));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return <p>Error loading: {error.message}</p>
      });
  };

  useEffect(() => {
    if (!isLoading) {
      fetchCards();
      setPage(page + 1);
    };
  }, [isLoading, page]);

  // detect scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      console.log("Loading!")
      setIsLoading(true);
    }
  };
  return (
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
  );
};

export default List;