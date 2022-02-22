import appStyles from '../App.module.css'
import styles from './Storage.module.css'

import { Link } from 'react-router-dom';

export default function Storage() {
    return (
        <div>
            <Link to="/desc">
                <div className={appStyles.card}>
                    칵테일
                </div>
            </Link>
        </div>
    );
}