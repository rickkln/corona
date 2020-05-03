/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TableInstance } from 'react-table';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import './table.css';
import { Period } from '../../../utilities/periodUtils';

declare module 'react-table' {
  interface ColumnInstance {
    getClassName: (period: Period) => string
    isSorted: boolean
    isSortedDesc: boolean
  }
}

const SortIcon = ({ isSorted, isSortedDesc }: { isSorted: boolean, isSortedDesc: boolean }) => {
  if (isSorted === undefined) { return null; }
  if (isSorted) {
    return isSortedDesc
      ? <FaSortDown />
      : <FaSortUp />;
  }
  return <FaSort />;
};

const Table = <T extends {}>({ table }: { table: TableInstance<T> }) => (
  <table {...table.getTableProps()}>
    <thead>
      {table.headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps(column.getSortByToggleProps?.())}>
              {column.render('Header')}
              <span>
                <SortIcon isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} />
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...table.getTableBodyProps()}>
      {table.rows.map((row) => {
        table.prepareRow(row);
        return (
          <tr {...row.getRowProps({
            style:
              row.values.name === 'Global'
                ? {
                  fontWeight: 'bolder',
                }
                : {},
          })}
          >
            {row.cells.map((cell) => (
              <td {...cell.getCellProps({ className: cell.column.getClassName?.(cell.value) })}>
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
