import CardItem from '../components/card/CardItem'

const Home = ({
  inputValue,
  setInputValue,
  searchItemsHandler,
  onAddtoFavoriteHandler,
  onAddtoCartHandler,
}) => {
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

      <div className="grid">
        {searchItemsHandler.map((item, index) => (
          <CardItem
            key={index}
            onFavorite={() => onAddtoFavoriteHandler(item)}
            onPlus={() => onAddtoCartHandler(item)}
            {...item}
          />
        ))}
      </div>
    </footer>
  )
}

export default Home
