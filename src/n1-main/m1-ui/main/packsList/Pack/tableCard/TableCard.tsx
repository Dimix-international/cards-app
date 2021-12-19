import React, {useMemo} from 'react';
import {useTable} from "react-table";
import '../../table/Table.scss'
import {useAppSelector} from "../../../../../../hook/redux";
import {COLUMNS_CARD} from "./columnCard";
import {CardType} from "../../../../../m3-dal/cards-api";

type TableType = {
    data: Array<CardType>
    sortData: () => void
}

export const TableCard: React.FC<TableType> = ({
                                               data,
                                               sortData,
                                           }) => {

    const columns = useMemo(() => COLUMNS_CARD, []);
    const userId = useAppSelector(state => state.loginization.user._id);


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
    });


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