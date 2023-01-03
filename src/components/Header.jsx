import React from 'react'

const Header = () => {
  return (
    <header className="header">
      <div className="header__info">
        <img
          className="header__logo"
          width={40}
          height={40}
          src="/img/logo.png"
          alt="sneaker logo"
        />
        <div className="header__description">
          <h3 className="header__title">React Sneakers</h3>
          <p className="header__text">Магазин лучших кроссовок</p>
        </div>
      </div>

      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <img width={18} height={18} src="img/card.svg" alt="card logo" />
            <span className="header__span">1205 руб.</span>
          </li>
          <li className="header__item">
            <img src="img/heart-logo.svg" alt="heart-logo" />
          </li>
          <li className="header__item">
            <img src="img/user.svg" alt="user logo" />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
