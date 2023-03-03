import './scss/app.scss';
import React from 'react';
import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';

function Pizza(){

}

function App() {
  return (
    <div className="App">
    <div class="wrapper">
      <Header/>
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 class="content__title">All pizzas</h2>
          <div class="content__items">
              <PizzaBlock price={129} title='Classic pizza'/>
              <PizzaBlock price={189} title='Meat pizza'/>
              <PizzaBlock price={119} title='Cheese pizza'/>
              <PizzaBlock price={119} title='Margarita'/>
              <PizzaBlock price={139} title='Specialty pizza'/>
              <PizzaBlock price={129} title='Vegetarian pizza'/>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
