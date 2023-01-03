import CardItem from './components/CardItem'
import Header from './components/Header'
import Overlay from './components/Overlay'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Overlay />
        <Header />
        <footer className="footer">
          <div className="footer__search-block">
            <h1 className="footer__title">Все кроссовки</h1>
            <div className="form">
              <img className="form__img" src="/img/search.svg" alt="Search" />
              <input
                className="form__input"
                type="search"
                placeholder="Поиск..."
              />
            </div>
          </div>

          <div className="grid">
            <CardItem />
            <div className="grid__item">
              <img
                width={133}
                height={112}
                src="/img/sneakers/sneaker2.png"
                alt="sneaker1"
              />
              <p className="grid__text">
                Мужские Кроссовки Nike Blazer Mid Suede
              </p>
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
            <div className="grid__item">
              <img
                width={133}
                height={112}
                src="/img/sneakers/sneaker3.jpg"
                alt="sneaker1"
              />
              <p className="grid__text">
                Мужские Кроссовки Nike Blazer Mid Suede
              </p>
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
            <div className="grid__item">
              <img
                width={133}
                height={112}
                src="/img/sneakers/sneaker4.jpg"
                alt="sneaker1"
              />
              <p className="grid__text">
                Мужские Кроссовки Nike Blazer Mid Suede
              </p>
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
        </footer>
      </div>
    </div>
  )
}

export default App
