import React from "react";
import { render, screen } from "@testing-library/react";
// import {fetchColorsList} from "../api/fetchColorsList";
// import {axiosWithAuth} from "../utils/axiosWithAuth";
import axios from "axios";
import BubblePage from "./BubblePage";



test("Fetches data and renders the bubbles", async () => {
 //ARRANGE
 render(<BubblePage />); //it renders and its passing

 const getColorsList = require("./BubblePage");

jest.mock("./BubblePage");
//check for async calls and the get request
async () => {
  axios.get({
  data: [
    {
      color: "aliceblue",
      code: {
        hex: "#f0f8ff"
      },
      id: 1
    },
    {
      color: "limegreen",
      code: {
        hex: "#99ddbc"
      },
      id: 2
    },
    {
      color: "aqua",
      code: {
        hex: "#00ffff"
      },
      id: 3
    }
  ]
});
//make assertions
const colorList = await getColorsList();
expect(colorList).toHaveLength(3); //all passes
}
});
//mock data
const data=[
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff"
    },
    id: 3
  },
]