import * as React from 'react';
// import appStyles from '../../App.module.css'
import mainStyles from "./Main.module.css";
import Card from "../Card.js";

import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { useContext , useEffect } from 'react';
import { APIContext } from '../../context/APIContext';
  
function Filter() {
  //  const cocktail_api = useSelector((state) => state)
  const API = useContext(APIContext);
  


  const alcoholMarks = [
    {
      value: 1,
      label: "😊",
    },
    {
      value: 3,
      label: "🐵",
    },
    {
      value: 5,
      label: "🐶",
    },
  ];
  const dryMarks = [
    {
      value: 1,
      label: "🍯",
    },
    {
      value: 3,
      label: "🍷",
    },
    {
      value: 5,
      label: "🚬",
    },
  ];

  const SliderStyle = styled(Slider)({
    color: '#ff9924',
    height: 6,
    // 단추
    '& .MuiSlider-thumb': {
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
    },

    // 밸류값 태그
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.3,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#ff9924',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
    // 라벨 이모티콘 사이즈
    "& .MuiSlider-markLabel": {
      fontSize: "25px",
      marginTop: "5px"
    },
  }
  )

  return (
    <div className={mainStyles.filterSection}>
      <h2>Filter Section</h2>
      {/* 필터+검색결과 */}
      <div className={mainStyles.filterContainer}>
        {/* 필터 */}
        <div className={mainStyles.filter_box}>
          <div className={mainStyles.tastingNote}>
            <h3>테이스팅 노트</h3>
            <div id={mainStyles.checkBoxList}>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>과일</span>
              </label>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>허브</span>
              </label>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>아이셔</span>
              </label>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>아이써</span>
              </label>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>프레시</span>
              </label>
            </div>
          </div>
          <div className="base">
            <h3>베이스</h3>
            <div id={mainStyles.checkBoxList}>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>진</span>
              </label>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>럼</span>
              </label>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>위스키</span>
              </label>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>데킬라</span>
              </label>
              <label>
                <input type="checkbox" className={mainStyles.cBox} />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>보드카</span>
              </label>
            </div>
          </div>
          <div className="alcohol">
            <h3>얼마나 취할래</h3>
            <div className={mainStyles.slider}>
              <Box sx={{ width: 250 }}>
                <SliderStyle
                  min={1}
                  max={5}
                  defaultValue={2}
                  marks={alcoholMarks}
                  valueLabelDisplay="outo"
                />
              </Box>
            </div>
          </div>
          <div className="dry">
            <h3>Sweet or Dry?</h3>
            <div className={mainStyles.slider}>
              <Box sx={{
                width: 250,
              }}>
                <SliderStyle
                  min={1}
                  max={5}
                  defaultValue={3}
                  marks={dryMarks}
                  valueLabelDisplay="outo"
                />
              </Box>
            </div>
          </div>

          <div id={mainStyles.filterBtn}>검색</div>
        </div>

        {/* <Card /> */}
        {/* 결과 칵테일 카드 */}
        <div className={mainStyles.cardContainer}>
          {API.map((cocktail) =>
          (<Card
            key={cocktail._id.$oid}
            id={cocktail._id.$oid}
            img={cocktail.S3_img}
            name={cocktail.name}
          />
          ))}
        </div>
        {/* <div className={mainStyles.result}>
                    <Link to="/desc">
                        <div className={appStyles.card}>
                            <img className={mainStyles.imgCocktail} src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
                            칵테일
                        </div>
                    </Link>

                    <Link to="/desc">
                        <div className={appStyles.card}>
                            칵테일
                        </div>
                    </Link>
                    <Link to="/desc">
                        <div className={appStyles.card}>
                            칵테일
                        </div>
                    </Link>
                    <Link to="/desc">
                        <div className={appStyles.card}>
                            칵테일
                        </div>
                    </Link> 
                    

                </div> */}
      </div>
    </div>
  );
};
export default Filter;