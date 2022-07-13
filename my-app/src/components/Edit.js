import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { Button, Checkbox, Form } from "semantic-ui-react";
const axios = require('axios').default;

const Edit = () => {

    const history = useNavigate();

    // const [getUserdata, setUserdata] = useState([]);
    // console.log(getUserdata);

  const [iniVal, setVal] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
  });

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setVal((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);
 
  const getdata = async () => {
    const res = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setVal(data);
      console.log("get data");
    }
  };

  useEffect(()=>{
    getdata();
},[])

  const inputData = async (e) => {
    e.preventDefault();

    const { name, email, age,mobile,work, add} = iniVal;
    axios.post('http://localhost:8000/register', {
      name: name,
      email: email,
      age: age,
      mobile: mobile,
      work: work,
      add: add,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });




//     const res = await fetch("/localhost:8000/register", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name, email, work, add, mobile, age
//         })
//     });

//     const data = await res.json();
//     console.log(data);

//     if (res.status === 422 || !data) {
//         console.log("error ");
//         alert("error");

//     } else {
//         // history.push("/")
//         // setUdata(data)
//         console.log("data added");

//     }
}

const updateuser = async(e)=>{
    e.preventDefault();

    const { name,email,age,mobile,work,add} = iniVal;

    const res2 = await fetch(`http://localhost:8000/updateuser/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name,email,age,mobile,work,add
        })
    });

    const data2 = await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
        alert("fill the data");
    }else{
        alert("Data Updates")
        history('/');
        // setUPdata(data2);
    }

}

  return (
    <div style={{ margin: "10px 200px" }}>
      {/* <NavLink><button style={{backgroundColor:'#000',color:'#fff',padding:10,borderRadius:5}}>home</button></NavLink> */}
      <NavLink to={'/'}><button style={{backgroundColor:"#000",color:'#fff',padding:7,borderRadius:5,cursor:'pointer'}}> home</button></NavLink>
      <Form>
        <h1>Update Details</h1>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="First Name"
            value={iniVal.name}
            name="name"
            onChange={setData}
          />
        </Form.Field>

        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            value={iniVal.email}
            name="email"
            onChange={setData}
          />
        </Form.Field>
        <Form.Field>
          <label>Age</label>
          <input
            placeholder="Enter age"
            value={iniVal.age}
            name="age"
            onChange={setData}
          />
        </Form.Field>
        <Form.Field>
          <label>Mobile</label>
          <input
            placeholder="Enter phone number"
            value={iniVal.mobile}
            name="mobile"
            onChange={setData}
          />
        </Form.Field>
        <Form.Field>
          <label>Work</label>
          <input
            placeholder="Job"
            value={iniVal.work}
            name="work"
            onChange={setData}
          />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input
            placeholder="Enter Address"
            value={iniVal.add}
            name="add"
            onChange={setData}
          />
        </Form.Field>
        <Button type="submit" onClick={updateuser}>Submit</Button>
      </Form>
    </div>
  );
};

export default Edit;
