import { Link } from "react-router-dom";
import ReadMoreButton from "../../ui/read-more-button/read-more-button";
import { getPosterSrc } from "../../../utils/constants";
import VideoModal from "../../video-modal/video-modal";
import { useState } from "react";
import "./film-card.css";

function FilmCard({ film, className="", type="" }) {
  const [ isClicked, setIsClicked ] = useState( false );

  // Handle poster clicked
  const handlePosterClicked = ()  => {
      setIsClicked( true );
  };

  return (
    <div className={`${className} mb-4`} key={film.id}>
        <div className="card h-100">
            <div className="img-container" onClick={ () => handlePosterClicked() }>
                <img
                    src= {getPosterSrc(film.poster_path)}
                    className={`card-img-top ${film.poster_path ? "poster-img" : ""}`}
                    alt={film.title}
                  />
                { film.poster_path && (
                  <div className="play-icon">
                    <i className="fa-regular fa-circle-play"></i>
                  </div>
                )}
                  
            </div>
            <div className="card-body d-flex flex-column justify-content-between ">
                <h5 className="card-title">{film.title}</h5>
                { type !== "tv" && 
                  <p className="card-text">
                  { film.overview.length > 100
                      ? film.overview.substring(0, 100) + "..."
                      : film.overview}
                  </p>
                }
                <Link to={`/${type === "tv" ? "tv" : "film"}/${film.id}`} >
                    <ReadMoreButton text= {"Read More"} />
                </Link>
            </div>
            { isClicked  && <VideoModal type = {type} id={ film.id } />}
        </div>
    </div>
  )
}

export default FilmCard;