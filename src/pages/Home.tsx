import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';


import { setCategoryValue, setPageCount, setFilters, selectFilter } from '../redux/slice/filterSlice';
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import {list} from '../Components/Sort'
import PizzaBlock from '../Components/PizzaBlock';
import PizzaBlockLoader from '../Components/PizzaBlock/PizzaBlockLoader';
import Pagination from '../Components/Pagination';
// import { SearchContext } from '../App';

import { fetchPizzas, selectPizzaData } from '../redux/slice/pizzasSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);

  // const { searchValue } = React.useContext(SearchContext);

  const { categoryValue, sort, currentPage, searchValue} = useSelector(selectFilter);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryValue(id));
  };

  const onChangeCurrentPage = (number: number) => {
    dispatch(setPageCount(number));
  };


  const getPizzas = async () => {
    const sortBy = sort.sortType;
    const category = categoryValue > 0 ? `category=${categoryValue}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryValue: categoryValue > 0 ? categoryValue : null,
        sortType: sort.sortType,
        currentPage,
      };
      const queryString = qs.stringify(params, { skipNulls: true });
      navigate(`/?${queryString}`);
    }
    if (!window.location.search) {
      fetchPizzas();
    }
  }, [categoryValue, sort.sortType, searchValue, currentPage]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryValue, sort.sortType, searchValue, currentPage]); 

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortType === params.sortType);
      if (sort) {
        params.sort = sort;
      }
      dispatch(setFilters(params));
    }
    isMounted.current = true;
  }, []);



  const skeleton =  [...new Array(6)].map((_, index) => <PizzaBlockLoader key={index} />);
  // [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: any) => (
      // <Link key={obj.id} 
      // to={`/pizza/${obj.id}`}
      // >
        <PizzaBlock {...obj} />
      //  </Link>
       ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryValue} setCategoryOnClick={onClickCategory} />
        <Sort/>
      </div>
      <h2 className="content__title">All pizzas</h2>
      {
        status === 'error' ? 
        ( <>
        <h2>an error occurred while receiving the pizza</h2>
        <p>please try again later</p>
        </> ) : (
           <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
        )
      }
      <Pagination currentPage={currentPage} setCurrentPage={onChangeCurrentPage} />
    </div>
  );
};

export default Home;
