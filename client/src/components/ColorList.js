import React, { useEffect, useState } from "react";


import { axiosWithAuth } from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" },
  // id: Date.now()
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(initialColor);
//console.log(colorToEdit);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
const deleteMessage = color => {
  setDeleting(true);
  setColorToDelete(color);
  //setSuccessMessage("The color was deleted");
}
  const saveEdit = e => {
    
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log("editing res: ", res)
      setColorToEdit(res.data);
      
      
    })
    .catch(err => console.log(err));
  };
  
  // const {push} = useHistory();
  // const history = useHistory();
  // console.log(history);

  const deleteColor = color => {
    //console.log(color.id);
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log("delete res: ", res)
       setSuccessMessage("The color was deleted");
    
    })
    .catch(err => console.log(err))
  };
 
useEffect(() => {
  
  axiosWithAuth().get(`http://localhost:5000/api/colors`)
        .then((res) => {
            console.log("useEffcet fetch item response: ", res);
            
          })
          .catch((err) => {
            console.log(err)
          })
  }, [colorToEdit, colors]);

//ADD COLOR FORM
const [newColor, setNewColor] = useState(initialColor);

const submit = (e) => {
  e.preventDefault();
  setNewColor(initialColor);
  axiosWithAuth().post("http://localhost:5000/api/colors", newColor)
  .then(res => {
    console.log("add color res: ", res);
    updateColors(res.data);
  })
  .catch(err => console.log(err))
}
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color);
                    
                   
                  }

                }>
                  x
                  
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
               style={{ backgroundColor: color.code.hex }}
            />
            
          </li>
        ))}
      </ul>
      
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={submit}>
      <legend>Add new color</legend>
        <label>
          Color Name:
          <input name="color" type="text" value={newColor.color} onChange={e => setNewColor({...newColor, color: e.target.value})} />
        </label>
        <label>
          Hex Value:
          <input name="code" type="text" value={newColor.code.hex} onChange={e => setNewColor({...newColor, code: {hex: e.target.value}})} />
        </label>
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
