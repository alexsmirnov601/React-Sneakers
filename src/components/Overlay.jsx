import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import Info from './Info'

const Overlay = ({ onClickCart, deleteFromCart }) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  /* кастомный хук */
  const { cartItems, setCartItems, totalPrice } = useCart()

  const onClickOrder = () => {
    setIsOrderComplete(true)
    setCartItems([])
  }

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="overlay">
          <div className="overlay__right-side">
            <h2 className="overlay__title">
              Корзина
              <img
                onClick={onClickCart}
                className="overlay__btn-remove removeBtn"
                src="img/btn-remove.svg"
                alt="Btn-remove"
              />
            </h2>
            <div className="overlay__cart-Items">
              {cartItems.map((item, index) => (
                <div className="overlay__cart-Item" key={index}>
                  <img
                    width={70}
                    height={70}
                    src={item.imageUrl}
                    alt="overlayimg"
                    className="overlay__img"
                  />
                  <div className="overlay__desc">
                    <p className="overlay__text">{item.title}</p>
                    <b className="overlay__b">{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => deleteFromCart(item.id)}
                    className="overlay__btn-remove removeBtn"
                    src="img/btn-remove.svg"
                    alt="Btn-remove"
                  />
                </div>
              ))}
            </div>

            <ul className="overlay__list">
              <li className="overlay__item">
                <span className="overlay__list-text">Итого:</span>
                <div></div>
                <b className="overlay__b">{totalPrice} руб.</b>
              </li>
              <li className="overlay__item">
                <span className="overlay__list-text">Налог 5%:</span>
                <div></div>
                <b className="overlay__b">
                  {Math.ceil(totalPrice * 0.05)} руб.
                </b>
              </li>
            </ul>
            <button onClick={onClickOrder} className="overlay__btn greenBtn">
              Оформить заказ
              <img src="img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      ) : (
        <Info
          title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
          description={
            isOrderComplete
              ? 'Ваш заказ # скоро будет передан курьерской доставке'
              : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
          }
          image={
            isOrderComplete ? 'img/complete-order.png' : 'img/empty-cart.jpg'
          }
        />
      )}
    </div>
  )
}

export default Overlay
