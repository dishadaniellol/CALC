import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import './calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleButtonClick = (buttonName) => {
    if (buttonName >= '0' && buttonName <= '9') {
      handleNumber(buttonName);
    } else {
      handleOperator(buttonName);
    }
  };

  const handleNumber = (number) => {
    if (waitingForSecondOperand) {
      setDisplayValue(number);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? number : displayValue + number);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const newValue = performCalculation[operator](currentValue, inputValue);
      setDisplayValue(String(newValue));
      setFirstOperand(newValue);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="button-row">
        <Button name="7" onClick={() => handleButtonClick('7')} />
        <Button name="8" onClick={() => handleButtonClick('8')} />
        <Button name="9" onClick={() => handleButtonClick('9')} />
        <Button name="/" onClick={() => handleButtonClick('/')} />
      </div>
      <div className="button-row">
        <Button name="4" onClick={() => handleButtonClick('4')} />
        <Button name="5" onClick={() => handleButtonClick('5')} />
        <Button name="6" onClick={() => handleButtonClick('6')} />
        <Button name="*" onClick={() => handleButtonClick('*')} />
      </div>
      <div className="button-row">
        <Button name="1" onClick={() => handleButtonClick('1')} />
        <Button name="2" onClick={() => handleButtonClick('2')} />
        <Button name="3" onClick={() => handleButtonClick('3')} />
        <Button name="-" onClick={() => handleButtonClick('-')} />
      </div>
      <div className="button-row">
        <Button name="0" onClick={() => handleButtonClick('0')} />
        <Button name="C" onClick={clearDisplay} />
        <Button name="=" onClick={() => handleButtonClick('=')} />
        <Button name="+" onClick={() => handleButtonClick('+')} />
      </div>
    </div>
  );
};

export default Calculator;
