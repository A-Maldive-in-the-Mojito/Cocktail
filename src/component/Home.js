import Styles from './Find.module.css'

import axios from 'axios';
import { useState } from 'react';

function Home(){
    const [ment, setMent] = useState("이거 아니다 해");

    function changeMent(movieTitle) {
        const newMent = movieTitle;
        setMent(movieTitle);
    }

    // const getMovies = async() => {
    //     const {data: {data: {movies}}} = await axios.get('https://yts-proxy.nomadcoders1.now.sh/list_movies.json');
    //     const movieTitle = (movies[0]['title']);
    //     changeMent(movieTitle);
    // };
    // getMovies();


    return (
    <div className={Styles.molba}>
        <div className="molba">
        <img src="molba.png"></img>
        </div>
        <h1>{ment}</h1>
    </div>
    );
}
export default Home;