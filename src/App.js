// import { createContext } from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import AppContext from './context'
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
  const [itemsIsLoading, setItemsIsLoading] = useState(true)

  // console.log(cartItems)

  useEffect(() => {
    async function fetchData() {
      /* вытаскиваем товары для корзины с бэка */
      const cartResponse = await axios.get(
        'https://63b53e489f50390584c427eb.mockapi.io/cart'
      )

      const favoritesResponse = await axios.get(
        'https://63b53e489f50390584c427eb.mockapi.io/favorites'
      )

      const itemsResponse = await axios.get(
        'https://63b53e489f50390584c427eb.mockapi.io/items'
      )

      setItemsIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const onAddtoCartHandler = (obj) => {
    console.log(obj)

    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://63b53e489f50390584c427eb.mockapi.io/cart/${obj.id}`)
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      )
    }

    /* передаме объект на бэк */
    axios.post('https://63b53e489f50390584c427eb.mockapi.io/cart', obj)
    // .then()

    setCartItems((prev) => [...prev, obj])
    // второй вариант - setCartItems([...cartItems, obj])
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
    <AppContext.Provider value={{ items, cartItems, favorites }}>
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
                    items={items}
                    cartItems={cartItems}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    searchItemsHandler={searchItemsHandler}
                    onAddtoFavoriteHandler={onAddtoFavoriteHandler}
                    onAddtoCartHandler={onAddtoCartHandler}
                    itemsIsLoading={itemsIsLoading}
                  />
                }
              ></Route>
              <Route
                path="favorites"
                element={
                  <Favorites
                    // items={favorites}
                    onAddtoFavoriteHandler={onAddtoFavoriteHandler}
                  />
                }
              ></Route>
            </Routes>
            {/* роутинг */}
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
export default App
