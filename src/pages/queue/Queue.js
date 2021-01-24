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
      let uncompletedP = [];
      let completedP = [];
      for (let p of result.data) {
        if (p.status === "completed" || p.status === "cancelled") {
          completedP.push(p);
        } else {
          uncompletedP.push(p);
        }
      }
      setData({ uncompletedP: uncompletedP, completedP: completedP });
    }
    fetchPatients();
  }, []);

  return (
    <>
      <PageTitle title="Queue" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="People in Queue" upperTitle disableWidgetMenu noBodyPadding bodyClass={classes.tableOverflow}>
            {patients ? <Table data={patients.uncompletedP} /> : 'Fetching Queue...'}
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget title="Previous Patients" upperTitle disableWidgetMenu noBodyPadding bodyClass={classes.tableOverflow}>
            {patients ? <Table data={patients.completedP} /> : 'Fetching Queue...'}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
