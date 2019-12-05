import React, { useEffect, useState } from 'react';
import './CardsList.css';
import {
  orderBy as _orderBy,
} from 'lodash/fp';
const mtg = require('mtgsdk');


const CardsList = ({ error, loading, loadingComplete, searchTerm, sortCardsBy }) => {
  const [page, setPage] = useState(0);
  const [allCards, setAllCards] = useState([]);
  const [emptyState, setEmptyState] = useState(null);
  const [fetchedCards, setFetchedCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(allCards);
  const [totalCards, setTotalCards] = useState(0);

  // Sort cards based on the 'sortCardsBy' term,
  // return and display a sorted list
  useEffect(() => {
    if (sortCardsBy) {
      const sortedList = _orderBy(allCards, o => o.sortCardsBy);
      setVisibleCards(sortedList);
    }
  }, [sortCardsBy, allCards])


  // Search cards by name
  // TODO: Add search support for more card attributes,
  // add term match highlighting 
  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(`${searchTerm}`.toUpperCase());
      const filteredList = allCards.filter((card) => {
        return regex.test(`${card.name}`.toUpperCase());
      });
      if (filteredList.length === 0) {
        error();
        setEmptyState("No cards matched your search.")
      }
      setVisibleCards(filteredList);
    } else {
      // reset when the user deletes search term
      setEmptyState(null);
      setVisibleCards(allCards);
    }
  }, [allCards, error, searchTerm])


  useEffect(() => {
    const pageSize = 20;
    const fetchCards = () => {
      mtg.card.where({
        // Filtering cards without originalType in order to 
        // ignore cards without images (contains: 'imageUrl' isn't working)
        // https://github.com/MagicTheGathering/mtg-api/issues/37
        contains: 'originalType',
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
          error();
          return <p>Error loading: {error.message}</p>;
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
      <h2>Creature Cards: {`(${visibleCards.length})`}</h2>
      {
        emptyState
          ? <span className="EmptyMessage">{emptyState}</span>
          : <div className="row">
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
      }
    </div>
  );
};

export default CardsList;