export const removeArticle = (title: string) => {
  return {
    type: "REMOVE_ARTICLE",
    payload: title,
  };
};

export const addArticle = (title: string) => {
  return {
    type: "ADD_ARTICLE",
    payload: title,
  };
};

export const submitArticles = () => {
  return {
    type: "SUBMIT"
  }
}

export const unsubmitArticles = () => {
  return {
    type: "UNSUBMIT"
  }
}
