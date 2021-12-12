import React from "react";
import {Slider} from "@mui/material";
import s from './Range.module.scss'

const minDistance = 10;

type RangeType = {
    minValue: number,
    maxValue: number
    setMinMaxRange: (values: Array<number>) => void
}

export const Range: React.FC<RangeType> = React.memo((props) => {

    const {minValue, maxValue, setMinMaxRange} = props;

    const [value1, setValue1] = React.useState<number[]>([minValue, maxValue]);

    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }

    };

    return (
        <>
            <h3 className={s.title}>
                Number of cards
            </h3>
            <div className={s.range}>
                <Slider
                    classes={{
                        track: s.track,
                        active: s.active, //активный кружок ( за который тянем)
                        //dragging:s.red, //когда тянем кружок, весь range изменяется
                        //focusVisible:s.red, //кружок в фокусе
                        rail: s.rail, //оставшийся путь
                        thumb: s.thumb, //кружки
                        valueLabel:s.label
                    }}
                    getAriaLabel={() => 'Minimum distance'}
                    value={value1}
                    onChange={handleChange1}
                    onMouseUp={() => setMinMaxRange(value1)}
                    valueLabelDisplay="auto"
                    disableSwap
                />
            </div>
        </>
    )
})