// style={{ display: 'none' }}

const Overlay = () => {
  return (
    <div className="overlay">
      <div className="overlay__right-side">
        <h2 className="overlay__title">
          Корзина
          <img
            className="overlay__btn-remove removeBtn"
            src="img/btn-remove.svg"
            alt="Btn-remove"
          />
        </h2>

        <div className="overlay__cart-Items">
          <div className="overlay__cart-Item">
            <img
              width={70}
              height={70}
              src="img/sneakers/sneaker1.png"
              alt="overlayimg"
              className="overlay__img"
            />
            <div className="overlay__desc">
              <p className="overlay__text">
                Мужские Кроссовки Nike Air Max 270
              </p>
              <b className="overlay__b">12 999 руб.</b>
            </div>
            <img
              className="overlay__btn-remove removeBtn"
              src="img/btn-remove.svg"
              alt="Btn-remove"
            />
          </div>
          <div className="overlay__cart-Item">
            <img
              width={70}
              height={70}
              src="img/sneakers/sneaker1.png"
              alt="overlayimg"
              className="overlay__img"
            />
            <div className="overlay__desc">
              <p className="overlay__text">
                Мужские Кроссовки Nike Air Max 270
              </p>
              <b className="overlay__b">12 999 руб.</b>
            </div>
            <img
              className="overlay__btn-remove removeBtn"
              src="img/btn-remove.svg"
              alt="Btn-remove"
            />
          </div>
          <div className="overlay__cart-Item">
            <img
              width={70}
              height={70}
              src="img/sneakers/sneaker1.png"
              alt="overlayimg"
              className="overlay__img"
            />
            <div className="overlay__desc">
              <p className="overlay__text">
                Мужские Кроссовки Nike Air Max 270
              </p>
              <b className="overlay__b">12 999 руб.</b>
            </div>
            <img
              className="overlay__btn-remove removeBtn"
              src="img/btn-remove.svg"
              alt="Btn-remove"
            />
          </div>
          <div className="overlay__cart-Item">
            <img
              width={70}
              height={70}
              src="img/sneakers/sneaker1.png"
              alt="overlayimg"
              className="overlay__img"
            />
            <div className="overlay__desc">
              <p className="overlay__text">
                Мужские Кроссовки Nike Air Max 270
              </p>
              <b className="overlay__b">12 999 руб.</b>
            </div>
            <img
              className="overlay__btn-remove removeBtn"
              src="img/btn-remove.svg"
              alt="Btn-remove"
            />
          </div>
          <div className="overlay__cart-Item">
            <img
              width={70}
              height={70}
              src="img/sneakers/sneaker1.png"
              alt="overlayimg"
              className="overlay__img"
            />
            <div className="overlay__desc">
              <p className="overlay__text">
                Мужские Кроссовки Nike Air Max 270
              </p>
              <b className="overlay__b">12 999 руб.</b>
            </div>
            <img
              className="overlay__btn-remove removeBtn"
              src="img/btn-remove.svg"
              alt="Btn-remove"
            />
          </div>
        </div>

        <ul className="overlay__list">
          <li className="overlay__item">
            <span className="overlay__list-text">Итого:</span>
            <div></div>
            <b className="overlay__b">21 498 руб.</b>
          </li>
          <li className="overlay__item">
            <span className="overlay__list-text">Налог 5%:</span>
            <div></div>
            <b className="overlay__b">1074 руб.</b>
          </li>
        </ul>
        <button className="overlay__btn greenBtn">
          Оформить заказ
          <img src="img/arrow.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  )
}

export default Overlay
