import CustomTable from "../table/CustomTable.tsx";
import {Column} from "react-table";

interface DataRow {
    col1: string;
    col2: string;
    details?: string;  // Campo aggiuntivo per i dettagli
}

const columns: Column<DataRow>[] = [
    {
        Header: 'Column 1',
        accessor: 'col1',
    },
    {
        Header: 'Column 2',
        accessor: 'col2',
    },
    // Aggiungi altre colonne se necessario
];

const data: DataRow[] = [
    {
        col1: 'Hello',
        col2: 'World',
        details: 'Additional details for Hello World',
    },
    {
        col1: 'react-table',
        col2: 'rocks',
        details: 'Additional details for react-table rocks',
    },
    {
        col1: 'whatever',
        col2: 'you want',
        // No details provided for this row
    },
];

const getExpandedContent = (row: DataRow) => {
    if (!row.details) return null; // Se non ci sono dettagli, non espandere
    return <div>{row.details}</div>;
};


const CmpSearchTable = () => {
    return (
        <div>
            <h1>My Table</h1>
            <CustomTable<DataRow> columns={columns} data={data} getExpandedContent={getExpandedContent} />
        </div>
    );
};

export default CmpSearchTable;