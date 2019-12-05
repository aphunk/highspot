import React, { useEffect, useState } from 'react';
import './CardsList.css';

import {
  keys as _keys,
  sortBy as _sortBy,
} from 'lodash/fp';

const mtg = require('mtgsdk');

const CardsList = ({ loading, loadingComplete, searchTerm, sortCardsBy }) => {
  const [page, setPage] = useState(0);
  const [allCards, setAllCards] = useState([]);
  const [fetchedCards, setFetchedCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(allCards);
  const [totalCards, setTotalCards] = useState(0);
  // const [cardSortOptions, setCardSortOptions] = useState(null);


  // useEffect(() => {
  //   setCardSortOptions(_keys(visibleCards[0]))
  // }, [visibleCards]);

  useEffect(() => {
    console.log(sortCardsBy)
    if (sortCardsBy) {
      const sortedList = _sortBy(visibleCards, sortCardsBy);
      console.log(visibleCards)
      console.log(sortedList)
      return;
      // setVisibleCards(sortedList);

    }
  }, [sortCardsBy, visibleCards])

  useEffect(() => {
    console.log(searchTerm)
    if (searchTerm) {
      const regex = new RegExp(`${searchTerm}`.toUpperCase());
      const filteredList = allCards.filter((card) => {
        return regex.test(`${card.name}`.toUpperCase());
      });
      setVisibleCards(filteredList);
    } else {
      setVisibleCards(allCards);
    }
  }, [allCards, searchTerm])

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
      <h1>Creature Cards: {`(${visibleCards.length})`}</h1>
      <div className="row">
        {visibleCards.map(card =>

          <div key={`key-${card.id}`} className="cardContainer">
            <img src={card.imageUrl} alt={card.name}></img>
            <ul>
              <li><strong>Name: </strong>{card.name}</li>
              <li><strong>Artist: </strong>{card.artist}</li>
              <li><strong>Original Type: </strong>{card.originalType}</li>
            </ul>
          </div>

        )}
      </div>
    </div>
  );
};

export default CardsList;