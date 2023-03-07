import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockLoader = (props) => (
    <ContentLoader className="pizza-block"
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
    <rect x="3" y="287" rx="3" ry="3" width="270" height="80" /> 
    <circle cx="137" cy="119" r="110" /> 
    <rect x="12" y="239" rx="10" ry="10" width="243" height="27" /> 
    <rect x="4" y="377" rx="10" ry="10" width="103" height="40" /> 
    <rect x="165" y="377" rx="10" ry="10" width="106" height="40" />
  </ContentLoader>
)

export default PizzaBlockLoader