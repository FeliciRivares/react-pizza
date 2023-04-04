import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    about: string;
    types: string;
    sizes: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6405e93740597b65de44db55.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Error when receiving pizza!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <>Loading...</>;
  } 
  return (
    <div className='container'>
    <div className="fullPizzaContainer">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h3>{pizza.about}</h3>
      <h4>{pizza.price} UAH</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Back</span>
        </button>
      </Link>
    </div>
    </div>
  );
};
export default FullPizza;
