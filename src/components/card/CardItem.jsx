import ContentLoader from 'react-content-loader'
import { useState } from 'react'
import styles from './Card.module.scss'

const CardItem = ({
  addedToCart = false,
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) => {
  /* состояние для изменения картинки */
  const [isAdded, setIsAdded] = useState(addedToCart)
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
        {loading ? (
          <ContentLoader
            speed={2}
            width={160}
            height={265}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            <div className={styles.grid__favorite}>
              <img
                onClick={onClickFavorite}
                src={
                  isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'
                }
                alt="Unliked"
              />
            </div>
            <img width="100%" height={135} src={imageUrl} alt="sneaker1" />
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
          </>
        )}
        {/* <ContentLoader
          speed={2}
          width={160}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> */}
      </div>
    </div>
  )
}

export default CardItem
