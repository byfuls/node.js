import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';

let _renderMovies = (movies) => {
  return (
    (Array.from(movies)).map((movie, index) => {
      console.log(movie);
      return <Movie 
        title={movie.title_english}
        poster={movie.medium_cover_image}
        key={movies.id}
        genres={movie.genres} 
        synopsis={movie.synopsis}
      />
    })
  )
};


//  useEffect(() => {
//    fetch('https://yts.mx/api/v2/list_movies.json?quality=3D?sort_by=rating')
//    .then(response => response.json())
//    .then(json => console.log(json))
//    .catch(err => {
//
//    });
//  });

let _callApi = () => {
    return (fetch('https://yts.mx/api/v2/list_movies.json?quality=3D?sort_by=rating')
      .then(response => response.json())
      .then(json => json.data.movies)
      .catch(err => {
      })
    )
};

let _getMovies = async (setMovies) => {
  const movies = await _callApi();
  console.log(movies);
  setMovies(movies);
};

function App() {
  const [movies, setMovies] = useState({});

  console.log(movies);

  useEffect(() => {
    _getMovies(setMovies);
  });

  console.log(movies);
  return (
    <div className={movies? "App" : "App-loading"}>
      {movies? _renderMovies(movies) : 'Loading'}
    </div>
  );
}

export default App;
