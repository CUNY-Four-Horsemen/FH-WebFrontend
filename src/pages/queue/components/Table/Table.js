import React from "react";
import {
  Chip,
  Select,
  MenuItem
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "../../styles";

const states = {
  completed: "success",
  waiting: "warning",
  declined: "secondary",
};

export default function TableComponent({ data, completedTable }) {
  const classes = useStyles();
  console.log(data);

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
          return (
            <Select value={"update"} className={classes.selectEmpty} autoWidth onChange={handleStatusUpdate}>
              <MenuItem value="update" disabled>
                Update
                </MenuItem>
              {completedTable ?
                <MenuItem value={"waiting"}>Waiting</MenuItem>
                :
                <MenuItem value={"completed"}>Completed</MenuItem>
              }
              <MenuItem value={"inside"}>Inside</MenuItem>
              <MenuItem value={"cancelled"}>Cancelled</MenuItem>
              <MenuItem value={"late"}>Late</MenuItem>
            </Select>
          );
        }
      }
    }
  ]

  const options = {
    download: false,
    print: false,
    selectableRowsHeader: false,
    selectableRows: "none",
    sort: completedTable,
    viewColumns: completedTable
  }

  const handleStatusUpdate = (event) => {
    console.log(event.target);
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
