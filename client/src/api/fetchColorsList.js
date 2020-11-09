import {axiosWithAuth} from "../utils/axiosWithAuth";

export const fetchColorsList =  async () => {
   try {
    const res = await axiosWithAuth().get("http://localhost:5000/api/colors");
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}