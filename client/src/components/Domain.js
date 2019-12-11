import React,{ Component } from "react"
import Navbar from './Navbar';
const API = "https://domain-availability-api.whoisxmlapi.com/api/v1?apiKey=at_1ilNKpF59dWv41BPVOO7phTY3NUaR&domainName="

class Domain extends Component{
    constructor() {
        super()
        this.state = {
          domain: 'www.google.com',
          errors: {},
          status:[],
          loading:false
          
        }
    
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }

      onChange(e) {
        this.setState({ domain: e.target.value })

      }
      componentDidMount(){
      }
      onSubmit(e) {
        e.preventDefault()
        this.setState({loading:true})
        fetch(API+this.state.domain)
        .then(response =>response.json())
        .then(data => this.setState({ status:data,loading:false }));
        console.log(this.state.status)
      }

      render() {
        const {status}= this.state
        return (
          <div className="container">
            
      <div className="w3container content-sec">
          
                <form onSubmit={this.onSubmit}>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
                  <div className="form-group">
                    <label style={{ color: "black", fontSize:"16px"}}></label>
                    <input style={{width:"80%"}}
                      type="domain"
                      className="form-control"
                      name="domain"
                      placeholder="Enter Domain Name"
                      value={this.state.domain}
                      onChange={this.onChange}
                    />
                  </div>
                  <button style={{backgroundColor:"#007BFF"}}
                    id="btnAnimate"
                    type="submit"
                    className="btn btn-md btn-primary">
                    Search for Availability
                  </button>
                </form>
                {
                  this.state.loading ? (<h2>Loading...</h2>) :( 
                    Object.keys(status).map((item, i) => 
                    (
                    <div className="w3-animate-right" style={{marginLeft:"20px"}} key={i}>
                      <h6 ><b>Domain Status:</b> { status[item].domainAvailability }</h6>
                      <h6 class="w3-animate-right"><b>Domain Name:</b> { status[item].domainName }</h6>
                    </div>
                    )
                    )
                    )
                }
              
            
          </div>
          </div>
        )
      }
}       

export default Domain