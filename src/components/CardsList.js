import React, { useEffect, useState } from 'react';
import './CardsList.css';
const mtg = require('mtgsdk')

const CardsList = ({ loading, loadingComplete }) => {
  const [page, setPage] = useState(0);
  const [allCards, setAllCards] = useState([]);
  const [fetchedCards, setFetchedCards] = useState([]);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    const pageSize = 20;

    const fetchCards = () => {
      mtg.card.where({
        types: 'creature',
        pageSize: pageSize,
        page: page,
      })
        .then((newCards) => {
          setFetchedCards(newCards);
          loadingComplete();
          setTotalCards((page + 1) * pageSize);
          setPage(page + 1);
        })
        .catch((error) => {
          console.log(error);
          return <p>Error loading: {error.message}</p>
        });
    };

    if (!loading) {
      return;
    };
    fetchCards();
  }, [loading, page, loadingComplete]);

  useEffect(() => {
    if (totalCards !== allCards.length) {
      setAllCards([...allCards, ...fetchedCards])
    }
  }, [fetchedCards, allCards, totalCards]);


  return (

    <div className="CardsList">
      <h1>Creature Cards: {`(${allCards.length})`}</h1>
      <div className="row">
        {allCards.map(card =>
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

    </div>
  );
};

export default CardsList;