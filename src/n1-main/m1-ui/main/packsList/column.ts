import {format} from 'date-fns';

export const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Cards',
        accessor: 'cardsCount'
    },
    {
        Header: 'Last Updated',
        accessor: 'updated',
        Cell: ({value}: { value: Date }) => {
            return format(new Date(value), 'dd.MM.yyyy')
        },

    },
    {
        Header: 'Created by',
        accessor: 'user_name',
    },
]