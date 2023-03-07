import React from 'react';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaBlockLoader from '../Components/PizzaBlock/PizzaBlockLoader';


const Home = () => {
  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryValue, setCategoryValue] = React.useState(0);
  const [sortValue, setSortValue] = React.useState({
    propertyName: "Popularity",
    type: "rating"
  })


  let category = categoryValue > 0 ? `${categoryValue}` : '';
  let sort = sortValue ? `${sortValue.type}` : '';

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://6405e93740597b65de44db55.mockapi.io/items?category=${category}&sortby=${sort}`)
      .then((res) => res.json())
      .then((json) => {
        setState(json);
        setLoading(false);
      });
      window.scrollTo(0, 0)
  }, [category, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue = {categoryValue} setCategoryOnClick={(id) => setCategoryValue(id)} />
        <Sort sortValue={sortValue} setSortValueOnClick={(obj) => setSortValue(obj)}/>
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <PizzaBlockLoader key={index} />)
          : state.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home
