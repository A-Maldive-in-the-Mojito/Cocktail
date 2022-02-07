import appStyles from '../../App.module.css'
import mainStyles from './Main.module.css'

import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function Filter() {
    const alcoholMarks = [
        {
            value: 1,
            label: '😊',
        },
        {
            value: 3,
            label: '🐵',
        },
        {
            value: 5,
            label: '🐶',
        },
    ];
    const dryMarks = [
        {
            value: 1,
            label: '🍯',
            
        },
        {
            value: 3,
            label: '🍷',
        },
        {
            value: 5,
            label: '🚬',
        },
    ];

    return (
        <div className={mainStyles.filterSection}>
            <h2>Filter Section</h2>
            {/* 필터+검색결과 */}
            <div className={mainStyles.filterContainer}>

                {/* 필터 */}
                <div className={mainStyles.filter}>
                    <div className="alcohol">
                        얼마나 취할래
                        <div className={mainStyles.slider}>
                            <Box sx={{ width: 200 }}>
                                <Slider min={1} max={5}
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
                                <Slider min={1} max={5}
                                    marks={dryMarks}
                                    valueLabelDisplay="on"
 />
                            </Box>
                        </div>
                    </div>
                    <div className="tastingNote">
                        테이스팅 노트
                        <div id="checkBoxList">
                            <input type="checkbox" />프레시
                            <input type="checkbox" />과일
                            <input type="checkbox" />아이셔
                            <input type="checkbox" />허브
                            <input type="checkbox" />아이써
                        </div>
                    </div>
                    <div className="base">
                        베이스
                        <Form>
                            <Form.Check label="진" />
                            <Form.Check label="럼" />
                            <Form.Check label="위스키" />
                            <Form.Check label="데킬라" />
                            <Form.Check label="보드카" />
                            <Form.Check label="브랜디" />
                        </Form>
                    </div>
                    <button id="filterBtn">검색</button>
                </div>

                {/* 결과 칵테일 카드 */}
                <div className={mainStyles.result}>
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
                    <Link to="/desc">
                        <div className={appStyles.card}>
                            칵테일
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );

}
