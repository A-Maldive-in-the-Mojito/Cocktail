import styles from './Card.module.css'

function Card() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img className={styles.imgCocktail} src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
        <h3 className={styles.cocktailName}> Cocktail </h3>
      </div>
    </div>
  )
}

export default Card;