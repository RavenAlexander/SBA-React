import React, { useState, useEffect, useReducer } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import Pagination from './components/Pagination';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import Carousel from 'react-bootstrap/Carousel'; 

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
   case 'decrement':
  return {count: state.count - 1}
  default:
    return state 
  }
} //reducer code for the counter functionality

function App() {
  const [state, dispatch] = useReducer(reducer, {count: 0 })

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  function increment() {
    dispatch({type: 'increment'})
  }

  function decrement() {
    dispatch({type: 'decrement'})
  }


  useEffect(() => {
      setLoading(true)
      let cancel
      axios.get(currentPageUrl, { //sends a GET request 
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
      })

        return () => {
          cancel()
        } //cleanup function that clears request every time you make a new one

  }, [currentPageUrl]) 

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

    if (loading) return 'Loading...'
  return (
    <>
    <div className='caroContainer'>
    <div style={{ display: 'block', width: 600, padding: 30}}> 
      
      <Carousel> 
        <Carousel.Item interval={1500}> 
          <img 
            className='d-block w-100'
src='https://lorempokemon.fakerapi.it/pokemon'
            alt='Image One'
          /> 
        </Carousel.Item> 
        <Carousel.Item interval={500}> 
          <img 
            className='d-block w-100'
src='https://lorempokemon.fakerapi.it/pokemon/200/1234'
            alt='Image Two'
          /> 
        </Carousel.Item> 
        <Carousel.Item interval={500}> 
          <img 
            className='d-block w-100'
src='https://lorempokemon.fakerapi.it/pokemon/200/1235'
            alt='Image Three'
          /> 
        </Carousel.Item> 
        <Carousel.Item interval={500}> 
          <img 
            className='d-block w-100'
src='https://lorempokemon.fakerapi.it/pokemon/200/1236'
            alt='Image Four'
          /> 
        </Carousel.Item> 
        <Carousel.Item interval={500}> 
          <img 
            className='d-block w-100'
src='https://lorempokemon.fakerapi.it/pokemon/200/1237'
            alt='Image Five'
          /> 
        </Carousel.Item> 
      </Carousel> 
    </div> 
    </div>
  <div className='counter'>
    <h4>How many Pokemon have you spotted on this page?</h4>
    <button onClick={decrement}>-</button>
    <span> {state.count} </span>
    <button onClick={increment}>+</button>
    </div>
    <div className='plist'>
      <h2>List of Pokemon: </h2>
     <PokemonList pokemon={pokemon} />
     <img src='../img/pikachu.gif' width='100' height='100' className='pikachu'/>
     <Pagination 
     gotoNextPage={nextPageUrl ? gotoNextPage : null} //if next page exists, go to next page, otherwise return null
     gotoPrevPage={prevPageUrl ? gotoPrevPage : null}/> 
     </div>
     <div className='footer'>
      <hr />
      © Raven Alexander
     </div>
    </>
  )
  
}

export default App
