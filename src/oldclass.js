import React from "react";
import "./App.css";

function ImageSearchPresentation({ loading, query, setInput, images = [] }) {
  return (
    <>
      <h1>search for stuff {loading && "..loading.."}</h1>
      <input
        style={{
          fontSize: "40px"
        }}
        value={query}
        onChange={setInput}
      />
      <hr />
      {images.map(img => (
        <img key={img.id} src={img.thumbnail} />
      ))}
    </>
  );
}

class ProvideImageSearch extends React.Component {
  state = {
    loading: false,
    images: [],
    query: "owl"
  };

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    this.setState({ loading: true });

    fetch(
      `https://www.reddit.com/r/aww/search.json?q=${
        this.state.query
      }&restrict_sr=1`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          images: json.data.children.map(child => child.data),
          loading: false
        });
      });
  }

  setInput = event => {
    this.setState({ query: event.target.value }, this.fetchImages);
  };

  render() {
    // THE OLDEN WAY
    // return (
    //   React.Children.map(this.props.children,
    //     child => React.cloneElement(child, {
    //       images: this.state.images,
    //       query: this.state.query,
    //       setInput: this.setInput,
    //       loading: this.state.loading
    //     }))
    // );

    return this.props.children({
      images: this.state.images,
      query: this.state.query,
      setInput: this.setInput,
      loading: this.state.loading
    });
  }
}

function App() {
  return (
    <>
      <ProvideImageSearch>
        {values => <ImageSearchPresentation {...values} />}
      </ProvideImageSearch>
    </>
  );
}

export default App;
