import * as React from 'react';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import useMerchant from "../../hooks/useMerchant";
import { getTopSalesMenus } from "../../api/orderApi";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const TableStickyHeader = () => {
  const axiosPrivate = useAxiosPrivate();
  const [menus, setMenus] = React.useState([]);
  const { merchant } = useMerchant();

  const getRankedMenu = async (restaurant_id, axiosPrivate) => {
    const response = await getTopSalesMenus(restaurant_id, axiosPrivate);
    console.log("API response:", response); 
    setMenus(response);
  }

  const sum = (field) => {
    return menus.reduce((total, menu) => total + (menu[field] || 0), 0);
  };

  React.useEffect(() => {
    if (merchant.restaurant_id) {
      getRankedMenu(merchant.restaurant_id, axiosPrivate);
    }else {
      console.error("No restaurant ID available.");
    }
  }, [merchant.restaurant_id]);

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
            {menus.map((row, index) => (
              <tr key={row.name}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>-</td>
                <td>{row.quantity}</td>
                <td>{row.sale}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Totals</th>
              <td></td>
              <td></td>
              <td>{sum('quantity').toFixed(2)}</td>
              <td>{sum('sale').toFixed(2)}</td>
            </tr>
            
          </tfoot>
        </Table>
      </Sheet>
    </div>
  );
}

export default TableStickyHeader;
