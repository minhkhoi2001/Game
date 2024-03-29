
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TablePagination,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const orders = [
 
];

export const LatestOrders = (props) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
const location = useLocation()
useEffect(()=>{
  if(location.pathname=='/statusOrders'){
    setLimit(10);
  }
})


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

    return (
      <Card>
        <CardHeader title="Latest Orders" />
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{padding:"10px"}}>ID Đơn Hàng</TableCell>
                  <TableCell sx={{padding:"10px"}}>Người chơi</TableCell>
                  <TableCell sx={{padding:"10px"}}>Tổng đơn hàng</TableCell>
                  <TableCell sx={{padding:"10px"}}>Địa chỉ</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Ngày Đặt Hàng
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{padding:"10px"}}>Trạng Thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {(limit > 0
                  ? purchase.data.slice(page * limit, page * limit + limit)
                  : purchase.data
                ).map((order) => (
                  <TableRow hover key={order.id} onClick={()=>{navigate(`/seller/statusOrders/${order._id}`)}} >
                    <TableCell sx={{padding:"10px"}}>{order._id}</TableCell>
                    <TableCell sx={{padding:"10px"}}>{order.customer.fullname}</TableCell>
                    <TableCell sx={{padding:"10px"}}>{order.total_amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}đ</TableCell>
                    <TableCell sx={{padding:"10px"}}>{order.address}</TableCell>
                    
                    <TableCell sx={{padding:"10px"}}>{formatDate(order.createdAt)}</TableCell>
                    <TableCell sx={{padding:"10px"}}>
                      <SeverityPill
                        color={
                          (order.status === "delivered" && "success") ||
                          (order.status === "refunded" && "error") ||
                          "warning"
                        }
                      >
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={orders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      </Card>
    );
  }

