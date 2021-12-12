import React, {useMemo} from 'react';
import {useTable} from "react-table";
import {COLUMNS} from "../column";
import {CardPackType} from "../../../../m3-dal/auth-api";
import {useAppSelector} from "../../../../../hook/redux";
import './Table.scss'

type TableType = {
    data: Array<CardPackType>
    sortData: () => void

}

export const Table: React.FC<TableType> = ({data, sortData}) => {

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
                    const myCard = data.find(card => Number(card._id) === userId);
                    return (
                        <div className={'buttons'}>
                            {
                                myCard && <>
                                    <button
                                        className={'button_delete'}
                                    >
                                        delete
                                    </button>
                                    <button>edit</button>
                                </>
                            }
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
