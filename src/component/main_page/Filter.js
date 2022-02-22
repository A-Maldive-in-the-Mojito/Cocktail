// import appStyles from '../../App.module.css'
import mainStyles from "./Main.module.css";
import Card from "../Card.js";

import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function Filter() {
  // 함수
  // -> 카드들 생겨요
  // 가짜 html카드 ~~~~~~~
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

  return (
    <div className={mainStyles.filterSection}>
      <h2>Filter Section</h2>
      {/* 필터+검색결과 */}
      <div className={mainStyles.filterContainer}>
        {/* 필터 */}
        <div className={mainStyles.filter_box}>
          <div className="alcohol">
            얼마나 취할래
            <div className={mainStyles.slider}>
              <Box sx={{ width: 200 }}>
                <Slider
                  min={1}
                  max={5}
                  marks={alcoholMarks}
                  valueLabelDisplay="on"
                />
              </Box>
            </div>
          </div>
          <div className="dry">
            Sweet or Dry?
            <div className={mainStyles.slider}>
              <Box sx={{ width: 200 }}>
                <Slider
                  min={1}
                  max={5}
                  marks={dryMarks}
                  valueLabelDisplay="on"
                />
              </Box>
            </div>
          </div>
          <div className="tastingNote">
            테이스팅 노트
            <div id={mainStyles.checkBoxList}>
              <label>
                <input type="checkbox" />
                프레시
              </label>
              <label>
                <input type="checkbox" />
                과일
              </label>
              <label>
                <input type="checkbox" />
                아이셔
              </label>
              <label>
                <input type="checkbox" />
                허브
              </label>
              <label>
                <input type="checkbox" />
                아이써
              </label>
            </div>
          </div>
          <div className="base">
            베이스
            <div id={mainStyles.checkBoxList}>
              <label>
                <input type="checkbox" />진
              </label>
              <label>
                <input type="checkbox" />럼
              </label>
              <label>
                <input type="checkbox" />
                위스키
              </label>
              <label>
                <input type="checkbox" />
                데킬라
              </label>
              <label>
                <input type="checkbox" />
                보드카
              </label>
            </div>
          </div>
          <button id={mainStyles.filterBtn}>검색</button>
        </div>

        <Card />
        {/* 결과 칵테일 카드 */}
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
}
