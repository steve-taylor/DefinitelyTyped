import * as React from "react";
import BootstrapTable, {
    CellAlignment,
    ColumnDescription,
    ColumnFormatter,
    HeaderFormatter,
} from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { CSVExport, InjectedSearchProps, Search } from "react-bootstrap-table2-toolkit";

interface Product {
    id: number;
    name: string;
    price?: number | undefined;
    quality?: number | undefined;
    inStockStatus?: number | undefined;
    sales?: number | undefined;
}

const products: Product[] = [
    {
        id: 1,
        name: "Item name 1",
        price: 100,
    },
    {
        id: 2,
        name: "Item name 2",
        price: 100,
    },
];

const priceHeaderFormatter: HeaderFormatter<Product> = (column, colIndex, components) => {
    return (
        <div>
            {column.text}
            {components.sortElement}
            {components.filterElement}
        </div>
    );
};

const priceFormatter: ColumnFormatter<Product, { indexSquare: number }> = (cell, row, rowIndex) => {
    return (
        <span>
            {rowIndex} - {cell}
        </span>
    );
};

const productColumns: Array<ColumnDescription<Product>> = [
    { dataField: "id", align: "center", sort: true, text: "Product ID" },
    { dataField: "name", align: "center", sort: true, text: "Product Name" },
    {
        isDummyField: true,
        dataField: "",
        sort: true,
        text: "Product Name",
    },
    {
        dataField: "price",
        sort: true,
        formatter: priceFormatter,
        text: "Product Price",
        headerFormatter: priceHeaderFormatter,
    },
    /**
     * test optional dataField for dummyFields
     */
    {
        isDummyField: true,
        dataField: "",
        sort: true,
        formatter: priceFormatter,
        text: "Product Price",
        headerFormatter: priceHeaderFormatter,
    },
];

/**
 * Toolkit with custom search test
 */

const CustomSearch = (props: InjectedSearchProps) => {
    return (
        <span>
            <input value={props.searchText} onChange={e => props.onSearch(e.currentTarget.value)} />
            <button onClick={props.onClear}>Clear Search</button>
        </span>
    );
};

<ToolkitProvider data={products} keyField="id" columns={productColumns}>
    {({ baseProps, searchProps }) => (
        <>
            <CustomSearch {...searchProps} />
            <BootstrapTable {...baseProps} pagination={paginationFactory({ sizePerPage: 10, page: 1 })} />
        </>
    )}
</ToolkitProvider>;

/**
 * Toolkit CSV export test
 */

const csvColumns: Array<ColumnDescription<Product>> = [
    { dataField: "id", align: "center", sort: true, text: "Product ID" },
    { dataField: "name", align: "center", sort: true, text: "Product Name" },
    {
        isDummyField: true,
        dataField: "",
        sort: true,
        text: "Product Name",
    },
    {
        dataField: "price",
        sort: true,
        formatter: priceFormatter,
        text: "Product Price",
        headerFormatter: priceHeaderFormatter,
        csvExport: false,
    },
    /**
     * test optional dataField for dummyFields
     */
    {
        isDummyField: true,
        dataField: "",
        sort: true,
        formatter: priceFormatter,
        text: "Product Price",
        headerFormatter: priceHeaderFormatter,
        csvType: Number,
        csvFormatter: value => value,
        csvText: "Price",
        csvExport: true,
    },
];

<ToolkitProvider
    data={products}
    keyField="id"
    exportCSV={{
        fileName: "custom.csv",
        separator: "|",
        ignoreHeader: true,
        noAutoBOM: false,
        blobType: "text/plain;charset=utf-8",
        exportAll: true,
        onlyExportSelection: true,
        onlyExportFiltered: true,
    }}
    columns={productColumns}
>
    {({ baseProps, searchProps }) => (
        <>
            <CustomSearch {...searchProps} />
            <BootstrapTable {...baseProps} pagination={paginationFactory({ sizePerPage: 10, page: 1 })} />
        </>
    )}
</ToolkitProvider>;

/**
 * Toolkit Search with ClearSearchButton
 */

const { SearchBar, ClearSearchButton } = Search;

<ToolkitProvider keyField="id" data={products} columns={productColumns} search>
    {({ baseProps, searchProps }) => (
        <>
            <SearchBar {...searchProps} />
            <ClearSearchButton {...searchProps} />
            <BootstrapTable {...baseProps} />
        </>
    )}
</ToolkitProvider>;

/**
 * Toolkit CSVExport with ExportCSVButton
 */

const { ExportCSVButton } = CSVExport;

<ToolkitProvider keyField="id" data={products} columns={productColumns} search>
    {({ baseProps, csvProps }) => (
        <>
            <ExportCSVButton {...csvProps}>Export</ExportCSVButton>
            <BootstrapTable {...baseProps} />
        </>
    )}
</ToolkitProvider>;
