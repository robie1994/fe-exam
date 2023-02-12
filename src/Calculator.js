import { useState, useEffect } from 'react';
import './assets/style.css';

const Calculator = () => {
  const [previousValue, setPreviousValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [screenValue, setScreenValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  useEffect(() => {
    setScreenValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    setScreenValue("0");
  }, []);

  const inputNumbers = (e) => {
    if (currentValue.includes(".") && e === ".") return null;
    if (total) setPreviousValue("");
    currentValue ? setCurrentValue((previous) => previous + e.toString()) : setCurrentValue(e.toString());
    setTotal(false);
  };

  const inputOperator = (e) => {
    setTotal(false);
    setOperator(e);
    if (currentValue === "") return;
    if (previousValue !== "") {
      calculateTotal();
    } else {
      setPreviousValue(currentValue);
      setCurrentValue("");
    }
  };

  const calculateTotal = (e) => {
    if (e === "=") {
      setTotal(true);
    }

    let calculate;
    switch (operator) {
      case "/":
        calculate = String(parseFloat(previousValue) / parseFloat(currentValue));
        break;

      case "+":
        calculate = String(parseFloat(previousValue) + parseFloat(currentValue));
        break;
      case "×":
        calculate = String(parseFloat(previousValue) * parseFloat(currentValue));
        break;
      case "-":
        calculate = String(parseFloat(previousValue) - parseFloat(currentValue));
        break;
      default:
        return;
    }
    setScreenValue("");
    setPreviousValue(calculate);
    setCurrentValue("");
  };

  const toggleNegative = () => {
    if (currentValue.charAt(0) === "-") {
      setCurrentValue(currentValue.substring(1));
    } else {
      setCurrentValue("-" + currentValue);
    }
  };

  const togglePercent = () => {
    previousValue ? setCurrentValue(String((parseFloat(currentValue) / 100) * previousValue)) : setCurrentValue(String(parseFloat(currentValue) / 100));
  };

  const clearAll = () => {
    setPreviousValue("");
    setCurrentValue("");
    setScreenValue("0");
  };

  const calcMainButtons = [7, 8, 9, '×', 4, 5, 6, '+', 1, 2, 3, '-', '.', 0, '⌫', '=']
  const operatorButtons = ['×', '+', '-', '=']

  const handleMainButtons = (value) => {
    if (operatorButtons.includes(value) && value !== '=') {
      inputOperator(value); //operators function
    }
    else {
      if (value === '=') {
        calculateTotal(value); //calculateTotal function
      }
      else if (value === '⌫') {
        setCurrentValue(currentValue.substring(0,currentValue.length - 1)) 
      }
      else {
        inputNumbers(value); //input number function
      }
    }
  }
  return (
    <div className="calculator">
      { //Calculator Result Field
        screenValue !== "" || screenValue === "0" ?
          (<input type="text" className="calculator-screen" value={screenValue === 'NaN' ? 'Error' : screenValue} />) :
          (<input type="text" className="calculator-screen" value={previousValue === 'NaN' ? 'Error' : previousValue} />)
      } 
      <div className="calculator-keys">
        <button type="button" onClick={() => clearAll()} className="top-btn" defaultValue="all-clear">C</button>
        <button type="button" onClick={() => toggleNegative()} className="top-btn">±</button>
        <button type="button" onClick={() => togglePercent()} className="top-btn">%</button>
        <button type="button" onClick={(e) => inputOperator(e.target.value)} className="operator" value="/">&divide;</button>

        {calcMainButtons.map(button => (
          <button key={button} type="button" className={operatorButtons.includes(button) ? 'operator' : null} defaultValue={button}
          onClick={() => handleMainButtons(button)}
          >{button}</button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;