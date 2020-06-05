import React, { Component } from 'react';
import './Movie.css';
import LinesEllipsis from 'react-lines-ellipsis'

/*
    * life cycle
    [Render]
    1. componentWillMount()
    2. render()
    3. componentDidMount()

    [Update]
    1. componentWillReceiveProps()
    2. shouldComponentUpdate() // true
    3. componentWillUpdate() // update icon O
    4. render()
    5. componentDidUpdate()
*/

function Movie(props){
    console.log(props);

    // when you use class (+ yarn add prop-types)
    //static propTypes = {
    //    title: React.propTypes.string,
    //    poster: React.propTypes.string
    //}

    return (
        <div className="Movie">
            <div className="Movie_Columns">
                <MoviePoster poster={props.poster} alt={props.title} />
            </div>
            <div className="Movie_Columns">
                <h1>{props.title}</h1>
                <div className="Movie_Genres">
                    {props.genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
                </div>
                <p className="Movie_Synpsis">
                    <LinesEllipsis
                        text={props.synopsis}
                        maxLine='3'
                        ellipsis="..."
                        trimRight
                        basedOn='letters'
                    />
                </p>
            </div>
        </div>
    );
}

//Movie.propTypes ={
//    title: PropTypes.string.isRequired,
//    poster: PropTypes.string.isRequired,
//    genres: PropTypes.array.isRequired,
//    synopsis: PropTypes.string.isRequired
//};

function MoviePoster(props){
    return(
        <img src={props.poster} alt={props.alt} title={props.alt} className="Movie_Poster"></img>
    )
}

function MovieGenre(props){
    return (
        <span className="Movie_Genre">{props.genre}</span>
    )
}

//class MoviePoster extends React.Component{
//    render(){
//        //console.log(this.props.title);
//        return(
//            <img src="https://m.media-amazon.com/images/M/MV5BMTM0NjQ4OTgyNV5BMl5BanBnXkFtZTcwOTU2MzQ4Nw@@._V1_CR0,60,640,360_AL_UX477_CR0,0,477,268_AL_.jpg"></img>
//        )
//    }
//}

export default Movie