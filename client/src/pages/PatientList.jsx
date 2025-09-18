import axios from "axios";
import { useState, useEffect } from "react";
import BackEndURL from "../util/BackEndUrl";
import Table from 'react-bootstrap/Table';

const PatientList = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = async () => {
  const docid = localStorage.getItem("docid");
console.log("Doctor ID from localStorage:", docid);


    if (!docid) {
      console.log("Doctor ID missing!");
      return;
    }

    let api = `${BackEndURL}/doctor/showpatientlist/?id=${docid}`;

    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  let i = 0;
  const ans = mydata.map((key) => {
    i++;
    return (
      <tr key={key._id}>
        <td>{i}</td>
        <td>{key.patientname}</td>
        <td>{key.deseases}</td>
        <td>{key.contactno}</td>
        <td>{key.address}</td>
        <td>{key.email}</td>
      </tr>
    )
  });

  return (
    <>
      <h2> Patient Detail </h2>
      <hr />
      <Table striped bordered hover style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Deases</th>
            <th>Contact no</th>
            <th> Address</th>
            <th> Email</th>
          </tr>
        </thead>
        <tbody>
          {ans}
        </tbody>
      </Table>
    </>
  )
}

export default PatientList;
