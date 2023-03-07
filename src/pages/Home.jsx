import React from 'react';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaBlockLoader from '../Components/PizzaBlock/PizzaBlockLoader';
import Pagination from '../Components/Pagination';

const Home = ({ searchValue }) => {
  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryValue, setCategoryValue] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortValue, setSortValue] = React.useState({
    propertyName: 'Popularity',
    type: 'rating',
  });

  let category = categoryValue > 0 ? `&category=${categoryValue}` : '';
  let sort = sortValue ? `&sortBy=${sortValue.type}` : '';
  let search = searchValue ? `&search=${searchValue}` : '';
  let page = currentPage ? `page=${currentPage}` : '';

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://6405e93740597b65de44db55.mockapi.io/items?${page}&limit=8${category}${sort}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setState(json);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, search, page]);

  const skeleton = [...new Array(6)].map((_, index) => <PizzaBlockLoader key={index} />);
  const pizzas = state.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryValue={categoryValue}
          setCategoryOnClick={(id) => setCategoryValue(id)}
        />
        <Sort sortValue={sortValue} setSortValueOnClick={(obj) => setSortValue(obj)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{loading ? skeleton : pizzas}</div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
