import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addArticle, removeArticle, unsubmitArticles } from "../redux/actions";
import { RootState } from "../redux/store";
import { fetchAutocomplete } from "./functions/fetch";

type prop = {
    value?: string,
    id?: string,
    desc?: string
}

export default function Input(props: prop) {

    const [input, setInput] = useState('')
    const [autocompleteSearch, setAutocompleteSearch] = useState<string[]>([])
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch()
    const articles = useSelector((state: RootState) => state.articles)
    const mountedRef = useRef(true);

    const titles: string[] = []

    Object.keys(articles).forEach((key) => { titles.push(articles[key].title); })

    useEffect(() => {
        if (props.value && props.desc) {
            setInput(props.value)
            setDesc(props.desc)
        }
        return () => {
            mountedRef.current = false;
          };
    }, [])

    let options: string[] = []



    async function updateInput(e: { target: { value: string; }; }) {
        if (!mountedRef.current) return null;

        setInput(e.target.value);

        if (!e.target.value) {
            setDesc('')
            return
        }

        setDesc("INVALID")

        
        const res = await fetchAutocomplete(e.target.value)
        res.query.pages && mountedRef.current &&
            Object.keys(res.query.pages).forEach((key) => {
                let pages = res.query.pages[key]
                if (!titles.includes(pages.title)) {
                    options.push(pages.title)

                    if (e.target.value === pages.title) {
                        if (pages.pageprops["wikibase-shortdesc"]) {
                            setDesc(pages.pageprops["wikibase-shortdesc"])
                            pages.desc = pages.pageprops["wikibase-shortdesc"]
                            pages.key = props.id
                        } else {
                            setDesc(pages.extract)
                            pages.desc = pages.extract
                            pages.key = props.id
                        }
                        dispatch(addArticle(pages))
                        dispatch(unsubmitArticles())
                    }
                }


            })
        options.sort()
        mountedRef.current && 
            setAutocompleteSearch(options)
    }

    return (
        <>
            <tr>
                <td>
                    <input
                        disabled={(props.value) ? true : false}
                        type="text"
                        list={`LIST-${props.id}`}
                        onChange={updateInput}
                        value={input}
                        pattern={autocompleteSearch.join("|")}
                        autoComplete="off"
                    />
                    <datalist id={`LIST-${props.id}`}>
                        {autocompleteSearch.map((title, i) => (
                            <option key={i}>{title}</option>
                        ))}
                    </datalist>
                </td>
                <td><input className="desc" type="text" disabled value={desc} /></td>
                <td><button onClick={() => { dispatch(removeArticle(input)) }}>Delete</button></td>
            </tr>
        </>
    )
}