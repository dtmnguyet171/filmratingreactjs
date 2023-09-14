import React, { useState, useEffect } from "react";
import { CalendarOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Pagination, Modal } from "antd";
import axios, { isCancel, AxiosError } from "axios";
import { Card, List } from "antd";

const Home = () => {
  const [data, setData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    listFilm();
  }, []);

  const listFilm = () => {
    const data = axios
      .get("http://localhost:8080/api/v1/film/get-all")
      .then((res) => {
        console.log("res", res);
        setData(res.data);
      })
      .catch((err) => console.log(err));

    return () => data;
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <p className="hero-subtitle">FilmRating</p>

            <h1 className="h1 hero-title">
              Where To <strong>Rate & Review</strong> Films.
            </h1>

            <div className="meta-wrapper">
              <div className="ganre-wrapper">
                <a href="#">Romance,</a>

                <a href="#">Drama</a>
              </div>

              <div className="date-time">
                <div>
                  <CalendarOutlined />

                  <time>2022</time>
                </div>
              </div>
            </div>

            <Button>
              <h4>
                <StarOutlined />
                Rate Now
              </h4>
            </Button>
          </div>
        </div>
      </section>

      <section className="upcoming">
        <div className="container">
          <p className="section-subtitle">Rating & Review</p>
          <h2 className="h2 section-title">Film List</h2>
          <ul className="filter-list">
            <li>
              <div className="dropdown">
                <Button>Genre</Button>
                <div className="dropdown-content">
                  <a href="">All</a>
                  <a href="">Action</a>
                  <a href="">Adventure</a>
                  <a href="">Comedy</a>
                  <a href="">Drama</a>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown">
                <Button>Tittle</Button>
                <div className="dropdown-content">
                  <a href="">A to Z</a>
                  <a href="">Z to A</a>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown">
                <Button>Rating</Button>
                <div className="dropdown-content">
                  <a href="">Lowest to Highest</a>
                  <a href="">Highest to Lowest</a>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown">
                <Button>Year</Button>
                <div className="dropdown-content">
                  <a href="">Newest to Oldest</a>
                  <a href="">Oldest to Newest</a>
                </div>
              </div>
            </li>
          </ul>
          <br></br>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 4,
              xl: 4,
              xxl: 6,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <div className="movie-card">
                  <figure className="card-banner">
                    <img src={item.image} alt="The Northman movie poster" />
                  </figure>

                  <div className="title-wrapper">
                    <a href="#">
                      <h3 className="card-title">{item.title}</h3>
                    </a>
                    <time dateTime="2022">{item.year}</time>
                  </div>
                  <div className="card-meta">
                    <div className="badge badge-outline">HD</div>
                    <div className="duration">
                      <time dateTime="PT137M">137 min</time>
                    </div>
                    <div className="rating">
                      <data>{item.rating}</data>
                    </div>
                  </div>
                  {localStorage.getItem("role") == "ADMIN" ? (<><Button  onClick={() => setOpenEdit(true)}>Edit</Button>
                  <Button>Edit</Button></>):("")}
                  
                </div>
              </List.Item>
            )}
          ></List>
        </div>
        <div className="pagination">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </section>
      <Modal
        title="Modal 1000px width"
        centered
        open={openEdit}
        onOk={() => setOpenEdit(false)}
        onCancel={() => setOpenEdit(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default Home;
