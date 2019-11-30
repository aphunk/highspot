import React, { useEffect, useState } from 'react';
import './List.css';
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
      });

  };

  useEffect(() => {
    if (!isLoading) {
      fetchCards();
      setPage(page + 1);
    };
  }, [isLoading]);

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
    <>
      {cardsList.map(card =>
        card.imageUrl && (
          <div key={`key-${card.name}`} className="cardContainer">
            <img src={card.imageUrl} alt={card.name}></img>
            <ul>
              <li><strong>Name: </strong>{card.name}</li>
              <li><strong>Artist: </strong>{card.artist}</li>
              <li><strong>Original Type: </strong>{card.originalType}</li>
            </ul>
          </div>
        )
      )}
    </>
  );
};

export default List;