import React from 'react'

const CardItem = () => {
  return (
    <div>
      <div className="grid__item">
        <div className="grid__favorite">
          <img src="/img/heart-unliked.svg" alt="Unliked" />
        </div>
        <img
          width={133}
          height={112}
          src="/img/sneakers/sneaker1.png"
          alt="sneaker1"
        />
        <p className="grid__text">Мужские Кроссовки Nike Blazer Mid Suede</p>
        <div className="grid__bottom">
          <div className="grid__price">
            <span className="grid__span">Цена:</span>
            <b className="grid__b">12 999 руб.</b>
          </div>
          <button className="grid__btn">
            <img width={11} height={11} src="img/plus.svg" alt="plus" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardItem
