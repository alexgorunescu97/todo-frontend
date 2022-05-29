import './CounterButton.css';

function CounterButton({amount = 1, updateCount}) {

    function handleClick() {
        updateCount(amount);
    }

    return (
        <div>
            <button onClick={handleClick}>{amount > 0 ? '+' + amount : amount}</button>
        </div>
    )
}

export default CounterButton;