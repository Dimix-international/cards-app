import React, {useMemo} from 'react';
import {useTable} from "react-table";
import {COLUMNS} from "../column";
import {CardPackType} from "../../../../m3-dal/auth-api";
import {useAppSelector} from "../../../../../hook/redux";
import './Table.scss'
import {ModalTriggerType, packInfoType} from "../PacksList";

type TableType = {
    data: Array<CardPackType>
    sortData: () => void
    openModalWindow: (value: boolean, trigger: ModalTriggerType, packInfo?: packInfoType) => void
}

export const Table: React.FC<TableType> = ({
                                               data,
                                               sortData,
                                               openModalWindow
                                           }) => {

    const columns = useMemo(() => COLUMNS, []);
    const userId = useAppSelector(state => state.loginization.user._id)

    const tableHooks = (hooks: any) => {
        //добавим свою колонку
        hooks.visibleColumns.push((columns: any) => [
            ...columns,
            {
                id: 'actions',
                Header: 'Actions',
                Cell: ({row}: any) => {

                    if (row.original.user_id === String(userId)) {
                        return (
                            <div className={'buttons'}>
                                <button
                                    className={'button button_delete'}
                                    onClick={() => {
                                        openModalWindow(true, "delete", {
                                            id: row.original._id,
                                            name: row.original.name
                                        })
                                    }
                                    }
                                >
                                    delete
                                </button>
                                <button className={'button button_edit'}>edit
                                </button>
                                <button className={'button'} onClick={() => {
                                    console.log('ok')
                                }
                                }>
                                    Learn
                                </button>
                            </div>
                        )
                    } else {
                        return (
                            <div className={'buttons'}>
                                <button className={'button'} onClick={() => {
                                    console.log('ok')
                                }
                                }>
                                    Learn
                                </button>
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
                                                className={'sort'}
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
                                        return <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
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
