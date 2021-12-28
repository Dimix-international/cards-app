import React, {MouseEvent, useMemo} from 'react';
import {useTable} from "react-table";
import '../../table/Table.scss'
import {COLUMNS_CARD} from "./columnCard";
import {CardType} from "../../../../../m3-dal/cards-api";
import {SortType} from "../../../../../m3-dal/pack-list-api";
import {StarsRating} from "../../../../common/StarsRating/StarsRating";
import {useAppSelector} from "../../../../../../hook/redux";
import {ModalTriggerType} from "../../../../../m2-bll/app-reducer";
import {CardInfoType} from "../CardsOfPack";

type TableType = {
    data: Array<CardType>
    sortData: () => void
    isOwnerCard: boolean
    updateSort: SortType | undefined
    openModalWindow: (value: boolean, trigger: ModalTriggerType, cardInfo?: CardInfoType) => void
}

export const TableCard: React.FC<TableType> = ({
                                                   data,
                                                   sortData,
                                                   isOwnerCard,
                                                   updateSort,
                                                   openModalWindow
                                               }) => {

    const columns = useMemo(() => COLUMNS_CARD, []);
    const userId = useAppSelector(state => state.loginization.user._id);

    const tableHooks = (hooks: any) => {
        isOwnerCard && hooks.visibleColumns.push((columns: any) => [
            ...columns,
            {
                Header: 'Actions',
                id: 'actions',
                Cell: ({row}: any) => {
                    return (
                        <div className={'buttons'}>
                            <button
                                className={'button button_delete'}
                                onClick={() => {
                                    openModalWindow(true,'deleteCard', {
                                        id: row.original._id,
                                        question:row.original.question,
                                        answer:row.original.answer,
                                    })
                                }
                                }
                            >
                                delete
                            </button>
                            <button className={'button button_edit'}
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        openModalWindow(true,'editCard', {
                                            id: row.original._id,
                                            question:row.original.question,
                                            answer:row.original.answer,
                                        })
                                    }
                                    }>edit
                            </button>
                        </div>
                    )
                }
            }
        ])
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        // @ts-ignore
        columns,
        data,
    }, tableHooks);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => {

                                    if (column.Header === 'Last Updated') {
                                        return (
                                            <th
                                                className={updateSort === '0updated'
                                                    ? 'sort'
                                                    : 'sort back'
                                                }
                                                {...column.getHeaderProps()}
                                                onClick={sortData}
                                            >
                                                {column.render('Header')}
                                            </th>
                                        )
                                    } else {
                                        return (
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </th>
                                        )
                                    }
                                })
                            }
                        </tr>
                    ))
                }
                </thead>
                <tbody {...getTableBodyProps()}>
                {
                    rows.map((row,indexRow) => {

                        prepareRow(row);
                        return (

                            <tr {...row.getRowProps()}>
                                {

                                    row.cells.map((cell, index) => {
                                        return <td {...cell.getCellProps()}>
                                            {
                                                cell.column.Header === 'Grade'
                                                ? <StarsRating
                                                        grade={data[indexRow].grade}
                                                        isChangeRating={row.original.user_id === String(userId)}
                                                    />
                                                : cell.render('Cell')
                                            }
                                        </td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    );
}