import * as React from 'react';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('1', 159, 6.0, 24, 4.0),
  createData('2', 237, 9.0, 37, 4.3),
  createData('3', 262, 16.0, 24, 6.0),
  createData('4', 305, 3.7, 67, 4.3),
  createData('5', 356, 16.0, 49, 3.9),
  createData('6', 159, 6.0, 24, 4.0),
  createData('7', 237, 9.0, 37, 4.3),
  createData('8', 262, 16.0, 24, 6.0),
  createData('9', 305, 3.7, 67, 4.3),
  createData('10', 356, 16.0, 49, 3.9),
];

function sum(column) {
  return rows.reduce((acc, row) => acc + row[column], 0);
}

const TableStickyHeader = () => {

  return (
    <div className="">
      <h1 className='mb-5'>
        Best selling menus
      </h1>
      <Sheet sx={{ height: 300, overflow: 'auto' }}>
        <Table
          aria-label="table with sticky header"
          stickyHeader
          stickyFooter
          stripe="odd"
          hoverRow
        >
          <thead>
            <tr>
              <th>Rank</th>
              <th>Menu</th>
              <th>Complains</th>
              <th>Number of orders</th>
              <th>Revenue(฿)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.calories}</td>
                <td>-</td>
                <td>{row.carbs}</td>
                <td>{row.protein}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Totals</th>
              <td></td>
              <td></td>
              <td>{sum('carbs').toFixed(2)}</td>
              <td>{sum('carbs').toFixed(2)}</td>
            </tr>
            
          </tfoot>
        </Table>
      </Sheet>
    </div>
  );
}

export default TableStickyHeader;
