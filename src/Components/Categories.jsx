import React from "react"

const categoryName = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy', 'Closed'];

const Categories = () => {
    const [category, setCategory] = React.useState(0);

    let onClickSetCategory = (index) => {
        setCategory(index)
    } 
    let pizzasCategory = categoryName.map((value, id) => (
        <li key={id}
            onClick={() => onClickSetCategory(id)}
            className={category === id ? 'active' : ''}>
            {value}
        </li>
    ))

    return(
        <div className="categories">
            <ul>
                {pizzasCategory}
            </ul>
        </div>
    )
}

export default Categories