import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import AppContext from './context'
import Header from './components/Header'
import Overlay from './components/Overlay'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [itemsIsLoading, setItemsIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        /* вытаскиваем товары для корзины с бэка */
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://63b53e489f50390584c427eb.mockapi.io/cart'),
            axios.get('https://63b53e489f50390584c427eb.mockapi.io/favorites'),
            axios.get('https://63b53e489f50390584c427eb.mockapi.io/items'),
          ])

        setItemsIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных!')
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const onAddtoCartHandler = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://63b53e489f50390584c427eb.mockapi.io/cart/${obj.id}`
        )
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      }
      // await axios.delete('https://63b53e489f50390584c427eb.mockapi.io/cart/')

      /* передаме объект на бэк */
      axios.post('https://63b53e489f50390584c427eb.mockapi.io/cart', obj)
      // .then()

      setCartItems((prev) => [...prev, obj])
      // второй вариант - setCartItems([...cartItems, obj])
    } catch (error) {
      alert('Ошибка при добавлении в корзину!')
      console.error(error)
    }
  }

  const onAddtoFavoriteHandler = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://63b53e489f50390584c427eb.mockapi.io/favorites/${obj.id}`
        )
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
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
      console.error(error)
    }
  }

  const deletefromCartHandler = (id) => {
    try {
      axios.delete(`https://63b53e489f50390584c427eb.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter((item) => item.id !== id))
      // setCartItems(cartItems.filter((cartItem) => cartItem.id !== id))
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.error(error)
    }
  }

  /* функция для поиска */
  const searchItemsHandler = items.filter((item) => {
    return item.title.toLowerCase().includes(inputValue.toLowerCase())
  })

  /* если хотя бы олин id, который тебе передали, он есть в корзине среди объектов - выдывай мне true (иначе false)  */
  const isItemAdded = (id) => {
    cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddtoFavoriteHandler,
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
