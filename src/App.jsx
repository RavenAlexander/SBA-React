import React, { useState, useEffect, useReducer } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
   case 'decrement':
  return {count: state.count - 1}
  default:
    return state 
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {count: 0 })
  const [count, setCount] = useState(0);

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
      axios.get(currentPageUrl, {
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

    if (loading) return "Loading..."
  return (
    <>
    
    <button onClick={decrement}>-</button>
    <span>{state.count}</span>
    <button onClick={increment}>+</button>

     <PokemonList pokemon={pokemon} />
     <Pagination 
     gotoNextPage={nextPageUrl ? gotoNextPage : null} //if next page exists, go to next page, otherwise return null
     gotoPrevPage={prevPageUrl ? gotoPrevPage : null}/> 
    </>
  )
  
}

export default App
