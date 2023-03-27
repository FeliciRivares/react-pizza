import React from 'react';
import { setSortValue, selectSort } from '../redux/slice/filterSlice'
import { useDispatch, useSelector } from 'react-redux';

type ListItem = {
  propertyName: string;
  sortType: string;
}

export const list: ListItem[] = [
    { propertyName: 'Popularity', sortType: 'rating' },
    { propertyName: 'Price', sortType: 'price' },
    { propertyName: 'Alphabet', sortType: 'title' },
  ];

const Sort: React.FC = () => {

  const [open, setOpen] = React.useState(false);

  const sort = useSelector(selectSort)
  const dispatch = useDispatch()
  const sortRef = React.useRef<HTMLDivElement>(null)
  // console.log(sortRef)
  
  const onClickListItems = (obj: ListItem) => {
    dispatch(setSortValue(obj));
    setOpen(false);
  };
  React.useEffect(() =>{
    const handleClickOut = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOut)
    return () => document.body.removeEventListener('click', handleClickOut)
  }, [])
  
  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setOpen(!open)} className="sort__label">
        <svg
          className={open ? 'active' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setOpen(!open)}>{sort.propertyName}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItems(obj)}
                className={sort.sortType === obj.sortType ? 'active' : ''}
                >
                  {obj.propertyName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Sort;
