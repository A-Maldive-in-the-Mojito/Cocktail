import cardStyles from './Card.module.css'

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

function Card({ id, img, name }) {

  return (
    <div className={cardStyles.cardContainer}>

      <Link to={`/desc:${id}`}>
        <div className={cardStyles.imgContainer}>
          <img className={cardStyles.imgCocktail} src={img} />
          <h3 className={cardStyles.cocktailName}>{name}</h3>
        </div>
      </Link>

      

      {/* 
      <div className={styles.imgContainer}>
        <img className={styles.imgCocktail} src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
        <h3 className={styles.cocktailName}> Cocktail </h3>
      </div> */}


    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Card;