import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Result() {
    const articles = useSelector((state: RootState) => state.articles)

    const titles: JSX.Element[] = []

    Object.keys(articles).forEach((key) => {
        titles.push(
            <article key={articles[key].key}>
                <h1>{articles[key].title}</h1>
                <p>{articles[key].extract}</p>
                <a target="_blank" href={articles[key].fullurl}>{articles[key].fullurl}</a>
            </article>);
    })

    return (
        <>
            {titles}
        </>
    )
}