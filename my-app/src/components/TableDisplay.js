import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Menu, Modal, Table } from "semantic-ui-react";

import { NavLink } from "react-router-dom";
const axios = require("axios").default;

const TableDisplay = () => {
  const[getUserdata,setUserdata] = useState([]);
  
  const getdata = async() => {
  ///////////////////////////////////////////////////////////////////////////////
    // create a promise for the axios request
    // const promise = axios.get('http://localhost:8000/getdata')

    // using .then, create a new promise which extracts the data
    // const dataPromise = promise.then((response) => response.data)

    // return it
    // return dataPromise
  // };

  // now we can use that data from the outside!
// getdata()
// .then(data => {
//    console.log(data);
// })
// .catch(err => console.log("err"))
//////////////////////////////////////////////////////////////////////

const res = await fetch("http://localhost:8000/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

      const res2 = await fetch(`http://localhost:8000/deleteuser/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          }
      });

      const deletedata = await res2.json();
      console.log(deletedata);

      if (res2.status === 422 || !deletedata) {
          console.log("error");
      } else {
          console.log("user deleted");
          // setDLTdata(deletedata)
          getdata();
      }

  }



 

  return (
    <div style={{ margin: 30 }}>
      <NavLink to={"/register"}>
        <button
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: 10,
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Add Data
        </button>
      </NavLink>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Number</Table.HeaderCell>
            {/* <Table.HeaderCell>Images</Table.HeaderCell> */}
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            getUserdata.map((element,id)=>{
              return(
                <>
                <Table.Row>
            <Table.Cell>{id+1}</Table.Cell>
            <Table.Cell>{element.name}</Table.Cell>
            <Table.Cell>{element.email}</Table.Cell>
            <Table.Cell>{element.age}</Table.Cell>
            <Table.Cell>{element.mobile}</Table.Cell>
            {/* <Table.Cell>
              <Modal
                trigger={<Button>View Images</Button>}
                header="GeeksforGeeks"
                content="Semantic UI is a modern framework 
              used in developing seamless designs for the 
              website, Its gives the user a lightweight 
              experience with its components. It uses 
              the predefined CSS, JQuery language to 
              incorporate in different frameworks.."
                actions={["Cancel", "OK"]}
              />
            </Table.Cell> */}
            <Table.Cell>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <NavLink to={`/view/${element._id }`}>
                <button>
                  <i className="fa-solid fa-eye"></i>
                </button>
                </NavLink>
                
                <NavLink to={`/edit/${element._id}`}>
                <button>
                  <i className="fa-solid fa-pen"></i>
                </button>
                </NavLink>
                <button onClick={()=>deleteuser(element._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </Table.Cell>
          </Table.Row>
                </>
              )
            })
          }
          

          
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <script>$('.test.modal') .modal('show') ;</script>
    </div>
  );
};

export default TableDisplay;
