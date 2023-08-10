import { useEffect, useReducer, useState } from 'react';
import './App.css';

function App() {

  function reducer(state,action) {
    switch(action.type){
      case "addTodo": {
        return [...state,{text: action.text, completed: false}]
        
      }
      case "editTodo": {
        return state.map((i, idx) =>
            idx === action.idx ? { ...i, completed: !i.completed } : i
          )
        
      }
      case "deleteTodo": {
        return state.filter((i,idx)=> idx !== action.idx)
        
      }
      default: {
        return state;
      }
    }
  }

  const initalState = JSON.parse(localStorage.getItem('todo')) || [];
  const [todo, dispatch] = useReducer( reducer, initalState );

  const [text, setText] = useState();


  function addTodo(e) {
    e.preventDefault();
    dispatch({
      type: "addTodo",
      text
    })
    setText('')
  }

  function editTodo(idx) {
    dispatch({
      type: 'editTodo',
      idx,
    });
  }

  function deleteTodo(idx) {
    dispatch({
      type: 'deleteTodo',
      idx
    })
  }

  useEffect(()=> {
    localStorage.setItem('todo', JSON.stringify(todo));
  },[todo])

  // function reducer (state, action) {
  //   switch (action.type){
  //     case 'increment': {
  //       return state+1;
  //     }
  //     case 'decrement': {
  //       return state-1;
  //     }
  //     default:
  //       return state;
  //   }
  // }
 

  // const [count, dispatch] = useReducer( reducer, 0 );

  // function increment() {
  //   dispatch({type:'increment'})
  // }
  // function decrement() {
  //   dispatch({type:'decrement'})
  // }

  return (
    <div className="App">

      <form onSubmit={addTodo}>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
      </form>

      {todo.map((i,idx)=> (
        <p key={idx}
        style={{
          textDecoration: i.completed ? "line-through" : '',
          cursor: "pointer"
         }}
        onClick={() => editTodo(idx)}
        onDoubleClick={()=> deleteTodo(idx)}
        >
          {i.text}

        </p>
      ))}

      {/* <span>
        {JSON.stringify(todo ,null, 2)}
      </span> */}
      {/* {console.log(todo)} */}

      {/* <button onClick={increment}>Increment</button>
      <span>{count}</span>
      <button onClick={decrement}>Decrement</button> */}
    </div>
  );
}

export default App;
