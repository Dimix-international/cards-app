import s from './Loader.module.scss'
import loader from '../../../../assets/loader.gif'
export const Loader = () => {
    return (
        <div className={s.container}>
            <img className={s.loader} src={loader} alt="...loading"/>
        </div>
    )
}