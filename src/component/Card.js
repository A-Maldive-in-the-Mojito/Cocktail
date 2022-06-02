import cardStyles from './Card.module.css'

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState, useEffect, useContext, useRef } from 'react';
import axios from "axios";

import { connect, useSelector } from "react-redux";
import { Construction } from '@mui/icons-material';

// 임시 로컬주소
const URL = 'http://localhost:5000'

function Card({ id, img, name }) {
  const URL = 'http://localhost:5000'
  // 리덕스 email 
  const reduxState = useSelector(state => state);
  const email = reduxState.email.email
  const storeCocktail = reduxState.store.store
  

  // console.log(email);

  useEffect(() => {
    If();
  }, [])

  // console.log(name)
  // 렌더링용 useState
  const [render, setRender] = useState(false);
  // 데이터변경 useRef
  const checked = useRef(false);


  // 저장한 칵테일 별표 표시 
  const If = () => {
    storeCocktail.map(res => res == name ? (checked.current = true, setRender(true)) : null)
  };


  function onClick() {
    checked.current = !checked.current;
    console.log(checked);
    //렌더링
    setRender((current) => !current);
    axiosPost();
    // axiosGet()-> 디스패치
    console.log(storeCocktail)
  };

  const axiosPost = () => {
    axios.post(
      `${URL}/favourite`,
      {
        email_give: email,
        name_give: name,
        checked_give: (checked.current ? parseInt(1) : parseInt(0))
      })
      .then((res) => {
        console.log(res);
        alert("통신성공");
      })
      .catch((error) => {
        // console.log(error);
        console.error(error);
      });
  };


  const [hover, setHover] = useState(0);


  return (
    <div className={cardStyles.card}>
      {/* {hover == 0 ? "" : <StarBorderIcon onClick={onClick} className={cardStyles.star_icon} />}       */}
      <StarBorderIcon onClick={() => { onClick() }} className={`${render ? cardStyles.true_star_icon : cardStyles.false_star_icon}`} />
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