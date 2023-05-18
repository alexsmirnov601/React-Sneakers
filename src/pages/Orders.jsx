import React from 'react'
import CardItem from '../components/card/CardItem'
import axios from 'axios'
import Empty from '../components/Empty'
import { Link } from 'react-router-dom'

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

const Orders = () => {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(
          'https://sneakers-server-2hes.onrender.com/orders'
        )
        /* Так можно отчистить заказы
        data.map((obj) => {
          axios.delete(
            `https://sneakers-server-2hes.onrender.com/orders/${obj.id}`
          )
        }) */

        setOrders(data.map((obj) => obj.items).flat())
        setIsLoading(false)
      } catch (error) {
        alert('Ошибка при запросе заказов')
        console.log(error)
      }
    })()
  }, [])

  const removeOrdersHandler = async () => {
    try {
      const { data } = await axios.get(
        'https://sneakers-server-2hes.onrender.com/orders'
      )
      data.map((obj) => {
        axios.delete(
          `https://sneakers-server-2hes.onrender.com/orders/${obj.id}`
        )
      })
      setOrders([])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {orders.length ? (
        <footer className="footer">
          <div className="footer__search-block orders__container">
            <Link to="/">
              <img className="exitBtn" src="img/exit.png" alt="exitBtn" />
            </Link>
            <h1 className="footer__title orders__heading">
              Мои покупки
              <img
                onClick={removeOrdersHandler}
                className="orders__img overlay__btn-remove removeBtn"
                src="img/btn-remove.svg"
                alt="Btn-remove"
              />
            </h1>
          </div>
          <div className="grid">
            {(isLoading ? testArray : orders).map((item) => (
              <CardItem key={item.id} loading={isLoading} {...item} />
            ))}
          </div>
        </footer>
      ) : (
        <Empty
          img="/img/noorders.png"
          title={'У вас нет заказов'}
          text="Оформите хотя бы один заказ"
        />
      )}
    </>
  )
}

export default Orders
