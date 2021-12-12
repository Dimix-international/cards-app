import React, {useEffect, useState, KeyboardEvent} from 'react'
import s from './Select.module.scss'

export type arrAlternativeType = {
    id:string,
    value:string
}
type AlternativeSuperSelectType = {
    value: any
    tasks: arrAlternativeType[]
    setValue: (id: string) => void
}
export const Select: React.FC<AlternativeSuperSelectType> = React.memo((
    {
        value,
        tasks,
        setValue
    }) => {
    const [active, setActive] = useState(false);
    const [hoverElID, setHoverElID] = useState(value);

    const hoveredElement = tasks.find(t => t.id === hoverElID);
    const selectedItem = tasks.find(t => t.id === value);
    const toggleSelect = () => {
        setActive(!active)
    }

    useEffect(() => {
        setHoverElID(value)
    }, [value])

    const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === hoverElID) {
                    let newEl = e.key === 'ArrowUp'
                        ? tasks[i - 1]
                        : tasks[i + 1];
                    if (newEl) {
                        setValue(newEl.id)
                    }
                    return
                }
            }
            if (!selectedItem) {
                setValue(tasks[0].id)
            }
        }
        if (e.key === 'Enter' || e.key === 'Escape') {
            setActive(false)
        }
    }
    return (
        <div
            tabIndex={0}
            className={s.select}
            onKeyUp={onKeyUpHandler}
        >
            <div
                className={active ? `${s.title} ${s.active}` : s.title}
                onClick={toggleSelect}
            >
                {selectedItem && selectedItem.value}
            </div>
            {
                active &&
                <div className={s.body}>
                    {tasks.map(t => {
                        const onClickHandler = () => {
                            setValue(t.id);
                            setActive(false)
                        }
                        return (
                            <div
                                className={t === hoveredElement ? `${s.item} ${s.hover} ${s.active}` : s.item}
                                key={t.id}
                                onClick={onClickHandler}
                                onMouseEnter={() => setHoverElID(t.id)}
                            >
                                {t.value}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
})