import React, { Component } from 'react';
import { Confirm } from './confirm.js';
const countries = require('./countries.json');

class Form extends Component {
    constructor (props) {
        super (props)
        this.state = {
            name: '',
            month: '',
            day: '',
            year: '',
            country: '',
            diet: '',
            reason: ''
        }
    }

    onSubmit = () => {
        this.props.onSubmit(this.state)
    }

    handleFormChanges = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render () {
        const { name, month, day, year, country, diet, reason } = this.state;
        let allDays = [];
        let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let allYears = [];
        
        const createDateOptions = (minNum, maxNum, dateArr) => {
            for (let i = minNum; i <= maxNum; i++) {
                dateArr.push(i)
            }
            return dateArr.map(date => <option value={ date }>{ date }</option>);
        };
        const createMonths = (monthsArr) => monthsArr.map(month => <option value={ month }>{ month }</option>);
        const createCountries = (countryArr) => countryArr.map(country => <option value={ country.name }>{ country.name } { country.code }</option>);

        return (
            <React.Fragment>
                <h1>Mission to Mars Registration Form</h1>

                <div className='form'>
                  
                  <form onChange={ this.handleFormChanges }>  
                    <div className='name'>
                        What is your name? <input type='text' placeholder='Name' name='name' value={ name } id='name'></input>
                    </div>
                    
                    <div className='dob'>    
                        What is your date of birth? 
                        <select name='month' value={ month }>
                            <option value='month'>Month</option>
                            { createMonths(allMonths) }
                        </select>

                        <select name='day' value={ day }>
                            <option value='day'>Day</option>
                            { createDateOptions(1, 31, allDays) }
                        </select>    

                        <select name='year' value={ year }>
                            <option value='year'>Year</option>
                            { createDateOptions(1900, 2019, allYears) }
                        </select>
                    </div>

                    <div className='country'>
                    What is your country of origin?
                        <select name='country' value={ country }>
                            <option value='country'>Country</option>
                            { createCountries(countries) }
                        </select>
                    </div>

                    <div className='diet'>
                    What is your dietary preference?
                        <select name='diet' value={ diet }>
                            <option value='diet'>Dietary Preference</option>
                            <option value='omnivore'>Omnivore</option>
                            <option value='vegetarian'>Vegetarian</option>
                            <option value='vegan'>Vegan</option>
                            <option value='carnivore'>Carnivore</option>
                        </select>
                    </div>

                    <div className='reason'>
                        Why do you want to be a Mars explorer? <textarea className='reason' type='text' placeholder='Reason to explore...' name='reason' value={ reason } id='reason'></textarea>
                    </div>
                  <div className='button'>
                  <button type='button'>Submit</button>
                  </div>
                  </form>
                    <Confirm name={ name }/>
                </div>
            </React.Fragment>
        )
    }
}

export default Form;