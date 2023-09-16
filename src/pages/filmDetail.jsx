import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function FilmDetailComponent() {
  const [film, setFilm] = useState();
  const paramUrl = useParams("id");
  useEffect(() => {
    // call api get lay ra chi tiet cua item user data
    if (paramUrl?.id) {
      axios
        .get(`http://localhost:8080/api/v1/film/get-by-id?id=${paramUrl.id}`)
        .then((res) => {
          setFilm(res.data);
        });
    }
  }, []);
  return (
    <>
      <section className="movie-detail">
       
          <img src={film.image} alt="Free guy movie poster" />

            <ion-icon name="play-circle-outline"></ion-icon>
     
        <div class="movie-detail-content">
          <p class="detail-subtitle">Title</p>

          <h1 class="h1 detail-title">{film.title}</h1>

          <div class="meta-wrapper">
            <div class="badge-wrapper">
              <div class="badge badge-fill">PG 13</div>

              <div class="badge badge-outline">HD</div>
            </div>

            <div class="ganre-wrapper">
              <a href="#">{film.genre}</a>
            </div>

            <div class="date-time">
              <div>
                <ion-icon name="calendar-outline"></ion-icon>

                <time datetime="2021">{film.year}</time>
              </div>

              <div>
                <ion-icon name="star-outline"></ion-icon>

                <time datetime="PT115M">{film.rating}</time>
              </div>
            </div>
          </div>

          <p class="storyline">{film.description}</p>

       
        </div>
      </section>
    </>
  );
}
