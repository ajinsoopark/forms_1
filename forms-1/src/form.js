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
            formSubmitted: false,
            formConfirmed: false,
            underWater: '',
            marital: '',
            stressReaction: '',
            claustrophobic: '',
            educationComplete: false,
            familyHistory: {
                cancer: false,
                heartDisease: false,
                diabetes: false,
                chosenArr:[]
            },
            family: {
                siblings: false,
                siblingCount: 0,
                parents: false,
                parentCount: 0,
                grandparents: false,
                grandarentCount: 0,
                chosenArr: []
            },
            education: {
                diploma: false,
                associates: false,
                bachelors: false,
                masters: false,
                phd: false,
                other: '',
                chosenArr: []
            }
        }
    };
    
    isFormComplete = () => {
        let formKeys = ['name', 'month', 'day', 'year', 'country', 'diet', 'reason', 'underWater', 'marital', 'stressReaction', 'claustrophobic', 'educationComplete']
        if (formKeys.every(formKey => this.state[formKey])) {
            this.setState({
                formCompleted: true
            })
        }
        
    };

    capitalizeFirstAndSpace = (str) => {
        let capitalized = str.split('').map((char, i) => {
            if (i === 0) {
                return char.toUpperCase();
            } else if (char === char.toUpperCase()) {
                return ` ${char}`
            } else {
                return char
            }
        })
        return capitalized.join('')
    };

    addOtherToEducation = () => { if (this.state.formCompleted && !this.state.formConfirmed) this.state.education.chosenArr.push(this.state.education.other) }

    addToEventArr = (target, id) => {
     if (id) {
        let newState = this.state[target]
        newState.chosenArr.push(this.capitalizeFirstAndSpace(id))
        this.setState({
            [target]: newState
        })
    }
    };

    createinInfoStr = (infoParent) => infoParent.join(', ')
    
    handleButton = (event) => {
        event.preventDefault()
        if (event.target.id === 'confirm') {
            this.setState({
                formConfirmed: true
            })
        } else {
            this.setState({
                formSubmitted: true
            })
        }
        this.addOtherToEducation()
        this.isFormComplete();
    };

    handleTextChanges = (event) => {
        if (event.target.name === 'education') {
            let newState = this.state[event.target.name];
            newState[event.target.id] = event.target.value
            this.setState({
                [event.target.name]: newState,
                educationComplete: true
            })
        } else if (event.target.id) {
            let newState = this.state[event.target.name];
            newState[event.target.id] = event.target.value
            this.setState({
                [event.target.name]: newState
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        this.isFormComplete();
    };

    handleRadioChanges = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.isFormComplete();
    };

    handleCheckboxChanges = (event) => {
        if (event.target.name === 'education') {
            let newState = this.state[event.target.name];
            newState[event.target.id] = event.target.checked
            this.setState({
                [event.target.name]: newState,
                educationComplete: true
            })
        } else if (event.target.id) {
            let newState = this.state[event.target.name];
            newState[event.target.id] = event.target.checked
            this.setState({
                [event.target.name]: newState
            })
        } else {
            this.setState({
                [event.target.name]: event.target.checked
            })
        }
        this.addToEventArr(event.target.name, event.target.id);
        this.isFormComplete();
    };

    handleSelectChanges = (event) => {
        if (event.target.name === 'family') {
            let newState = this.state[event.target.name];
            newState[event.target.id] = event.target.value
            newState.chosenArr.push(` ${this.capitalizeFirstAndSpace(event.target.id)}(${event.target.value})`)
            this.setState({
                [event.target.name]: newState
            })
        } else if (event.target.id) {
            let newState = this.state[event.target.name];
            newState[event.target.id] = event.target.value
            this.setState({
                [event.target.name]: newState
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        this.isFormComplete();
    };
   

    render () {
        const { name, month, day, year, country, diet, reason, formCompleted, formSubmitted, underWater, marital, stressReaction, claustrophobic, family, familyHistory, education, formConfirmed } = this.state;
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
            if (formConfirmed && formCompleted) {
                return (
                    <div className='confirmation'>
                    <h3>Please confirm the information.</h3>
                    <p><b>Name</b>: { this.state.name }</p>
                    <p><b>DOB</b>: { this.state.month }, { this.state.day }, { this.state.year }</p>
                    <p><b>Country</b>: { this.state.country }</p>
                    <p><b>Dietary Preference</b>: { this.state.diet }</p>
                    <p><b>Reason</b>: { this.state.reason }</p>
                    <p><b>Ablility to be underwater 1+ minutes</b>: { this.state.underWater }</p>
                    <p><b>Marital Status</b>: { this.state.marital }</p>
                    <p><b>Stress Reaction</b>: { this.state.stressReaction }</p>
                    <p><b>Claustrophobic</b>: { this.state.claustrophobic }</p>
                    <p><b>Education</b>: { this.createinInfoStr(this.state.education.chosenArr) }</p>
                    <p><b>Family</b>: { this.createinInfoStr(this.state.family.chosenArr) }</p>
                    <p><b>Family History</b>: { this.createinInfoStr(this.state.familyHistory.chosenArr) }</p>
                    <input className='submitButton' onClick={ this.handleButton } type='submit' value='Submit'/>
                    </div>
                )
            }
        }

        const renderFamilySelect = (familyMember, value, id) => {
            if(familyMember && (id === 'siblingCount')) {
                return (
                   <div className='siblingSelect'>
                    <p>How many?</p>
                    <select name='family' value={ value } id={ id } onChange={ this.handleSelectChanges }>
                        <option value=''>0</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6+'>6+</option>
                    </select>
                    </div> 
                )
            } else if (familyMember && (id === 'parentCount')) {
                return (
                    <div className='parentSelect'>
                        <p>How many?</p>
                        <select name='family' value={ value } id={ id } onChange={ this.handleSelectChanges }>
                            <option value=''>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                        </select>
                    </div>
                )
            } else if (familyMember && (id === 'grandparentCount')) {
                return (
                    <div className='grandparentSelect'>
                        <p>How many?</p>
                        <select name='family' value={ value } id={ id } onChange={ this.handleSelectChanges }>
                            <option value=''>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>
                    </div>
                )
            }
        }

        const createMonths = (monthsArr) => monthsArr.map(month => <option value={ month }>{ month }</option>);
        const createCountries = (countryArr) => countryArr.map(country => <option value={ country.name }>{ country.name } { country.code }</option>);
        console.log(this.state)
        if (formSubmitted) {
            return (
                <div className='back'>
                    <div className='thankYou'>
                        <h1>
                            Thank you for your application.
                        </h1>
                    </div>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className='backHeader'></div>
                    <div className='bottomBack'>
                    <div className='form'>
                    <h1>Mission to Mars Registration Form</h1>
                      
                      <form>  
                        <div className='question'>
                            What is your name?<small>*Required</small>
                            <div>
                            <input onChange={ this.handleTextChanges } type='text' placeholder='Name' name='name' value={ name }></input>
                            </div>
                        </div>
                        
                        <div className='question'>    
                            What is your date of birth?<small>*Required</small>
                            <div>
                            <select  onChange={ this.handleSelectChanges } name='month' value={ month }>
                                <option value='month'>Month</option>
                                { createMonths(allMonths) }
                            </select>
    
                            <select  onChange={ this.handleSelectChanges } name='day' value={ day }>
                                <option value='day'>Day</option>
                                { createDateOptions(1, 31, allDays) }
                            </select>    
    
                            <select  onChange={ this.handleSelectChanges } name='year' value={ year }>
                                <option value='year'>Year</option>
                                { createDateOptions(1900, 2019, allYears) }
                            </select>
                            </div>
                        </div>
    
                        <div className='question'>
                        What is your country of origin? <small>*Required</small>
                            <select  onChange={ this.handleSelectChanges } name='country' value={ country }>
                                <option value='country'>Country</option>
                                { createCountries(countries) }
                            </select>
                        </div>
    
                        <div className='question'>
                        What is your dietary preference? <small>*Required</small>
                            <div>
                            <select  onChange={ this.handleSelectChanges } name='diet' value={ diet }>
                                <option value='Diet'>Dietary Preference</option>
                                <option value='Omnivore'>Omnivore</option>
                                <option value='Vegetarian'>Vegetarian</option>
                                <option value='Vegan'>Vegan</option>
                                <option value='Carnivore'>Carnivore</option>
                            </select>
                            </div>
                        </div>

                        <div className='question'>
                            Can you breathe underwater longer than 1 minute? <small>*Required</small>
                            <div className='radio'>
                                Yes<input value='Yes' name='underWater' type='radio' checked={ underWater === 'Yes' } onChange={ this.handleRadioChanges }/>
                            </div>
                            <div className='radio'>
                                No<input value='No' name='underWater' type='radio' checked={ underWater === 'No' } onChange={ this.handleRadioChanges }/>
                            </div>
                            <div className='radio'>
                                I don't know<input value='I do not know' name='underWater' type='radio' checked={ underWater === 'I do not know' } onChange={ this.handleRadioChanges }/>
                            </div>
                        </div>

                        <div className='question'>
                            What is your marital status? <small>*Required</small>
                            <div className='radio'>
                                Married<input value='Married' name='marital' type='radio' checked={ marital === 'Married' } onChange={ this.handleRadioChanges }/>
                            </div>
                            <div className='radio'>
                                Single<input value='Single' name='marital' type='radio' checked={ marital === 'Single' } onChange={ this.handleRadioChanges }/>
                            </div>
                        </div>

                        <div className='question'>
                            When you are in a stressful or difficult situation, how do you most frequently react? <small>*Required</small>
                            <div className='radio'>
                                <b>Determination</b>: I continue to confront the situation.<input value='Determined' name='stressReaction' type='radio' checked={ stressReaction === 'Determined' } onChange={ this.handleRadioChanges }/>
                            </div>
                            <div className='radio'>
                                <b>Defeat</b>: I stop confronting the situation.<input value='Defeated' name='stressReaction' type='radio' checked={ stressReaction === 'Defeated' } onChange={ this.handleRadioChanges }/>
                            </div>
                            <div className='radio'>
                                <b>Anger</b>: I become upset at the situation.<input value='Angered' name='stressReaction' type='radio' checked={ stressReaction === 'Angered' } onChange={ this.handleRadioChanges }/>
                            </div>
                            <div className='radio'>
                                <b>Resourcefulness</b>: I seek help to confront the situation.<input value='Resourcefulness' name='stressReaction' type='radio' checked={ stressReaction === 'Resourcefulness' } onChange={ this.handleRadioChanges }/>    
                            </div>
                            <div className='radio'>
                                <b>Flatulence</b>: I spend 2 hours farting away stress.<input value='Flatulence' name='stressReaction' type='radio' checked={ stressReaction === 'Flatulence' } onChange={ this.handleRadioChanges }/>
                            </div>
                        </div>

                        <div className='question'>
                            Are you claustrophobic? <small>*Required</small>
                            <div className='radio'>
                                Yes<input value='Yes' name='claustrophobic' type='radio' checked={ claustrophobic === 'Yes' } onChange={ this.handleRadioChanges }/>
                            </div>
                            <div className='radio'>
                                No<input value='No' name='claustrophobic' type='radio' checked={ claustrophobic === 'No' } onChange={ this.handleRadioChanges }/>
                            </div>
                            <div className='radio'>
                                I don't know<input value='I do not know' name='claustrophobic' type='radio' checked={ claustrophobic === 'I do not know' } onChange={ this.handleRadioChanges }/>
                            </div>
                        </div>

                        <div className='question'>
                            Check all educational credentials you have received: <small>*Required</small>
                            <div className='checkbox'>
                                High school diploma or GED equivalent<input id='diploma' name='education' type='checkbox' checked={ education.diploma } onChange={ this.handleCheckboxChanges } />
                            </div>
                            <div className='checkbox'>
                                Associate's Degree<input id='associates' name='education' type='checkbox' checked={ education.associates } onChange={ this.handleCheckboxChanges } />
                            </div>
                            <div className='checkbox'>
                                Bachelor's Degree<input id='bachelors' name='education' type='checkbox' checked={ education.bachelors } onChange={ this.handleCheckboxChanges } />
                            </div>
                            <div className='checkbox'>
                                Master's Degree<input id='masters' name='education' type='checkbox' checked={ education.masters } onChange={ this.handleCheckboxChanges } />
                            </div>
                            <div className='checkbox'>
                                PhD<input id='phd' name='education' type='checkbox' checked={ education.phd } onChange={ this.handleCheckboxChanges } />
                            </div>
                            <div className='checkbox'>
                                Other<input id='other' name='education' placeholder='Other Education...' type='text' value={ education.other } onChange={ this.handleTextChanges } />
                            </div>
                        </div>
                        
                        <div className='question'>
                            Does your family have a history of : <p className='allThatApply'>(check all that apply)</p>
                            <div className='checkbox'>
                                Cancer<input id='cancer' name='familyHistory' type='checkbox' checked={ familyHistory.cancer } onChange={ this.handleCheckboxChanges } />
                            </div>
                            <div className='checkbox'>
                                Heart Disease<input id='heartDisease' name='familyHistory' type='checkbox' checked={ familyHistory.heartDisease } onChange={ this.handleCheckboxChanges } />
                            </div>
                            <div className='checkbox'>
                                Diabetes<input id='diabetes' name='familyHistory' type='checkbox' checked={ familyHistory.diabetes } onChange={ this.handleCheckboxChanges } />
                            </div>
                        </div>

                        <div className='question'>
                            Do you have any living, and how many? <p className='allThatApply'>(check all that apply)</p>
                            <div className='checkbox'>
                                Siblings<input id='siblings' name='family' type='checkbox' checked={ family.siblings } onChange={ this.handleCheckboxChanges } />
                                { renderFamilySelect(family.siblings , family.siblingCount,'siblingCount') }
                            </div>
                            <div className='checkbox'>
                                Parents<input id='parents' name='family' type='checkbox' checked={ family.parents } onChange={ this.handleCheckboxChanges } />
                                { renderFamilySelect(family.parents, family.parentCount, 'parentCount') }
                            </div>
                            <div className='checkbox'>
                                Grandparents<input id='grandparents' name='family' type='checkbox' checked={ family.gParents } onChange={ this.handleCheckboxChanges } />
                                { renderFamilySelect(family.grandparents, family.gParentCount, 'grandparentCount') }
                            </div>
                        </div>

    
                        <div className='question'>
                            Why do you want to be a Mars explorer? <small>*Required</small> 
                            <div>
                            <textarea onChange={ this.handleTextChanges } className='reason' type='text' placeholder='Reason to explore...' name='reason' value={ reason }></textarea>
                            </div>
                        </div>
                      <div className='button'>
                      </div>
                      <button onClick={ this.handleButton } id='confirm' type='button'>Confirm</button>
                      { renderConfirmation() }
                      </form>
                      </div>
                    </div>
                </React.Fragment>   
            )
        }
    }
}

export default Form;