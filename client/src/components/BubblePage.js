import React, { useState, useEffect } from "react";
 import {axiosWithAuth} from "../utils/axiosWithAuth";
//import {fetchColorsList} from "../api/fetchColorsList";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(()=>{
// fetchColorsList().then(res => setColorList(res.data))
// .catch(err => console.log(err));
axiosWithAuth().get("http://localhost:5000/api/colors")
.then((res) => {
  //console.log(res);
  setColorList(res.data);
})
.catch(err => console.log(err))
  }, []);

  return (
    <>
      <ColorList colors={colorList}  updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
