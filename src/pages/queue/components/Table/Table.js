import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Select,
  MenuItem
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  completed: "success",
  waiting: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  console.log(data);

  const handleStatusUpdate = (event) => {
    console.log(event.target);
  }

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell key="qNumber">Queue Number</TableCell>
          <TableCell key="name">Name</TableCell>
          <TableCell key="phoneNumber">Phone Number</TableCell>
          <TableCell key="status">Status</TableCell>
          <TableCell key="changeStatus">Change Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ qNumber, firstName, lastName, phoneNumber, status = "Pending" }) => (
          <TableRow key={qNumber}>
            <TableCell >{qNumber}</TableCell>
            <TableCell className="pl-3 fw-normal">{firstName + ' ' + lastName}</TableCell>
            <TableCell>{phoneNumber}</TableCell>
            <TableCell>
              <Chip label={status[0].toUpperCase() + status.slice(1)} classes={{ root: classes[states[status]] }} />
            </TableCell>
            <TableCell>
              <Select value={"update"} className={classes.selectEmpty} autoWidth onChange={handleStatusUpdate}>
                <MenuItem value="update" disabled>
                  Update
                </MenuItem>
                <MenuItem value={"completed"}>Completed</MenuItem>
                <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                <MenuItem value={"late"}>Late</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
