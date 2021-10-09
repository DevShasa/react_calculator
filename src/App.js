import React, { useState } from "react";
import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import Buttonbox from "./components/ButtonBox/Buttonbox";
import Button from "./components/Button/Button";

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
]

//Take a number and convert it into a string with spaces 
const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

// Remove spaces so number can be converted from str to int 
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

export default function App(){

    let [calc , setCalc] = useState({ sign: "", num: 0, res: 0 })

    const numClickHandler = (e) =>{
        e.preventDefault();
        const value = e.target.innerHTML;

        if(removeSpaces(calc.num).length < 16){
            setCalc({
                ...calc,
                num: calc.num === 0 && value === "0" ? "0" //check if it is a zero
                    :removeSpaces(calc.num) % 1 === 0 ? toLocaleString(Number(removeSpaces(calc.num + value))) // check if it is a whole number 
                    :toLocaleString(calc.num +value), //if not divisible by one means it has a decimal
                res: calc.sign ? calc.res : 0, // if there is no sign, reset res to 0
            });
        }
    };

    const commaClickHandler = (e) =>{
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            // if there is a . ignore the press, if there is not add the . to the number
            num: calc.num.toString().includes(".") ? calc.num : calc.num + value
        })
    }

    const signClickHandler = (e) =>{
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value, // Assign the value to the sign
            res: calc.res && calc.num ? calc.res : calc.num, //move num to res if res is empty else nothing changes 
            num : 0, // reset num
        })
    }

    const equalsClickHandler = () =>{
        if(calc.sign && calc.num){
            const math =  (a,b,sign) =>
                sign === "+" ? a + b
                : sign === "-" ? a-b
                : sign === "X" ? a *b
                :a/b
        
            setCalc({
                ...calc,
                res: calc.num === "0" && calc.sign === "/" ? "Cant divide with 0"
                    : toLocaleString(
                        math(
                            Number(removeSpaces(calc.res)), 
                            Number(removeSpaces(calc.num)), 
                            calc.sign)
                    ),
                sign: "",
                num: 0 
            });
        }
    };

    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
    };


    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
        
            setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
            });
    };

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return(
        <Wrapper>
            <Screen value={calc.num ? calc.num : calc.res} />
            <Buttonbox>
                {
                    btnValues.flat().map((btn, i)=>
                        <Button 
                            key={i}
                            className={btn === "=" ? "equals" : ""}
                            value = {btn}
                            onClick={ //()=>{console.log(`${btn}`)}
                                btn === "C" ? resetClickHandler
                                : btn === "+-" ? invertClickHandler
                                : btn === "%"  ? percentClickHandler
                                : btn === "=" ? equalsClickHandler
                                : btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signClickHandler
                                : btn === "." ? commaClickHandler
                                : numClickHandler
                            }
                        />    
                    )
                }
            </Buttonbox>
        </Wrapper>
    )
}
