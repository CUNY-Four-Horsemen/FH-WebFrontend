import React, { useState } from "react";
import {
  Chip,
  Select,
  MenuItem
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from "axios";

import useStyles from "../../styles";

const states = {
  completed: "success",
  waiting: "warning",
  cancelled: "secondary",
  inside: "inside",
  late: "late"
};

export default function TableComponent({ data, completedTable, handleStatusChange }) {
  const classes = useStyles();

  const options = {
    download: false,
    print: false,
    selectableRowsHeader: false,
    selectableRows: "none",
    sort: completedTable,
    viewColumns: completedTable
  }

  const columns = [
    {
      name: "qNumber",
      label: "Queue Number",
      options: {
        filter: false,
      }
    },
    {
      name: "name",
      label: "Name"
    },
    {
      name: "phoneNumber",
      label: "Phone Number"
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: function (value, tableMeta, updateValue) {
          return <Chip label={value[0].toUpperCase() + value.slice(1)} classes={{ root: classes[states[value]] }} />
        }
      }
    },
    {
      name: "changeStatus",
      label: "Change Status",
      options: {
        filter: false,
        customBodyRender: function (value, tableMeta, updateValue) {
          let qNumber = tableMeta.rowData[0];
          return (
            <Select value={"update_" + qNumber} className={classes.selectEmpty} autoWidth onChange={handleStatusUpdate}>
              <MenuItem value={"update_" + qNumber} disabled>
                Update
                </MenuItem>
              {completedTable ?
                <MenuItem value={"waiting_" + qNumber}>Waiting</MenuItem>
                :
                <MenuItem value={"completed_" + qNumber}>Completed</MenuItem>
              }
              <MenuItem value={"inside_" + qNumber}>Inside</MenuItem>
              <MenuItem value={"cancelled_" + qNumber}>Cancelled</MenuItem>
              <MenuItem value={"late_" + qNumber}>Late</MenuItem>
            </Select>
          );
        }
      }
    }
  ]

  const handleStatusUpdate = (event) => {
    let [status, qNumber] = event.target.value.split("_");
    let id;
    let newData = [...data];
    for (let d = 0; d < newData.length; d++) {
      if (newData[d].qNumber == parseInt(qNumber)) {
        id = newData[d].id;
        newData[d].status = status;
        break;
      }
    }
    axios.post(
      "http://localhost:5001/cuny-four-horsemen/us-central1/api/updatePatientStatus",
      {
        id: id,
        status: status
      }
    ).then((response) => {
      console.log(response.status == 200);
      if (response.status == 200) {
        console.log(newData, data);
        handleStatusChange(newData, completedTable);
      }
    });
  }

  if (completedTable) {
    return (
      <MUIDataTable
        title="Previous Patients"
        data={data}
        columns={columns}
        options={options}
      />
    );
  } else {
    return (
      <MUIDataTable
        title="People in Queue"
        data={data}
        columns={columns}
        options={options}
      />
    );
  }

}
