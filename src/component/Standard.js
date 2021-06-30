import React, { useState } from 'react';
import '../css/Standard.scss';

function Standard() {

    const [inputscrean, setInputscrean] = useState('');
    const [fontsize, setFontsize] = useState('2.5');
    const [resultDisplayed, setResultDisplayed] = useState(false);

    const clickNumber = (str) => {
        var currentString = inputscrean;
        var lastChar = currentString[currentString.length - 1];

        if (resultDisplayed === false) {
            setInputscrean(inputscrean+str);
        } else if (
            (resultDisplayed === true && lastChar === "+") ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/"
        ) {
            setResultDisplayed(false);
            setInputscrean(inputscrean+str);
        } else {
            setResultDisplayed(false);
            setInputscrean(str);
        }

        if (document.getElementById("input").scrollWidth > document.getElementById("input").offsetWidth) {
            setFontsize(Number(fontsize) - 0.15);
        }
        

    }

    const inputSign = (str) => {
        var currentString = inputscrean;
        var lastChar = currentString[currentString.length - 1];

        if (
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "*" ||
            lastChar === "/"
        ) {
            var newString = currentString.substring(0, currentString.length - 1) + str;
            setInputscrean(newString)
        } else if (currentString.length === 0) {
            console.log("enter a number first");
        } else {
            setInputscrean(inputscrean + str);
        }

        if (document.getElementById("input").scrollWidth > document.getElementById("input").offsetWidth) {
            setFontsize(Number(fontsize) - 0.15);
        }
    }

    const clearButton = () => {
        setInputscrean('');
        setFontsize('2.5');
    };

    const handlerResult = () => {
            var inputString = inputscrean;
            console.log(inputString);
            var lastChar = inputString[inputString.length - 1];
            var resultvalue = 0;
            if (
                lastChar === "+" ||
                lastChar === "-" ||
                lastChar === "*" ||
                lastChar === "/"
            ) {
                resultvalue = calculate(inputString.substring(0, inputString.length - 1));
                setInputscrean(resultvalue);
            }else{
                resultvalue = calculate(inputString);
                setInputscrean(resultvalue);
            }

            setResultDisplayed(true);

    }


    const calculate = (input) => {
        var pos; 
        console.log(input);
		pos = input.indexOf('+'); 
		if (pos !== -1) { 
			return Number(calculate(input.substring(0, pos))) + Number(calculate(input.substring(pos + 1)));
		} else {
			pos = input.indexOf('-');
			if (pos !== -1) {

				return Number(calculate(input.substring(0, pos))) - Number(calculate(input.substring(pos + 1)));
			} else {
				pos = input.indexOf('*');
				if (pos !== -1) {

					return Number(calculate(input.substring(0, pos))) * Number(calculate(input.substring(pos + 1)));
				} else {
					pos = input.indexOf('/');
					if (pos !== -1) {

						return Number(calculate(input.substring(0, pos))) / Number(calculate(input.substring(pos + 1)));
					}
				}
			}
		}

		var r = input.trim(); 
		if (r == null || r === '') 
			return 0;
		return r; 

    }

    return (
        <div className="standardContainer">
            <div className="calculator">
                <div className="input" id="input" style={{ fontSize:  fontsize  + 'em', lineHeight:  fontsize  * 16 + 'pt' }}>{inputscrean}</div>
                <div className="buttons">
                    <div className="operators">
                        <div onClick={()=>{inputSign('+')}}>+</div>
                        <div onClick={()=>{inputSign('-')}}>-</div>
                        <div onClick={()=>{inputSign('*')}}>&times;</div>
                        <div onClick={()=>{inputSign('/')}}>&divide;</div>
                    </div>
                    <div className="leftPanel">
                        <div className="numbers">
                            <div onClick={() => { clickNumber('7') }}>7</div>
                            <div onClick={() => { clickNumber('8') }}>8</div>
                            <div onClick={() => { clickNumber('9') }}>9</div>
                        </div>
                        <div className="numbers">
                            <div onClick={() => { clickNumber('4') }}>4</div>
                            <div onClick={() => { clickNumber('5') }}>5</div>
                            <div onClick={() => { clickNumber('6') }}>6</div>
                        </div>
                        <div className="numbers">
                            <div onClick={() => { clickNumber('1') }}>1</div>
                            <div onClick={() => { clickNumber('2') }}>2</div>
                            <div onClick={() => { clickNumber('3') }}>3</div>
                        </div>
                        <div className="numbers">
                            <div onClick={() => { clickNumber('0') }}>0</div>
                            <div onClick={() => { clickNumber('.') }}>.</div>
                            <div id="clear" onClick={clearButton}>C</div>
                        </div>
                    </div>
                    <div className="equal" id="result" onClick={handlerResult}>=</div>
                </div>
            </div>
        </div>
    )
}

export default Standard;