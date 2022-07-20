import Navbar from "./components/Navbar";
import "./app.css";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import UploadZipFile from "./pages/UploadZipFile";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  // return (
  //   <BrowserRouter>
  //     <div>
  //       <Navbar user={user} />
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route
  //           path="/login"
  //           element={user ? <Navigate to="/" /> : <Login />}
  //         />
  //         <Route
  //           path="/post/:id"
  //           element={user ? <Post /> : <Navigate to="/login" />}
  //         />

  //         <Route
  //           path="/uploadzipfile"
  //           element={<UploadZipFile />}
  //         />
  //       </Routes>
  //     </div>
  //   </BrowserRouter>
  // );
  const [fileData, setFileData] = useState();
  const fileChangeHandler = (e)=>{
    setFileData(e.target.files[0])
  }

const onSubmitHandler = (e) =>{
  e.preventDefault();
const data = new FormData()
data.append('image', fileData)

  fetch("http://localhost:5000/single", {
    method:"POST",
    body: data,
  }).then((result)=>{
    console.log("file sent successfully")
  }).catch((err)=>{
    console.log(err.message)
  })
}

  return (
    
      <div className="app">
        <h1>react app file uploading</h1>
        <form onSubmit={onSubmitHandler}>
          <input type="file" onChange={fileChangeHandler} />
          <br />
          <br />
          <button type="submit"> Submit file to backend</button>
        </form>
       
      </div>
    
  );
};

export default App;
