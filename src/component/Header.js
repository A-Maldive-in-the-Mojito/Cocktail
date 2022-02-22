import styles from './Header.module.css';
import { Link } from 'react-router-dom';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Style } from '@material-ui/icons';

export default function Header() {
    return (
        <div>
            <div className={styles.box}>
                <h1 className={styles.logo}> 
                <Link to="/">
                    <span>🍹</span>
                    모히또에서<p>몰디브 한 잔</p></Link></h1>
                <ul>
                    <li>
                        <Link to="/find">칵테일 검색</Link>
                    </li>
                    <li>
                        <Link to="/home">고향 칵테일</Link>
                    </li>
                    <li>
                        <Link to="/storage">내 칵테일 창고</Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} className={styles.loginIcon} />
                        </Link>
                    </li>
                </ul>
            </div>
            {/* 스크롤업 화살표 */}
            <div className={styles.scroll}>
            <img src="arrow-up-circle.svg"></img></div>
            
            
            

        

        </div>
    );
}