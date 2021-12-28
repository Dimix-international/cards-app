import {FC, MouseEvent, useEffect, useRef} from "react";
import s from './StarsRating.module.scss'
import {setRatingActiveWidth} from "./count-width-active-start";

type StarsRatingType = {
    grade: number
    setStarsRating?: (stars:number) => void
    isChangeRating?: boolean
}
type RatingStarType = {
    id: string,
    name:'rating',
    value:number
}
export const StarsRating:FC<StarsRatingType> = (props) => {

    const {grade, setStarsRating, isChangeRating} = props;
    const ratingStars:Array<RatingStarType> = [
        {
            id: '1',
            name:"rating",
            value: 1,
        },
        {
            id: '2',
            name:"rating",
            value: 2,
        },
        {
            id: '3',
            name:"rating",
            value: 3,
        },
        {
            id: '4',
            name:"rating",
            value: 4,
        },
        {
            id: '5',
            name:"rating",
            value: 5,
        },
    ]
    const ratingActiveRef = useRef<HTMLDivElement | null>(null);


/*    const onMouseEnterHandle = (e:MouseEvent<HTMLInputElement>) => {
        /!*if(isChangeRating) {
            if(ratingActiveRef.current) {
                ratingActiveRef.current.style.width = `${setRatingActiveWidth(Number(e.currentTarget.value))}%`
            }
        }*!/
        if(ratingActiveRef.current) {
            ratingActiveRef.current.style.width = `${setRatingActiveWidth(Number(e.currentTarget.value))}%`
        }
    }
    const onMouseLeaveHandle = (e:MouseEvent<HTMLInputElement>) => {
        /!*if(isChangeRating) {
            if(ratingActiveRef.current) {
                ratingActiveRef.current.style.width = `${setRatingActiveWidth(rating)}%`
            }
        }*!/
        if(ratingActiveRef.current) {
            ratingActiveRef.current.style.width = `${setRatingActiveWidth(rating)}%`
        }
    }*/
    const setRating = (e:MouseEvent<HTMLInputElement>) => {
        setStarsRating && setStarsRating(Number(e.currentTarget.value))
    }

    useEffect(() =>{
        if(ratingActiveRef.current) {
            ratingActiveRef.current.style.width = `${setRatingActiveWidth(grade)}%`
        }
    },[grade])

    return (
        <div className={s.wrapper}>
            <form action="#" className={s.from}>
                {/*<div className={s.form__item}>
                    <div className={s.simple__rating}>
                        <div className={s.simpleRating__items}>
                            <input type="radio"
                                   className={s.simpleRating__item}
                                   name={'rating'}
                                   value={5}
                                   id={'rating-5'}
                            />
                            <label htmlFor="rating-5" className={s.simpleRating__label}> </label>
                            <input type="radio"
                                   className={s.simpleRating__item}
                                   name={'rating'}
                                   value={4}
                                   id={'rating-4'}
                            />
                            <label htmlFor="rating-4" className={s.simpleRating__label}> </label>
                            <input type="radio"
                                   className={s.simpleRating__item}
                                   name={'rating'}
                                   value={3}
                                   id={'rating-3'}
                            />
                            <label htmlFor="rating-3" className={s.simpleRating__label}> </label>
                            <input type="radio"
                                   className={s.simpleRating__item}
                                   name={'rating'}
                                   value={2}
                                   id={'rating-2'}
                            />
                            <label htmlFor="rating-2" className={s.simpleRating__label}> </label>
                            <input type="radio"
                                   className={s.simpleRating__item}
                                   name={'rating'}
                                   value={1}
                                   id={'rating-1'}
                            />
                            <label htmlFor="rating-1" className={s.simpleRating__label}> </label>
                        </div>
                    </div>
                </div>*/}
                <div className={s.form__item}>
                    <div className={s.rating}>
                        <div className={s.rating__body}>
                            <div ref={ratingActiveRef} className={s.rating__active}> </div>
                            <div className={s.rating__items}>
                                {
                                    ratingStars.map(star => (
                                        <input
                                            key={star.id}
                                            className={s.rating__item}
                                            type="radio"
                                            /*onMouseEnter={onMouseEnterHandle}
                                            onMouseLeave={onMouseLeaveHandle}*/
                                            onClick={setRating}
                                            {...star}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        {/*<div className={s.rating__value}>{rating}</div>*/}
                    </div>
                </div>
            </form>
        </div>
    )
}