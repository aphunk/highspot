import React from 'react';
import List from './List';
import CardList from './CardList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header><h2>Cards</h2></header>
      <div className="appContainer">
        <div className="row">
          <List id="list" />
          {/* <CardList /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
