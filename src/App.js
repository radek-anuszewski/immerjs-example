import React, {useReducer, useState} from 'react';
import produce from 'immer'
import {useDispatch, useSelector} from "react-redux";

const initialState = {
  submitCount: 0
}

const reducer = produce((state, action) => {
  switch (action.type) {
    case 'update': {
      state.submitCount +=1
      break
    }
    default: {
      break
    }
  }
}, initialState)


function App() {
  const [state, setState] = useState({name: '', breed: '', age: ''})
  const [appState, localDispatch] = useReducer(reducer, initialState)
  const values = useSelector(state => state.values.list)
  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()
    localDispatch({type: 'update'})
    alert(JSON.stringify(state))
    dispatch({
      type: 'ADD',
      payload: state,
    })
    setState({name: '', breed: '', age: ''})
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>Submit count: {appState.submitCount}</p>
        <input
          placeholder="Name"
          value={state.name}
          onChange={e => {
            const name = e.target.value;
            setState(produce(state => {
              state.name = name
            }));
          }}
        />
        <br />
        <input
          placeholder="Age"
          value={state.age}
          onChange={e => {
            const age = e.target.value;
            setState(produce(state => {
              state.age = age
            }));
          }}
        />
        <br />
        <input
          placeholder="Breed"
          value={state.breed}
          onChange={e => {
            const breed = e.target.value;
            setState(produce(state => {
              state.breed = breed
            }));
          }}
        />
        <br />
        <button type="submit">
          Submit
        </button>
      </form>
      Currently submitted values
      <div>
        {values.map(el => (
          <>
            <button onClick={() => setState(el)}>
              Select
            </button>
            <pre>
              {JSON.stringify(el)}
            </pre>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
