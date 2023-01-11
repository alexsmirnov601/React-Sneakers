import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Overlay from './components/Overlay'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)

  // console.log(cartItems)

  useEffect(() => {
    axios
      .get('https://63b53e489f50390584c427eb.mockapi.io/items')
      .then((res) => setItems(res.data))
    /* вытаскиваем товары для корзины с бэка */

    axios
      .get('https://63b53e489f50390584c427eb.mockapi.io/cart')
      .then((res) => setCartItems(res.data))

    axios
      .get('https://63b53e489f50390584c427eb.mockapi.io/favorites')
      .then((res) => setFavorites(res.data))
  }, [])

  const onAddtoCartHandler = (obj) => {
    /* передаме объект на бэк */
    axios.post('https://63b53e489f50390584c427eb.mockapi.io/cart', obj)

    setCartItems((prev) => [...prev, obj])
    // второй вариант - setCartItems([...cartItems, obj])

    // /*   проверку, если мы уже добавляли такой объект мы его снова не добавляем */
    if (cartItems.includes(obj)) {
      return null
    }
  }

  const onAddtoFavoriteHandler = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://63b53e489f50390584c427eb.mockapi.io/favorites/${obj.id}`
        )
      } else {
        /* ждем ответ от бэка и только потом обновляем состояние */
        const { data } = await axios.post(
          'https://63b53e489f50390584c427eb.mockapi.io/favorites',
          obj
        )

        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('не удалось добавить в избранные')
    }
  }

  const deletefromCartHandler = (id) => {
    console.log(id)
    axios.delete(`https://63b53e489f50390584c427eb.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    // setCartItems(cartItems.filter((cartItem) => cartItem.id !== id))
  }

  /* функция для поиска */
  const searchItemsHandler = items.filter((item) => {
    return item.title.toLowerCase().includes(inputValue.toLowerCase())
  })

  return (
    <BrowserRouter>
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
          {/* роутинг */}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  searchItemsHandler={searchItemsHandler}
                  onAddtoFavoriteHandler={onAddtoFavoriteHandler}
                  onAddtoCartHandler={onAddtoCartHandler}
                />
              }
            ></Route>
            <Route
              path="favorites"
              element={
                <Favorites
                  items={favorites}
                  onAddtoFavoriteHandler={onAddtoFavoriteHandler}
                />
              }
            ></Route>
          </Routes>
          {/* роутинг */}
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App
