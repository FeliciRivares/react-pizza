import './scss/app.scss';
import React from 'react';
import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';

function App() {
const [state, setState] = React.useState([]);

React.useEffect(() => {
  fetch('https://6405e93740597b65de44db55.mockapi.io/items')
  .then((res) => res.json())
  .then((json) => setState(json))
}, [])

  return (
    <div className="App">
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
              {state.map((obj) => (
                  <PizzaBlock key={obj.id} {...obj}/>
                ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
