import React from "react"
const Categories = (
    { setCategoryOnClick, categoryValue }) => {
    const categoryName = ['All', 'Grilled', 'Meet', 'Closed', 'Spicy', 'Vegetarian'];
 
    let pizzasCategory = categoryName.map((value, id) => (
        <li key={id}
            onClick={() => setCategoryOnClick(id)}
            className={categoryValue === id ? 'active' : ''}>
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