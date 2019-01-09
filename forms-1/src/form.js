import React, { Component } from 'react';
const countries = require('./countries.json');

class Form extends Component {
    constructor () {
        super ()
        this.state = {
            name: '',
            month: '',
            day: '',
            year: '',
            country: '',
            diet: '',
            reason: '',
            formCompleted: false,
            formSubmitted: false
        }
    }

    handleSubmit = () => {
        this.setState({
            formSubmitted: true
        })
    }
    
    isFormComplete = () => {
        let formKeys = ['name', 'month', 'day', 'year', 'country', 'diet', 'reason']
        if (formKeys.every(formKey => this.state[formKey])) {
            this.setState({
                formCompleted: true
            })
        }
        console.log(this.state)
    } 

    handleFormChanges = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.isFormComplete();
    };


    render () {
        const { name, month, day, year, country, diet, reason, formCompleted, formSubmitted } = this.state;
        let allDays = [];
        let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let allYears = [];
        
        const createDateOptions = (minNum, maxNum, dateArr) => {
            for (let i = minNum; i <= maxNum; i++) {
                dateArr.push(i)
            }
            return dateArr.map(date => <option value={ date }>{ date }</option>);
        };

        const renderConfirmation = () => {
            if (formCompleted) {
                return (
                    <div className='confirmation'>
                    <h3>Please confirm the information.</h3>
                    <p>Name: { this.state.name }</p>
                    <p>DOB: { this.state.month } { this.state.day } { this.state.year }</p>
                    <p>Country: { this.state.country }</p>
                    <p>Dietary Preference: { this.state.diet }</p>
                    <p>Reason: { this.state.reason }</p>
                    </div>
                )
            }
        }

        const createMonths = (monthsArr) => monthsArr.map(month => <option value={ month }>{ month }</option>);
        const createCountries = (countryArr) => countryArr.map(country => <option value={ country.name }>{ country.name } { country.code }</option>);

        if (formCompleted && formSubmitted) {
            return (
                <div>
                    <h2>
                        Thank you for your application.
                    </h2>
                </div>
            )
        } else {
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
                            Why do you want to be a Mars explorer? <input className='reason' type='text' placeholder='Reason to explore...' name='reason' value={ reason } id='reason'></input>
                        </div>
                      <div className='button'>
                      </div>
                      </form>
                      { renderConfirmation() }
                      <button onClick={ this.handleSubmit } type='button'>Submit</button>
                    </div>
                </React.Fragment>   
            )
        }
    }
}

export default Form;