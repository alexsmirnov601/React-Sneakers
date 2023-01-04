import { useEffect, useState } from 'react'
import CardItem from './components/card/CardItem'
import Header from './components/Header'
import Overlay from './components/Overlay'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])

  const [cartOpened, setCartOpened] = useState(false)

  useEffect(() => {
    fetch('https://63b53e489f50390584c427eb.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => setItems(json))
  }, [])

  const onAddtoCartHandler = (obj) => {
    // setCartItems([...cartItems, obj])
    setCartItems((prev) => [...prev, obj])

    /* можно сделать  проверку, если мы уже добавляли такой объект мы его снова не добавляем */
    /* также добавить удаление */
  }

  return (
    <div className="App">
      <div className="container">
        {cartOpened && (
          <Overlay
            cartItems={cartItems}
            onClickCart={() => setCartOpened(!cartOpened)}
          />
        )}

        <Header onClickCart={() => setCartOpened(!cartOpened)} />

        <footer className="footer">
          <div className="footer__search-block">
            <h1 className="footer__title">Все кроссовки</h1>
            <div className="form">
              <img className="form__img" src="/img/search.svg" alt="Search" />
              <input
                className="form__input"
                type="search"
                placeholder="Поиск..."
              />
            </div>
          </div>

          <div className="grid">
            {items.map((item) => (
              <CardItem
                key={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('добавили в закладки')}
                onPlus={() => onAddtoCartHandler(item)}
              />
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
export default App
