import React from 'react'
import './website_packages/image.css'
import pkg1 from './website_packages/t1.png'
import pkg2 from './website_packages/t2.png'
import pkg3 from './website_packages/t3.png'
import pkg4 from './website_packages/t5.png'
import pkg5 from './website_packages/t4.png'
import pkg6 from './website_packages/t6.png'
import Domain from './Domain'


export function Standard(props) {
  console.log(props.additionalInfo)
  props.emailAddresses.length = 3
  let header = "Standard Package Selected"
  let categories = ["Business", "Portfolio"]
  return (
    <div>
      <h3>{header}</h3>
      <h5>step 1)</h5>
      Enter Company Name:
          <input id="i1" onChange={props.companyName} placeholder="Enter Company Name" type="text" required={true}></input>
      <h5>step 2)</h5>
      Enter Preffered Domain Name:
      <Domain/>
      <h5>step 3)</h5>
      Input Email Addresses For Your Website<br />For Example :<h6>admin@booster.com</h6>
      {
        props.emailAddresses.map((email, i) => {
          return (
            <div key={i}>
              <input type="text" placeholder="Email Address" onChange={(e) => { props.addEmail(e, i) }} value={email}></input>
            </div>
          )
        })
      }
      <h5>step 4)</h5>
      select category of your website:
          <select onChange={props.onChange}>
        {
          categories.map((category, index) => {
            return (
              <option key={index} value={category}>{category}</option>
            )
          })
        }
      </select>
      <h5>step 5)</h5>
      add more information (One line per functionality)<hr />
      {
        props.additionalInfo.map((add, i) => {
          return (
            <div key={i}>
              <input onChange={(e) => { props.handleChange(e, i) }} type="text" value={add} /><button onClick={() => { props.removeInfo(i) }}>Remove</button>
            </div>
          )
        })
      }
      <button id="b1" onClick={props.addInfo}>Add Information</button>
    </div>
  );
}

export function Professional(props) {
  props.emailAddresses.push("", "", "", "", "", "", "")
  let categories = ["E-Commerce", "Business", "Portfolio"]
  return (
    <div>
      <h5>step 1)</h5>
      Enter Company Name:
          <input id="i1" onChange={props.companyName} placeholder="Enter Company Name" type="text" required={true}></input>
      <h5>step 2)</h5>
      Enter Preffered Domain Name:
      <Domain/>
      <h5>step 3)</h5>
      Input Email Addresses For Your Website<br />For Example :<h6>admin@booster.com</h6>
      {
        props.emailAddresses.map((email, i) => {
          return (
            <div key={i}>
              <input type="text" placeholder="Email Address" onChange={(e) => { props.addEmail(e, i) }} value={email}></input>
            </div>
          )
        })
      }
      <h5>step 4)</h5>
      select category of your website:
          <select onChange={props.onChange}>
        {
          categories.map((category, index) => {
            return (
              <option key={index} value={category}>{category}</option>
            )
          })
        }
      </select>
      <h5>step 5)</h5>
      add more information (One line per functionality)<hr />
      {
        props.additionalInfo.map((add, i) => {
          return (
            <div key={i}>
              <input onChange={(e) => { props.handleChange(e, i) }} type="text" value={add} /><button onClick={() => { props.removeInfo(i) }}>Remove</button>
            </div>
          )
        })
      }
      <button id="b1" onClick={props.addInfo}>Add Information</button>
    </div>
  );
}

export function Advanced(props) {
  props.emailAddresses.push("", "", "", "", "", "", "","","","")
  let categories = ["E-Commerce", "Business", "Portfolio"]
  return (
    <div>
      <h3>Advanced Package Selected</h3>
      <h5>step 1)</h5>
      Enter Company Name:
          <input id="i1" onChange={props.companyName} placeholder="Enter Company Name" type="text" required={true}></input>
      <h5>step 2)</h5>
      Enter Preffered Domain Name:
      <Domain/>
      <h5>step 3)</h5>
      Input Email Addresses For Your Website<br />For Example :<h6>admin@booster.com</h6>
      {
        props.emailAddresses.map((email, i) => {
          return (
            <div key={i}>
              <input type="text" placeholder="Email Address" onChange={(e) => { props.addEmail(e, i) }} value={email}></input>
            </div>
          )
        })
      }
      <h5>step 4)</h5>
      select category of your website:
          <select onChange={props.onChange}>
        {
          categories.map((category, index) => {
            return (
              <option key={index} value={category}>{category}</option>
            )
          })
        }
      </select>
      <h5>step 5)</h5>
      add more information (One line per functionality)<hr />
      {
        props.additionalInfo.map((add, i) => {
          return (
            <div key={i}>
              <input onChange={(e) => { props.handleChange(e, i) }} type="text" value={add} /><button onClick={() => { props.removeInfo(i) }}>Remove</button>
            </div>
          )
        })
      }
      <button id="b1" onClick={props.addInfo}>Add Information</button>
    </div>
  );
}

export function Portfolio(props) {
  return (
    <div>
      <h3>Portfolio Templates</h3>
      <h5>step 6)</h5>
      Select a template:
      <form onChange={props.selectTemplate}>
        <table className="max-height">
          <tbody>
            <tr>
              <td width="33%">
                <h5>Template 1</h5><img name="pkg1" className="images-item" src={pkg1} /><br />
                <a target="_blank" href="https://colorlib.com/preview/#evans">View</a><br />
                Select<input type="radio" name="side" value="t1" />
              </td>
              <td width="33%">
                <h5>Template 2</h5><img className="images-item" name="pkg2" src={pkg2} /><br />
                <a target="_blank" href="https://colorlib.com/demo?theme=glint">View</a><br />
                Select<input type="radio" name="side" value="t2" /> <br />
              </td>
              <td width="33%">
                <h5>Template 3</h5><img className="images-item" name="pkg3" src={pkg3} /><br />
                <a target="_blank" href="https://colorlib.com/preview/#jackson">View</a><br />
                Select<input type="radio" name="side" value="t3" /> <br />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <button
        type="submit"
        className="btn btn-lg btn-primary btn-block"
        onClick={props.addToCart}>
        Add to Cart
                      </button>
    </div>
  );
}

export function ECommerce(props) {
  return (
    <div>
      <h3>E-Commerce Templates</h3>
      <h5>step 6)</h5>
      Select a template:
      <form onChange={props.selectTemplate}>
        <table className="max-height">
          <tbody>
            <tr>
              <td width="33%">
                <h5>Template 1</h5><img name="pkg1" className="images-item" src={pkg4} /><br />
                <a target="_blank" href="https://preview.themeforest.net/item/joo-niche-multipurpose-html-template/full_screen_preview/23767993?_ga=2.51500906.2133349281.1569966667-1743752783.1569736203">View</a><br />
                Select<input type="radio" name="side" value="t1" />
              </td>
              <td width="33%">
                <h5>Template 2</h5><img className="images-item" name="pkg2" src={pkg3} /><br />
                <a target="_blank" href="http://www.mypoorbrain.com/">View</a><br />
                Select<input type="radio" name="side" value="t2" /> <br />
              </td>
              <td width="33%">
                <h5>Template 3</h5><img className="images-item" name="pkg3" src={pkg1} /><br />
                <a target="_blank" href="https://www.mockplus.com/sample/?r=trista">View</a><br />
                Select<input type="radio" name="side" value="t3" /> <br />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <button
        type="submit"
        className="btn btn-lg btn-primary btn-block"
        onClick={props.addToCart}>
        Add to Cart
                      </button>
    </div>
  );
}

export function Business(props) {
  return (
    <div>
      <h3>Business Templates</h3>
      <h5>step 6)</h5>
      Select a template:
      <form onChange={props.selectTemplate}>
        <table className="max-height">
          <tbody>
            <tr>
              <td width="33%">
                <h5>Template 1</h5><img onClick="https://www.wix.com/website-template/view/html/1732?siteId=648ae4f3-0bc8-46c6-becc-8bbf3ccc2ab3&metaSiteId=cb21959b-8635-4fa8-9fd7-b85fe6cd7f3c&originUrl=https%3A%2F%2Fwww.wix.com%2Fwebsite%2Ftemplates%2Fhtml%2Fbusiness" name="pkg1" className="images-item" src={pkg6} /><br />
                <a target="_blank" href="https://www.seymourpowell.com/">View</a><br />
                Select<input type="radio" name="side" value="t1" />
              </td>
              <td width="33%">
                <h5>Template 2</h5><img onClick="https://preview.themeforest.net/item/joo-niche-multipurpose-html-template/full_screen_preview/23767993?_ga=2.51500906.2133349281.1569966667-1743752783.1569736203" className="images-item" name="pkg2" src={pkg5} /><br />
                <a target="_blank" href="http://www.mypoorbrain.com/">View</a><br />
                Select<input type="radio" name="side" value="t2" /> <br />
              </td>
              <td width="33%">
                <h5>Template 3</h5><img onClick="https://www.mockplus.com/sample/?r=trista" className="images-item" name="pkg3" src={pkg4} /><br />
                <a target="_blank" href="https://www.mockplus.com/sample/?r=trista">View</a><br />
                Select<input type="radio" name="side" value="t3" /> <br />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <button
        type="submit"
        className="btn btn-lg btn-primary btn-block"
        onClick={props.addToCart}>
        Add to Cart
                      </button>
    </div>
  );
}