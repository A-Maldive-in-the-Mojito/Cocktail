import appStyles from '../../App.module.css'
import styles from './Main.module.css'

import { Link } from 'react-router-dom';

export default function Filter() {
    return (
        <div>
            <h2>Filter Section</h2>
            {/* 필터+검색결과 */}
            <div className={styles.filterSection}>

                {/* 필터 */}
                <div className={styles.filter}>
                    <div className="alcohol">
                        얼마나 취할래
                    </div>
                    <div className="dry">
                        Sweet or Dry?
                    </div>
                    <div className="tastingNote">
                        Tasting Note
                    </div>
                    <div className="base">
                        Base
                    </div>
                    <button id="filterBtn">찾기</button>
                </div>

                {/* 결과 칵테일 카드 */}
                <div className="result">
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