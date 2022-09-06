import Styles from './HashTag.module.css'

import { useEffect, useState, useTransition } from "react";

function HashTag({ key, name, value }) {

    const [클릭함, set클릭함] = useState(true);
    const onClick = (event) => {
        if (event.target.value == value) {
            set클릭함(!클릭함);
            console.log(클릭함);
            if (클릭함 == false) {
                event.target.checked = false;
                console.log(event.target.checked);
            };

        }


    }


    return (
        <div className={Styles.tags_box}>
            <label>
                <input type="radio" onClick={onClick} name="check" value={value} className={Styles.cBox} />
                <span className={
                    (value == "top100" ? `${Styles.TOP} ${Styles.hashtag}` : Styles.hashtag)
                }>{name}</span>
            </label>
        </div>
    )
}
export default HashTag;