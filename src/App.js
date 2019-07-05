import React, { useState, useEffect } from "react";
import "./App.css";

function useImageSearch() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("owl");

  const fetchImages = () => {
    setLoading(true);

    fetch(`https://www.reddit.com/r/aww/search.json?q=${query}&restrict_sr=1`)
      .then(response => response.json())
      .then(json => {
        setImages(json.data.children.map(child => child.data));
        setLoading(false);
      });
  };

  useEffect(fetchImages, [query]);

  return {
    images,
    query,
    setQuery,
    loading
  };
}

function App() {
  let values = useImageSearch();

  return (
    <>
      <h1>search for stuff {values.loading && "..loading.."}</h1>
      <input
        style={{
          fontSize: "40px"
        }}
        value={values.query}
        onChange={event => values.setQuery(event.target.value)}
      />
      <hr />
      {values.images.map(img => (
        <img key={img.id} src={img.thumbnail} />
      ))}
    </>
  )
}

export default App;
