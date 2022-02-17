import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { submitArticles } from "../redux/actions"
import { RootState } from "../redux/store"
import Body from "./Body"
import Result from "./Result"

export default function App() {

    const articles = useSelector((state: RootState) => state.articles)
    const submit = useSelector((state: RootState) => state.submit)
    const dispatch = useDispatch()

    return (
        <>
            <header>My Wiki List</header>
            <section className="creator">
                <article>
                    <table>
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Body />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>{articles.length > 0 ? articles.length + " items" : "No items" }</td>
                            </tr>
                        </tfoot>
                    </table>
                    <footer>
                        <button onClick={() => dispatch(submitArticles())}>Submit</button>
                    </footer>
                </article>
            </section>
            <section className="result">
               {submit ? <Result /> : ''}
            </section>
        </>
    )
}