export const fetchAutocomplete = async (text : string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&uselang=user&prop=extracts%7Cpageprops%7Cinfo&generator=prefixsearch&redirects=1&exsentences=1&exintro=1&explaintext=1&inprop=url&gpssearch=${text}`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "No results" };
    }
  };