import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "./components/Table/Table";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
  const [patients, setData] = useState();
  const classes = useStyles();

  useEffect(() => {
    async function fetchPatients() {
      const result = await axios(
        "http://localhost:5001/cuny-four-horsemen/us-central1/api/patients"
      );
      console.log(result.data);
      setData(result.data);
    }
    fetchPatients();
  }, []);

  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            {patients ? <Table data={patients} /> : 'Fetching Queue...'}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
