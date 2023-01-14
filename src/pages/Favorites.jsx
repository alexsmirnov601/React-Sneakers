import { useContext } from 'react'
import AppContext from '../context'
import CardItem from '../components/card/CardItem'

/* этот компонент будет делать ререндеринг, каждый раз когда будут изменятьс состояния, которые мы вытащили из контекста */

const Favorites = ({}) => {
  const { favorites, onAddtoFavoriteHandler } = useContext(AppContext)

  return (
    <footer className="footer">
      <div className="footer__search-block">
        <h1 className="footer__title">Мои закладки</h1>
      </div>
      <div className="grid">
        {favorites.map((item, index) => (
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
