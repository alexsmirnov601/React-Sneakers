import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import AppContext from './context'
import Header from './components/Header'
import Overlay from './pages/Overlay'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'
import { urls } from './utils/urls'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [itemsIsLoading, setItemsIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        /* вытаскиваем товары для корзины с бэка */
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(urls.CART),
            axios.get(urls.FAVORITES),
            axios.get(urls.ITEMS),
          ])

        setItemsIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных!')
        console.error(error)
      }
    })()
  }, [])

  const onAddtoCartHandler = async (obj) => {
    try {
      // Проверяем, есть ли товар с таким же id в массиве
      if (cartItems.some((item) => item.id === obj.id)) {
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
        await axios.delete(`${urls.CART}/${obj.id}`)
      } else {
        /* передаме объект на бэк корзины */
        setCartItems((prev) => [...prev, obj])
        await axios.post(urls.CART, obj)
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину!')
      console.error(error)
    }
  }

  const onAddtoFavoriteHandler = (obj) => {
    try {
      if (favorites.some((favObj) => favObj.id === obj.id)) {
        axios.delete(`${urls.FAVORITES}/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
      } else {
        axios.post(urls.FAVORITES, obj)
        setFavorites((prev) => [...prev, obj])
      }
    } catch (error) {
      alert('не удалось добавить в избранные')
      console.error(error)
    }
  }

  const deletefromCartHandler = (id) => {
    try {
      axios.delete(`${urls.CART}/${id}`)
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.error(error)
    }
  }

  /* функция для поиска */
  const searchItemsHandler = items.filter((item) => {
    return item.title.toLowerCase().includes(inputValue.toLowerCase())
  })

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.id === id)
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddtoFavoriteHandler,
        onAddtoCartHandler,
        setCartItems,
        setCartOpened,
      }}
    >
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
              <Route path="favorites" element={<Favorites />}></Route>
              <Route path="orders" element={<Orders />}></Route>
            </Routes>
            {/* роутинг */}
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
export default App
