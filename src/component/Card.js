import cardStyles from './Card.module.css'

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";

import { connect, useSelector } from "react-redux";
import { Construction } from '@mui/icons-material';
// 임시 로컬주소
const URL = 'http://localhost:5000'


// const postAxios = async (MemberEmail, name, checked) => {
//   axios.post(
//     `${URL}/favourite`,
//     {
//         email_give: MemberEmail.email.email,
//         name_give: name,
//         checked_give: (checked ? 1 : 0)
//     })
//     .then((res) => {
//         console.log(res);
//         alert("통신성공");
//     })
//     .catch((error) => {
//         // console.log(error);
//         console.error(error);

//   });
// };


// const useCheck = ({name}) => {
//   const [checked, setChecked] = useState(false);
//   const MemberEmail = useSelector(state => state);

//   useEffect(() => {
//     // postAxios(MemberEmail, name, checked);
//     console.log(name, checked);
//   }, [checked])
// };

function Card({ id, img, name }) {
  const use = useCheck(name)
  // const [checked, setChecked] = useState(false);

  // const MemberEmail = useSelector(state => state);

  
  const OnClick = () => {
    use.setChecked(current => !current)
    // postAxios(MemberEmail, name, checked);

    // console.log(MemberEmail)
    // console.log(use.checked);
  };


  const [hover, setHover] = useState(0);


  return (
    <div className={cardStyles.card}>
      {/* {hover == 0 ? "" : <StarBorderIcon onClick={onClick} className={cardStyles.star_icon} />}       */}
      <StarBorderIcon onClick={OnClick} className={`${ use.checked ? cardStyles.true_star_icon : cardStyles.false_star_icon}`}  />
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
};
export default Card;