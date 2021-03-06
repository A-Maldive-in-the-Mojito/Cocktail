import * as React from "react";
// import appStyles from '../../App.module.css'
import mainStyles from "./Main.module.css";
import Card from "../Card.js";

import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { useContext, useEffect, useState, useRef } from "react";
import { APIContext } from "../../context/APIContext";
import { event } from "jquery";

function Filter() {
  //  const cocktail_api = useSelector((state) => state)
  const API = useContext(APIContext);

  const alcoholMarks = [
    {
      value: 1,
      label: "๐",
    },
    {
      value: 3,
      label: "๐ต",
    },
    {
      value: 5,
      label: "๐ถ",
    },
  ];
  const dryMarks = [
    {
      value: 1,
      label: "๐ฏ",
    },
    {
      value: 3,
      label: "๐ท",
    },
    {
      value: 5,
      label: "๐ฌ",
    },
  ];

  const SliderStyle = styled(Slider)({
    color: "#ff9924",
    height: 6,
    // ๋จ์ถ
    "& .MuiSlider-thumb": {
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
    },

    // ๋ฐธ๋ฅ๊ฐ ํ๊ทธ
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.3,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#ff9924",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
    // ๋ผ๋ฒจ ์ด๋ชจํฐ์ฝ ์ฌ์ด์ฆ
    "& .MuiSlider-markLabel": {
      fontSize: "25px",
      marginTop: "5px",
    },
  });

  // ํ์ด์คํ ๊ฐ
  // useRef
  const tastingValue = useRef([]);
  const tastingOnChange = (event) => {
    const eventValue = event.target.value;
    const checked = event.target.checked;
    //useRef์ ์?์ฅ
    checked
      ? (tastingValue.current = [eventValue, ...tastingValue.current])
      : (tastingValue.current = tastingValue.current.filter(
          (val) => val != eventValue
        ));
  };

  // ๋ฒ?์ด์ค ๊ฐ
  const baseValue = useRef([]);
  const baseOnChange = (event) => {
    const eventValue = event.target.value;
    const baseChecked = event.target.checked;
    baseChecked
      ? (baseValue.current = [eventValue, ...baseValue.current])
      : (baseValue.current = baseValue.current.filter(
          (val) => val != eventValue
        ));
  };

  // ์ผ๋ง๋ ์ทจํ?๋ ๊ฐ
  const [currentBoozy,setCurrentBoozy] = useState();//๊ฒ์๋ฒํผํด๋ฆญ์ ์ง์?ํด๋ ๊ฐ์ผ๋ก ๊ณ?์?ํ๊ธฐ ์ํจ.
  const boozyValue = useRef(10);
  const boozyOnChange = (event) => {
    const parseBoozyValue = parseInt(event.target.value);
    boozyValue.current = parseBoozyValue * 2;
    setCurrentBoozy(parseBoozyValue);
  };

  // sweet or dry ๊ฐ
  const [currentSweet,setCurrentSweet] = useState();//๊ฒ์๋ฒํผํด๋ฆญ์ ์ง์?ํด๋ ๊ฐ์ผ๋ก ๊ณ?์?ํ๊ธฐ ์ํจ.
  const sweetValue = useRef(6);
  const sweetOnchange = (event) => {
    const parseSweetValue = parseInt(event.target.value);
    sweetValue.current = parseSweetValue * 2;
    setCurrentSweet(parseSweetValue)
  };

  const [ํด๋ฆญํจ, setํด๋ฆญํจ] = useState(0);
  // ํํฐ๋ง
  const [useArry, setUseArray] = useState([]);

  const searchOnClick = (event) => {
    setํด๋ฆญํจ(1);
    console.log(event)
    console.log(tastingValue.current);
    console.log(baseValue.current);
    console.log(boozyValue.current);
    console.log(sweetValue.current);

    // ํ์ด์คํ
    // ๋น๋ฐฐ์ด ๋ง๋ค๊ธฐ
    const tastingArray = [];
    // ๊ฒฐ๊ณผ๊ฐ ๋ฐ๋ณต๋ฌธ
    if (tastingValue.current.length == 0) {
      tastingArray.push(API);
      console.log("๋น์ด์ด์");
    } else {
      for (let tValue of tastingValue.current) {
        tastingArray.push(API.filter((val) => val.flavor.includes(tValue)));
      }
    }

    const concatTA = tastingArray[0]
      .concat(tastingArray[1])
      .concat(tastingArray[2])
      .concat(tastingArray[3])
      .concat(tastingArray[4]);
    console.log(concatTA);

    // ๋ฒ?์ด์ค
    const baseArray = [];
    if (baseValue.current.length == 0) {
      baseArray.push(API);
      console.log("๋ฒ?์ด์ค ๋น์ด์ด์");
    } else {
      for (let bValue of baseValue.current) {
        const search = API.filter((val) => val.base.includes(bValue));
        // console.log(search)
        baseArray.push(search);
      }
    }
    console.log(baseArray);
    const concatBA = baseArray[0]
      .concat(baseArray[1])
      .concat(baseArray[2])
      .concat(baseArray[3])
      .concat(baseArray[4]);
    console.log(concatBA);

    // ์ผ๋ง๋ ์ทจํ?๋
    const boozyArray = [];
    const searchBoozy = API.filter(
      (val) => val.booziness <= boozyValue.current
    );
    // console.log(search)
    boozyArray.push(searchBoozy);
    console.log(boozyArray);

    // sweet or dry
    const sweetArray = [];
    const searchSweet = API.filter(
      (val) => val.sweetness <= sweetValue.current
    );
    // console.log(search)
    sweetArray.push(searchSweet);
    console.log(sweetArray);

    // ๋ค ๊ฐ์ง ํญ๋ชฉ ํํฐ๋ง
    const allFilter = concatTA
      .filter((val) => concatBA.includes(val))
      .filter((val) => boozyArray[0].includes(val))
      .filter((val) => sweetArray[0].includes(val));
    console.log(allFilter);

    // ์ค๋ณต์?๊ฑฐ
    const removeDuplicate = Array.from(new Set(allFilter));
    console.log(removeDuplicate);
    setUseArray(removeDuplicate);
    // setUseArray(removeDuplicate.filter(item => item !== undefined));
  };

  return (
    <div className={mainStyles.filterSection}>
      <h2>Filter Section</h2>
      {/* ํํฐ+๊ฒ์๊ฒฐ๊ณผ */}
      <div className={mainStyles.filterContainer}>
        {/* ํํฐ */}
        <div className={mainStyles.filter_box}>
          <div className={mainStyles.tastingNote}>
            <h3>ํ์ด์คํ ๋ธํธ</h3>
            <div id={mainStyles.checkBoxList}>
              <label>
                <input
                  onChange={tastingOnChange}
                  value="ํ๋ฃจํฐ"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>๊ณผ์ผ</span>
              </label>
              <label>
                <input
                  onChange={tastingOnChange}
                  value="ํ๋ธ"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>ํ๋ธ</span>
              </label>
              <label>
                <input
                  onChange={tastingOnChange}
                  value="์์ด์"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>์์ด์</span>
              </label>
              <label>
                <input
                  onChange={tastingOnChange}
                  value="์์ด์จ"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>์์ด์จ</span>
              </label>
              <label>
                <input
                  onChange={tastingOnChange}
                  value="ํ๋?์"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>ํ๋?์</span>
              </label>
            </div>
          </div>
          <div className="base">
            <h3>๋ฒ?์ด์ค</h3>
            <div id={mainStyles.checkBoxList}>
              <label>
                <input
                  onChange={baseOnChange}
                  value="gin"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>์ง</span>
              </label>
              <label>
                <input
                  onChange={baseOnChange}
                  value="rum"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>๋ผ</span>
              </label>
              <label>
                <input
                  onChange={baseOnChange}
                  value="whiskey"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>์์คํค</span>
              </label>
              <label>
                <input
                  onChange={baseOnChange}
                  value="tequila"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>๋ฐํฌ๋ผ</span>
              </label>
              <label>
                <input
                  onChange={baseOnChange}
                  value="vodka"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>๋ณด๋์นด</span>
              </label>
              <label>
                <input
                  onChange={baseOnChange}
                  value="brandy"
                  type="checkbox"
                  className={mainStyles.cBox}
                />
                <i className={mainStyles.circle}></i>
                <span className={mainStyles.text}>๋ธ๋๋</span>
              </label>
            </div>
          </div>
          <div className="alcohol">
            <h3>์ผ๋ง๋ ์ทจํ?๋</h3>
            <div className={mainStyles.slider}>
              <Box sx={{ width: 250 }}>
                <SliderStyle
                  onChange={boozyOnChange}
                  min={1}
                  max={5}
                  defaultValue={currentBoozy}
                  marks={alcoholMarks}
                  valueLabelDisplay="auto"
                />
              </Box>
            </div>
          </div>
          <div className="dry">
            <h3>Sweet or Dry?</h3>
            <div className={mainStyles.slider}>
              <Box
                sx={{
                  width: 250,
                }}
              >
                <SliderStyle
                  onChange={sweetOnchange}
                  min={1}
                  max={5}
                  defaultValue={currentSweet}
                  marks={dryMarks}
                  valueLabelDisplay="auto"
                />
              </Box>
            </div>
          </div>

          <div onClick={searchOnClick} id={mainStyles.filterBtn}>
            ๊ฒ์
          </div>
        </div>

        {/* ๊ฒฐ๊ณผ ์นตํ์ผ ์นด๋ */}
        <div className={mainStyles.cardContainer}>
          {ํด๋ฆญํจ == 1 ? (
            useArry.length > 0 ? (
              useArry.map((cocktail) => (
                <Card
                  key={cocktail._id.$oid}
                  id={cocktail._id.$oid}
                  img={cocktail.S3_img}
                  name={cocktail.name}
                />
              ))
            ) : (
              <div>๋ฐ์ดํฐ๊ฐ ์์์</div>
            )
          ) : (
            API.map((cocktail) => (
              <Card
                key={cocktail._id.$oid}
                id={cocktail._id.$oid}
                img={cocktail.S3_img}
                name={cocktail.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Filter;