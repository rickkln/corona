import React from 'react';
import { TableInstance } from 'react-table';

const Table = <T extends {}>({ table }: {table: TableInstance<T>}) => (
  <table
    style={table.getTableProps().style}
    className={table.getTableBodyProps().className}
  >
    <thead>
      {table.headerGroups.map((headerGroup) => (
        <tr
          style={headerGroup.getHeaderGroupProps().style}
          className={headerGroup.getHeaderGroupProps().className}
          key={headerGroup.getHeaderGroupProps().key}
        >
          {headerGroup.headers.map((column) => (
            <th
              style={column.getHeaderProps().style}
              className={column.getHeaderProps().className}
              key={column.getHeaderProps().key}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody
      style={table.getTableBodyProps().style}
      className={table.getTableBodyProps().className}
    >
      {table.rows.map((row) => {
        table.prepareRow(row);
        const rowProps = row.getRowProps();
        return (
          <tr
            style={rowProps.style}
            className={rowProps.className}
            key={rowProps.key}
          >
            {row.cells.map((cell) => (
              <td
                key={cell.getCellProps().key}
                style={cell.getCellProps().style}
                className={cell.getCellProps().className}
              >
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default Table;
