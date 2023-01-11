import { useState } from 'react'
import styles from './Card.module.scss'

const CardItem = ({
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
}) => {
  /* состояние для изменения картинки */
  const [isAdded, setIsAdded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(favorited)

  const onClickPlus = () => {
    /* вызвается метод, который в пропсах */
    onPlus()
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    /* вызвается метод, который в пропсах */
    onFavorite()
    setIsFavorite(!isFavorite)
  }

  return (
    <div>
      <div className={styles.grid__item}>
        <div className={styles.grid__favorite}>
          <img
            // onClick={onFavorite}
            onClick={onClickFavorite}
            src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}
            alt="Unliked"
          />
        </div>
        <img width={133} height={112} src={imageUrl} alt="sneaker1" />
        <p className={styles.grid__text}>{title}</p>
        <div className={styles.grid__bottom}>
          <div className={styles.grid__price}>
            <span className={styles.grid__span}>Цена:</span>
            <b className={styles.grid__b}>{price} руб.</b>
          </div>
          <img
            width={40}
            height={40}
            onClick={onClickPlus}
            className={styles.grid__plusBtn}
            src={isAdded ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
            alt="plus"
          />
        </div>
      </div>
    </div>
  )
}

export default CardItem
