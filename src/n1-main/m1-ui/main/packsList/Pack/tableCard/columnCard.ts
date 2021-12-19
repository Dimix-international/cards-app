import {format} from 'date-fns';

export const COLUMNS_CARD = [
    {
        Header: 'Question',
        accessor: 'question'
    },
    {
        Header: 'Answer',
        accessor: 'answer'
    },
    {
        Header: 'Last Updated',
        accessor: 'updated',
        Cell: ({value}: { value: Date }) => {
            return format(new Date(value), 'dd.MM.yyyy')
        },

    },
    {
        Header: 'Grade',
        accessor: 'rating',
    },
]