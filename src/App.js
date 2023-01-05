import { useEffect, useState } from 'react'
import CardItem from './components/card/CardItem'
import Header from './components/Header'
import Overlay from './components/Overlay'

/* мне нужно написать здесь функцию, которая бы меняла состояние isAdded  и передать ее в комопнент Overlay (также не забыть про CardItem)*/

function App() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)

  useEffect(() => {
    fetch('https://63b53e489f50390584c427eb.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => setItems(json))
  }, [])

  const onAddtoCartHandler = (obj) => {
    /*   проверку, если мы уже добавляли такой объект мы его снова не добавляем */
    if (cartItems.includes(obj)) {
      return null
    }

    setCartItems((prev) => [...prev, obj])
    // второй вариант - setCartItems([...cartItems, obj])
  }

  /* удвление товаров из корзины (если удаляется отсюда то меняем setIsAdded(false)) */
  const deletefromCartHandler = (id) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== id))
    // setIsAdded(!isAdded)
  }

  /* функция для поиска */
  const searchItemsHandler = items.filter((item) => {
    return item.title.toLowerCase().includes(inputValue.toLowerCase())
  })

  return (
    <div className="App">
      <div className="container">
        {cartOpened && (
          <Overlay
            deleteFromCart={deletefromCartHandler}
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="form__input"
                type="search"
                placeholder="Поиск..."
              />
            </div>
          </div>

          <div className="grid">
            {searchItemsHandler.map((item) => (
              <CardItem
                // isAdded={isAdded}
                // setIsAdded={setIsAdded}
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
