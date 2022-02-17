import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Input from "./Input";
import { v4 as uuidv4 } from 'uuid';

export default function Body() {

    const articles = useSelector((state: RootState) => state.articles)
    let arr : JSX.Element[] = []

    articles.forEach((e) =>{
        arr.push(<Input key={e.key} desc={e.desc} value={e.title} id={e.key}/>)
    })
    arr.push(<Input key={uuidv4()} id={uuidv4()}/>)
        
        
    return (
        <>
            {arr}
        </>
    )
}