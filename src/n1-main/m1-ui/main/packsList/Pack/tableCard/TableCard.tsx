import React, {MouseEvent, useMemo} from 'react';
import {useTable} from "react-table";
import '../../table/Table.scss'
import {useAppSelector} from "../../../../../../hook/redux";
import {COLUMNS_CARD} from "./columnCard";
import {CardType} from "../../../../../m3-dal/cards-api";

type TableType = {
    data: Array<CardType>
    sortData: () => void
    isOwnerCard:boolean
}

export const TableCard: React.FC<TableType> = ({
                                               data,
                                               sortData,
                                                   isOwnerCard
                                           }) => {

    const columns = useMemo(() => COLUMNS_CARD, []);

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
                                >
                                    delete
                                </button>
                                <button className={'button button_edit'}
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                            e.stopPropagation();
                                            console.log('edit')
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
        // @ts-ignore
        setColumnOrder,
    } = useTable({
        // @ts-ignore
        columns,
        data,
    },tableHooks);

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