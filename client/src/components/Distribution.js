import React from 'react'
import Map from './Map'


export function SingleSided(props) {
    return (
        <div  className="formContainer">
        <input type="file"
            accept="image"
            name="sideOne"
            placeholder="Upload Image for Shootout"
            onChange={props.uploadImage}
        />
        {
          props.loading ? (<h1>Loading...</h1>) : <img width='40' height='40' alt="upload an image" src={props.sideOne} />
        }
    </div>
    );
  }

  export function DoubleSided(props) {
    return (
        <div>
        <input type="file"
            accept="image"
            name="sideOne"
            placeholder="Upload Image for Shootout"
            onChange={props.uploadImage}
        />
        <img width='40' height='40' alt="upload an image" src={props.sideOne} />
        <input type="file"
            accept="image"
            name="sideTwo"
            placeholder="Upload Image for Shootout"
            onChange={props.uploadImage}
        />
        <img width='40' height='40' alt="upload an image" src={props.sideTwo} />
    </div>
    );
  }