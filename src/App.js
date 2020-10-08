import React from 'react';

import virus from './assets/images/virus-solid.svg'

import './App.css'

import Container from './components/Container'
import CardContainer from './components/Cards'
import Chart from './components/Charts'
import CountryPicker from './components/CountryPicker'
import Loading from './components/Loading'

import { fetchCountries, fetchData } from './services/api'
import { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: {},
      countries: [],
      loading: true,
    }
  }
  

  async componentDidMount() {
    const [{data: {countries}}, {data}] = await Promise.all([
      fetchCountries(),
      fetchData(),
    ])

    const countriesList = countries.map( country => country.name )
    
    this.setState({
      data,
      countries: countriesList,
      loading:false
    })
  }

render() {
    const { loading } = this.state
    
    if(loading){
      return <Loading />
    }

    const { countries, data } = this.state

    return (
      <Container>
        <header>
          <img src={virus} alt="Virus"/>
          <h1>Corona Tracker</h1>
        </header>
        <CardContainer data={data}/>
        <CountryPicker data={countries}/>
        <Chart/>
      </Container>
    )
  }
}

export default App;
