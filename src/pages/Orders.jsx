import React from 'react'
import CardItem from '../components/card/CardItem'

const Orders = () => {
  return (
    <footer className="footer">
      <div className="footer__search-block">
        <h1 className="footer__title">Мои заказы</h1>
      </div>
      <div className="grid">
        {[].map((item, index) => (
          <CardItem
            key={index}
            favorited={true}
            // onFavorite={() => onAddtoFavoriteHandler(item)}
            {...item}
          />
        ))}
      </div>
    </footer>
  )
}

export default Orders
