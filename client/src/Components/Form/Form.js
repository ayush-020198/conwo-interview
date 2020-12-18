import React, { Component } from 'react';
import Axios from 'axios';
import './Form.css'
class Form extends Component{
    constructor(props){
        super(props);
        this.state={
            customer:{
                sLat: '',
                sLong: '',
                dLat: '',
                dLong: '',
                time: '',
                email: ''
            }
        }
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            customer:{
                ...this.state.customer,
                [name]: value
            }
        })
    }

    onCreateSchedule = event => {
        event.preventDefault();
        const user = {
          customer: {
            sLat: this.state.customer.sLat,
            sLong: this.state.customer.sLong,
            dLat: this.state.customer.dLat,
            dLong: this.state.customer.dLong,
            time: this.state.customer.time,
            email: this.state.customer.email
          }
        }
        Axios.post('/schedule', { user })
          .then(res=>{
            console.log(res);
            console.log(res.data);
          })
      }

    render(){
        return (
            <div className="infoBox">
                <div className="card" style={{width: "25%"}}>
                    <div className="card-body">
                        <form onSubmit={this.onCreateSchedule}>
                            <div className="mb-3" style={{textAlign: "left"}}>
                            <label>Source: Latitude <div style={{textAlign: "right"}}><input type="number" name="sLat" value={this.state.customer.sLat} onChange={this.changeHandler}/></div></label>
                            <label>Source: Longitude <div style={{textAlign: "right"}}><input type="number" name="sLong" value={this.state.customer.sLong} onChange={this.changeHandler}/></div></label>
                            </div>                       
                            <div className="mb-3" style={{textAlign: "left"}}>
                            <label>Dest: Latitude <div style={{textAlign: "right"}}><input type="number" name="dLat" value={this.state.customer.dLat} onChange={this.changeHandler}/></div></label>
                            <label>Dest: Longitude <div style={{textAlign: "right"}}><input type="number" name="dLong" value={this.state.customer.dLong} onChange={this.changeHandler}/></div></label>
                            </div>
                            <div className="mb-3" style={{textAlign: "left"}}>
                            <label>Time: <input type="time" name="time" value={this.state.customer.time} onChange={this.changeHandler}/></label> 
                            </div>
                            <div className="mb-3">
                            <div style={{textAlign: "left"}}><label className="form-label">Email: <input type="email" name="email" value={this.state.customer.email} onChange={this.changeHandler}/></label></div>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <button type="submit" className="btn btn-primary">Remind Me!</button>
                        </form>
                    </div>  
                </div>
          </div>
        )
    }
}

export default Form;