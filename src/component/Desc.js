import styles from './Desc.module.css'

export default function Desc() {
    return (
        <div id="desc">
            {/* 이미지+설명 */}
            <div>
                <div className={styles.box}>
                </div>
                <span>이 술은 영국에서 시작되어
                    5명에게 공유하지않으면 10초내로.....큰일을 당하게.. </span>
            </div>
            {/* 레시피 */}
            <div>
                <h1>피나콜라다
                </h1>
                <span>#해시태그</span>
                {/* 알콜 당도 정보 */}
                <div id="info">
                </div>
                {/* 재료 */}
                <div>
                    <ul>
                        <li>코코넛</li>
                        <li>술</li>
                    </ul>
                    <h4>믹스방법</h4>
                    <p>코코넛을 나무에서 땁니다
                        .....술이랑 섞습니다</p>
                </div>
            </div>

        </div>
    );
}