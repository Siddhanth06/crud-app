import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();

  const [getUserdata, setUserdata] = useState([]);
  console.log(getUserdata);

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
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

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
        navigate('/');
    }

}

  return (
    <>
      <NavLink to="/">
        <Button style={{ margin: 10, backgroundColor: "#000", color: "#fff" }}>
          Home
        </Button>
      </NavLink>
      <div className="container" style={{ margin: 100, maxWidth: 600 }}>
        <h1>Welcome {getUserdata.name}</h1>
        <div className="top__content">
          <div>
            <img
              src="https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              style={{ width: 100, height: 100 }}
            ></img>
          </div>

          <div style={{ margin: "60px 0px 0px 20px" }}>
            <NavLink to={`/edit/${getUserdata._id}`}>
            <button
              style={{
                backgroundColor: "lightgreen",
                padding: 7,
                borderRadius: 5,
              }}
            >
              Edit
            </button>
            </NavLink>
            
            <button
            onClick={()=>deleteuser(getUserdata._id)}
              style={{
                backgroundColor: "red",
                marginLeft: 10,
                padding: 7,
                borderRadius: 5,
              }}
            >
              Delete
            </button>
            
          </div>
        </div>

        <div className="flex" style={{ display: "flex" }}>
          <div className="left__view">
            <p>
              Name :<span>{getUserdata.name}</span>
            </p>
            <p>
              Email :<span>{getUserdata.email}</span>
            </p>
            <p>
              Address :
              <span>
                {getUserdata.add}
              </span>
            </p>
          </div>
          <div className="right__view" style={{ marginLeft: 50 }}>
            <p>
              Mobile :<span>{getUserdata.mobile}</span>
            </p>
            <p>
              Job :<span>{getUserdata.work}</span>
            </p>
            <p>
              Age :
              <span>
               {getUserdata.age}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
