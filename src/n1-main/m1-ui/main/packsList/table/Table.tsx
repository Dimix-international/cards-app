import React, {useMemo, MouseEvent} from 'react';
import {useTable} from "react-table";
import {COLUMNS} from "../column";
import {CardPackType} from "../../../../m3-dal/auth-api";
import {useAppSelector} from "../../../../../hook/redux";
import './Table.scss'
import {packInfoType} from "../PacksList";
import {Link} from "react-router-dom";
import {SortType} from "../../../../m3-dal/pack-list-api";
import {ModalTriggerType} from "../../../../m2-bll/app-reducer";

type TableType = {
    data: Array<CardPackType>
    sortData: () => void
    openModalWindow: (value: boolean, trigger: ModalTriggerType, packInfo?: packInfoType) => void
    updateSort: SortType | undefined,
    triggerPage: 'packList' | 'profilePage'
}

export const Table: React.FC<TableType> = ({
                                               data,
                                               sortData,
                                               openModalWindow,
                                               updateSort,
                                               triggerPage
                                           }) => {

    const columns = useMemo(() => COLUMNS, []);
    const userId = useAppSelector(state => state.loginization.user._id);

    const tableHooks = (hooks: any) => {
        //добавим свою колонку
        hooks.visibleColumns.push((columns: any) => [
            ...columns,
            {
                id: 'actions',
                Header: 'Actions',
                Cell: ({row}: any) => {
                    if (row.original.user_id === userId) {
                        return (
                            <div className={'buttons'}>
                                <button
                                    className={'button button_delete'}
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        openModalWindow(true, "deletePack", {
                                            id: row.original._id,
                                            name: row.original.name
                                        })
                                    }
                                    }
                                >
                                    delete
                                </button>
                                <button className={'button button_edit'}
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                            e.stopPropagation();
                                            openModalWindow(true, "editPack", {
                                                id: row.original._id,
                                                name: row.original.name
                                            })
                                        }
                                        }>edit
                                </button>
                                <Link
                                    to={`/packs-list/learnPack?cardsPack_id=${row.original._id}`}
                                    className={'button'}
                                    state={{
                                        packName:row.original.name
                                    }}
                                >
                                    Learn
                                </Link>
                            </div>
                        )
                    } else {
                        return (
                            <div className={'buttons'}>
                                <Link
                                    to={`/packs-list/learnPack?cardsPack_id=${row.original._id}`}
                                    className={'button'}
                                    state={{
                                        packName:row.original.name
                                    }}
                                >
                                    Learn
                                </Link>
                            </div>
                        )
                    }
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
                    rows.map(row => {
                        prepareRow(row);
                        return (

                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        if (cell.column.Header === 'Name') {
                                            return <td {...cell.getCellProps()}>
                                                <Link
                                                    className={'tdLink'}
                                                    to={
                                                        triggerPage === 'packList'
                                                            ? `/packs-list/cards/card?cardsPack_id=${row.original._id}`
                                                            : `/profile/cards/card?cardsPack_id=${row.original._id}`
                                                    }
                                                    state={{
                                                        packName: cell.value,
                                                        userIdPack: row.original.user_id
                                                    }}
                                                >
                                                    {cell.render('Cell')}
                                                </Link>
                                            </td>
                                        }
                                        return <td {...cell.getCellProps()}>
                                            <div>{cell.render('Cell')}</div>
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