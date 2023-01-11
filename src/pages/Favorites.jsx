import CardItem from '../components/card/CardItem'

const Favorites = ({ items, onAddtoFavoriteHandler }) => {
  return (
    <footer className="footer">
      <div className="footer__search-block">
        <h1 className="footer__title">Мои закладки</h1>
      </div>
      <div className="grid">
        {items.map((item, index) => (
          <CardItem
            key={index}
            favorited={true}
            onFavorite={() => onAddtoFavoriteHandler(item)}
            {...item}
            // onFavorite={onAddtoFavoriteHandler}
            // onPlus={() => onAddtoCartHandler(item)}
          />
        ))}
      </div>
    </footer>
  )
}

export default Favorites
