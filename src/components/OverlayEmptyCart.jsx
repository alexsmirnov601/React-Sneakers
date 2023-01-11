const OverlayEmptyCart = ({ onClickCart }) => {
  return (
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

        <div className="overlay__emptyCartImg">
          <img width={120} height={120} src="img/empty-cart.jpg" alt="" />
        </div>
        <h3 className="overlay__emptyTitle">Корзина пустая</h3>
        <p className="overlay__emptyText">
          Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
        </p>
        <button onClick={onClickCart} className="overlay__emptyBtn greenBtn">
          <img src="img/back-arrow.svg" alt="backArrow" />
          Вернутья назад
        </button>
      </div>
    </div>
  )
}

export default OverlayEmptyCart
