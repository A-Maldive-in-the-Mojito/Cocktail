import cardStyles from './Card.module.css'

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState, useEffect } from 'react';
import axios from "axios";

import { connect, useSelector } from "react-redux";
import { Construction } from '@mui/icons-material';

function Card({ id, img, name }) {
  // 임시 로컬주소
  const URL = 'http://localhost:5000'
  const userID = useSelector((state) => state)

  const [checked, setChecked] = useState(false)

  const onClick = () => {

    setChecked((prev) => !prev);
    
    console.log(userID)
    console.log(name)
    console.log(checked)
    
    

    axios.post(
      `${URL}/favourite`,
      {
        member_id_give: userID,
        name_give: name,
        checked_give: (checked ? 1 : 0)
      })
      .then((res) => {
        console.log(res);
        alert("성공");
      })
      .catch((error) => {
        console.error(error);

      });
  }

  const [hover, setHover] = useState(0);


  return (
    <div className={cardStyles.card}>
      {/* {hover == 0 ? "" : <StarBorderIcon onClick={onClick} className={cardStyles.star_icon} />}       */}
      <StarBorderIcon onClick={onClick} className={cardStyles.star_icon} />
      <Link to={`/desc:${id}`}>
        <div
          onMouseOver={() => setHover(1)}
          onMouseOut={() => setHover(0)}
          className={cardStyles.imgContainer}>
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