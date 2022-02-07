import appStyles from '../App.module.css' // ../은 상위폴더
import Styles from './Find.module.css'

import { Link } from 'react-router-dom';

export default function Find() {
    return (
        <div>
            {/* 상단 */}
            <div>
                {/* 검색창 */}
                <div>
                    <h3>칵테일 이름이나 재료를 검색해보세요</h3>
                    <span className="input-holder">
                        <input className="search-input" type="text" /></span>
                    <span className="btn-holder">
                        <button className="text-search-btn">찾기</button></span>
                </div>
                {/* 해시태그 */}
                <div>
                    <span id={Styles.TOP} className={Styles.hashtag}>#TOP 100🏆</span>
                    <span className={Styles.hashtag}>#홈파티🏡</span>
                    <span className={Styles.hashtag}>#발렌타인데이🍷</span>
                    <span className={Styles.hashtag}>#산타랑_건배🎅🏻</span>
                    <span className={Styles.hashtag}>#데일리</span>
                    <span className={Styles.hashtag}>#해피뉴이어🎆</span>
                    <span className={Styles.hashtag}>#불금🌈</span>
                    <span className={Styles.hashtag}>#핫써머🏖️</span>
                    <span className={Styles.hashtag}>#HBD🎂</span>
                    <span className={Styles.hashtag}>#나를위한시️간🕯</span>
                    <span className={Styles.hashtag}>#무비나잇🎬</span>
                    <span className={Styles.hashtag}>#뜨밤🔥</span>
                    

                </div>
            </div>
            {/* 하단 */}
            <div>
                <Link to="/desc">
                    <div className={appStyles.card}>
                        칵테일
                    </div>
                </Link>
            </div>

        </div>
    );
}