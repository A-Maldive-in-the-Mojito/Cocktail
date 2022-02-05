import mainStyles from './Main.module.css'

export default function Top100(){
    return (
    <div className={mainStyles.Top100}>
        <h1>World's Top 100</h1>
        <h1>Cocktils</h1>
        <div className={mainStyles.box}></div>
    </div>
    );
}