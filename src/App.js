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
    [0, ",", "="],
]

export default function App(){

    let [calc , setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    })

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
                            onClick={
                                btn === "C" ? resetClickHandler
                                : btn === "+-" ? invertClickHandler
                                : btn === "%"  ? percentClickHandler
                                : btn === "=" ? equalsClickHandler
                                : btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signClickHandler
                                : btn === "," ? commaClickHandler
                                : numClickHandler
                            }
                        />    
                    )
                }
            </Buttonbox>
        </Wrapper>
    )
}