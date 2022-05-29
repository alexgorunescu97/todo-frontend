import './Counter.css';
import React, {useState} from 'react';
import CounterButton from './CounterButton';

function Counter() {

  const [count, setCount] = useState(0);

  function updateCount(amount) {
    setCount(count + amount);
  }

  function resetCount() {
    setCount(0);
}

  return (
    <div className="counter">
      <div className='button-container'>
        <CounterButton updateCount={updateCount}/>
        <CounterButton amount={-1} updateCount={updateCount}/>
        <CounterButton amount={5} updateCount={updateCount}/>
        <CounterButton amount={-5} updateCount={updateCount}/>
        <CounterButton amount={10} updateCount={updateCount}/>
        <CounterButton amount={-10} updateCount={updateCount}/>
      </div>

      <button className="reset-button" onClick={resetCount}>Reset</button>
      <span className="count">{count}</span>
    </div>
  );
}

export default Counter;
