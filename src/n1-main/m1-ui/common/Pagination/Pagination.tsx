import React, {useEffect, useState} from "react";
import s from './Pagination.module.scss'

export type PaginationType = {
    totalCards: number,
    pageSize: number,
    pageCurrent: number
    setCurrentPage: (pageNumber: number) => void
}
type LiArrayType = {
    className: string,
    name: string,
    togglePage?: () => void
}

export const Pagination: React.FC<PaginationType> =React.memo( (props) => {
    const {totalCards, pageSize, pageCurrent , setCurrentPage} = props;

    const [currentPage, setPage] = useState(pageCurrent);//текущая страница*/

    const totalPages = Math.ceil(totalCards / pageSize)

    let beforePage = currentPage - 1; // 5 -1 = 4
    let afterPage = currentPage + 1;// 5 + 1 = 6

    if (currentPage === totalPages) { //если мы на последнем
        beforePage = beforePage - 2; //(20-1) = 19 - 7 = 17 - ,будет видна 17 страница
    } else if (currentPage === totalPages - 1) { // мы на 19 странице(предпоследней)
        beforePage = beforePage - 1;  //(19-1) = 18 - 1 = 17 - ,будет видна 17 страница
    }

    if (currentPage === 1) { //если мы на первой странице
        afterPage = afterPage + 2; //(1+1) = 2 + 2 = 4 - ,будет видна 4 страница
    } else if (currentPage === 2) { //если мы на второй странице
        afterPage = afterPage + 1; //(2+1) = 3 + 1 = 4 - ,будет видна 4 страница
    }
    useEffect(() => {
        setPage(pageCurrent)
    },[pageCurrent])
    const showElements = () => {

        const liArray: Array<LiArrayType> = [];
        let classPage = '';

        if (totalPages === 1) {
            liArray.push({
                className: `${s.numb} ${s.active}`,
                name: '1',
                togglePage() {
                    setCurrentPage(currentPage)
                },
            })
            return liArray
        }
        if (totalPages > 1 && totalPages < 5) {
            for (let i = 1; i < 5; i++) {
                if (i > totalPages) {
                    continue;
                }
                if (i === currentPage) {
                    classPage = `${s.numb} ${s.active}`
                } else {
                    classPage = s.numb
                }

                liArray.push({
                    className: classPage,
                    name: String(i),
                    togglePage() {
                        setCurrentPage(i)
                    }
                })
            }
            return liArray
        }

        if (currentPage > 1) {
            liArray.push({
                className: `${s.btn} ${s.prev}`,
                name: 'Prev',
                togglePage() {
                    setCurrentPage(currentPage - 1);
                },
            })
        }

        if (currentPage > 2) {
            liArray.push({
                className: s.numb,
                name: '1',
                togglePage() {
                    setCurrentPage(1)
                }
            });

            if (currentPage > 3) {
                liArray.push({className: s.dots, name: '...',});
            }

        }

        for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {

            if (pageLength > totalPages) {
                continue;
            }
            if (pageLength === 0) {
                pageLength = pageLength + 1;
            }

            if (pageLength === currentPage) {
                classPage = `${s.numb} ${s.active}`
            } else {
                classPage = s.numb
            }

            liArray.push({
                className: classPage,
                name: String(pageLength),
                togglePage() {
                    setCurrentPage(pageLength)
                }
            })
        }

        if (currentPage < totalPages - 1) {

            if (currentPage < totalPages - 2) {
                liArray.push({className: s.dots, name: '...',});
            }

            liArray.push({
                className: s.numb,
                name: `${totalPages}`,
                togglePage() {
                    setCurrentPage(totalPages)
                }
            });
        }

        if (currentPage < totalPages) {
            liArray.push({
                className: `${s.btn} ${s.next}`,
                name: 'Next',
                togglePage() {
                    setCurrentPage(currentPage + 1)
                },
            })
        }

        return liArray;
    }


    return (
            <div className={s.pagination}>
                <ul className={s.btn}>
                    {
                        showElements().map(li => (
                            <PagePagination
                                key={String(Math.random())}
                                name={li.name}
                                className={li.className}
                                callback={li.togglePage}
                            />
                        ))
                    }
                </ul>
            </div>
    )
})

type PageType = {
    className: string
    name: string
    callback?: () => void
}
export const PagePagination: React.FC<PageType> = React.memo((
    {
        className,
        name,
        callback,
    }) => {


        const onClickHandler = () => {
            callback && callback();
        }

        return (
            <li className={className} onClick={onClickHandler}><span>{name}</span>
            </li>
        )
    }
)
