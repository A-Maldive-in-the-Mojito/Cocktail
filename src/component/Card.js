import cardStyles from './Card.module.css'

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

function Card({ id, img, name }) {
  // 임시 로컬주소
  const URL = 'http://localhost:5000'
  const [checked, setChecked] = useState(false)
  const MembersID = useSelector(state => state);


  const onClick = () => {
    setChecked(current => !current);
      console.log(MembersID)
    axios.post(
      `${URL}/favourite`,
      {
          member_id_give: MembersID,
          name_give: name,
          checked_give: (checked ? 1 : 0)
      })
      .then((res) => {
          console.log(res);
          alert("통신성공");
      })
      .catch((error) => {
          // console.log(error);
          console.error(error);
          
      });
  }

  return (
    <div className={cardStyles.card}>
      <StarBorderIcon onClick={onClick} className={cardStyles.star_icon}/>
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