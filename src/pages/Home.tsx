import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

import {setCategoryValue, setPageCount,setFilters} from '../redux/slice/filter/slice';
// import { FilterSliceState } from '../redux/slice/filter/type';
import { selectFilter } from '../redux/slice/filter/selector';
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import { list } from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaBlockLoader from '../Components/PizzaBlock/PizzaBlockLoader';
import Pagination from '../Components/Pagination';
import { fetchPizzas} from '../redux/slice/pizzas/slice';
import { FetchPizzasArg } from '../redux/slice/pizzas/type';
import { selectPizzaData } from '../redux/slice/pizzas/selectors';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryValue, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryValue(id))
  }, []);

  const onChangeCurrentPage = (number: number) => {
    dispatch(setPageCount(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortType;
    const category = categoryValue > 0 ? `category=${categoryValue}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
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
      dispatch(fetchPizzas({} as FetchPizzasArg));
    }
  }, [categoryValue, sort.sortType, searchValue, currentPage]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryValue, sort.sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FetchPizzasArg;
      const sort = list.find((obj) => obj.sortType === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryValue: Number(params.category),
          currentPage: params.currentPage,
          sort: sort || list[0],
        }),
      );
    }
    isMounted.current = true;
  }, []);

  const skeleton = [...new Array(6)].map((_, index) => <PizzaBlockLoader key={index} />);
  // [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: any) => (
    // <Link key={obj.id}
    // to={`/pizza/${obj.id}`}
    // >
    <PizzaBlock key={obj.id} {...obj} />
    //  </Link>
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryValue} setCategoryOnClick={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <>
          <h2>an error occurred while receiving the pizza</h2>
          <p>please try again later</p>
        </>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={onChangeCurrentPage} />
    </div>
  );
};

export default Home;
