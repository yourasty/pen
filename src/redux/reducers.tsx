type State = {
    title: string,
    extract: string,
    fullurl: string,
    desc: string,
    key: string
}


export const articles = (state: State[] = [], action: { type: string; payload: any; }) => {
    switch (action.type) {
        case "ADD_ARTICLE": {
            state.push({
                title: action.payload.title,
                extract: action.payload.extract,
                fullurl: action.payload.fullurl,
                desc: action.payload.desc,
                key: action.payload.key
            })
            let newState = state.map((e) => e)
            return newState
        }
        case "REMOVE_ARTICLE": {
            return state.filter((value) => value.title !== action.payload)
        }
        default: {
            return state;
        }
    }
}

export const submit = (state = false, action: { type: string }) => {
    switch (action.type) {
        case "SUBMIT": {
            return true
        }
        case "UNSUBMIT": {
            return false
        }
        default: {
            return state;
        }
    }
}
