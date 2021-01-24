import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "./components/Table/Table";

export default function Tables() {
  const [patients, setData] = useState();

  useEffect(() => {
    async function fetchPatients() {
      console.log("Fetch");
      const result = await axios(
        "http://localhost:5001/cuny-four-horsemen/us-central1/api/patients"
      );
      separatePatients(result.data);
    }
    fetchPatients();
  }, []);

  const separatePatients = (data) => {
    let uncompletedP = [];
    let completedP = [];
    for (let p of data) {
      if (p.status === "completed" || p.status === "cancelled") {
        completedP.push(p);
      } else {
        uncompletedP.push(p);
      }
    }
    setData({ uncompletedP: uncompletedP, completedP: completedP });
  }

  const handleStatusChange = (newArray, completedTable) => {
    let merged;
    if (completedTable) {
      merged = newArray.concat(patients.uncompletedP);
    } else {
      merged = newArray.concat(patients.completedP);
    }
    separatePatients(merged);
  }

  return (
    <>
      <PageTitle title="Queue" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {patients ? <Table data={patients.uncompletedP} completedTable={false} handleStatusChange={handleStatusChange} /> : 'Fetching Queue...'}
        </Grid>
        <Grid item xs={12}>
          {patients ? <Table data={patients.completedP} completedTable={true} handleStatusChange={handleStatusChange} /> : 'Fetching Queue...'}
        </Grid>
      </Grid>
    </>
  );
}
