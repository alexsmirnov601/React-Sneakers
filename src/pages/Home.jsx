import CardItem from '../components/card/CardItem'
import { useContext } from 'react'
import AppContext from '../context'

const testArray = [
  { id: 20 },
  { id: 21 },
  { id: 22 },
  { id: 23 },
  { id: 24 },
  { id: 25 },
  { id: 26 },
  { id: 27 },
  { id: 28 },
  { id: 29 },
  { id: 30 },
  { id: 31 },
]

/* было так */
// [...Array(12)]

const Home = ({
  inputValue,
  setInputValue,
  searchItemsHandler,
  onAddtoFavoriteHandler,
  onAddtoCartHandler,
  itemsIsLoading,
}) => {
  const { isItemAdded } = useContext(AppContext)

  const renderItems = () => {
    return (itemsIsLoading ? testArray : searchItemsHandler).map(
      (item, index) => (
        <CardItem
          key={item.id}
          onFavorite={() => onAddtoFavoriteHandler(item)}
          onPlus={() => onAddtoCartHandler(item)}
          loading={itemsIsLoading}
          added={isItemAdded(item && item.id)}
          {...item}
        />
      )
    )
  }

  return (
    <footer className="footer">
      <div className="footer__search-block">
        <h1 className="footer__title">
          {inputValue ? `Поиск по запросу: ${inputValue}` : 'Все кроссовки'}
        </h1>
        <div className="form">
          <img className="form__img" src="/img/search.svg" alt="Search" />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="form__input"
            type="search"
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="grid">{renderItems()}</div>
    </footer>
  )
}

export default Home
