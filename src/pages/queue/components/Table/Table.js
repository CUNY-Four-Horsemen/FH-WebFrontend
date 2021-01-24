import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  console.log(data);

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell key="qNumber">Queue Number</TableCell>
          <TableCell key="name">Name</TableCell>
          <TableCell key="phoneNumber">Phone Number</TableCell>
          <TableCell key="status">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ qNumber, firstName, lastName, phoneNumber, status = "Pending" }) => (
          <TableRow key={qNumber}>
            <TableCell >{qNumber}</TableCell>
            <TableCell className="pl-3 fw-normal">{firstName + ' ' + lastName}</TableCell>
            <TableCell>{phoneNumber}</TableCell>
            <TableCell>
              <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
