import React, { useState, useEffect, useRef } from "react";
import { CalendarOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Pagination, Modal } from "antd";
import axios, { isCancel, AxiosError } from "axios";
import { Card, List } from "antd";
import { useNavigate, NavLink } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    listFilm();
  }, []);

  const [filmInfo, setFilmInfo] = useState(null);
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

  const handleShowModalEdit = (item) => {
    setOpenEdit(true);
    setFilmInfo(item);
    console.log(item);
  };

  const handleShowModalDelete = (item) => {
    setOpenDelete(true);
    setFilmInfo(item);
  };

  const handleShowModalAdd = () => {
    setOpenAdd(true);
  };

  const handleOk = async () => {
    await axios
      .delete(`http://localhost:8080/api/v1/film/${filmInfo.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(setOpenDelete(false))
      .then(window.location.reload());
  };

  const handleCancel = () => {
    setOpenDelete(false);
  };

  const inputRefTitle = useRef(null);
  const inputRefYear = useRef(0);
  const inputRefDescription = useRef(null);
  const inputRefImage = useRef(null);
  const inputRefGenre = useRef(null);

  const handleSubmitEdit = async () => {
    const dataPost = {
      id: filmInfo.id,
      title: inputRefTitle.current.value,
      genre: inputRefGenre.current.value,
      image: inputRefImage.current.value,
      year: inputRefYear.current.value,
      description: inputRefDescription.current.value,
    };
    console.log(dataPost);
    await axios
      .put("http://localhost:8080/api/v1/film/update", dataPost, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(setOpenEdit(false))
      .then(window.location.reload());
    return;
  };

  const handleSubmitAdd = async () => {
      const dataPost = {
      title: inputRefTitle.current.value,
      genre: inputRefGenre.current.value,
      image: inputRefImage.current.value,
      year: inputRefYear.current.value,
      description: inputRefDescription.current.value,
    };
    await axios.post("http://localhost:8080/api/v1/film/create", dataPost, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(setOpenAdd(false))
    .then(window.location.reload())
  }

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
          <Button style={{float: "right"}} onClick={() => handleShowModalAdd()}>Add Film</Button>
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
              <List.Item
                      
                  >
                    <NavLink to={`film/${item.id}`}>
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
                  {localStorage.getItem("role") == "ADMIN" ? (
                    <>
                      <Button onClick={() => handleShowModalEdit(item)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleShowModalDelete(item)}>
                        Delete
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                </NavLink>
              </List.Item>
            )}
          ></List>
        </div>
        <div className="pagination">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </section>
      <Modal
        title="Edit Film"
        centered
        open={openEdit}
        onOk={() => handleSubmitEdit()}
        onCancel={() => {
          setOpenEdit(false);
        }}
        width={1000}
      >
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          defaultValue={filmInfo?.title}
          ref={inputRefTitle}
        />

        <label>Genre</label>
        <select
          id="genre"
          style={{ backgroundColor: "white" }}
          defaultValue={filmInfo?.genre}
          ref={inputRefGenre}
        >
          <option>ACTION</option>
          <option>ADVENTURE</option>
          <option>COMEDY</option>
          <option>DRAMA</option>
        </select>
        <label>Image</label>
        <input
          type="text"
          placeholder="Enter image link..."
          id="image"
          defaultValue={filmInfo?.image}
          ref={inputRefImage}
        ></input>
        <label>Year</label>
        <input
          type="number"
          placeholder="Enter year..."
          id="year"
          defaultValue={filmInfo?.year}
          ref={inputRefYear}
        />
        <label>Description</label>
        <textarea
          type="text"
          placeholder="Enter film Description..."
          id="description"
          defaultValue={filmInfo?.description}
          style={{ width: "80vw" }}
          ref={inputRefDescription}
        ></textarea>
      </Modal>
      <Modal
        title="Delete Confirm"
        open={openDelete}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to delete this film?</p>
      </Modal>
      <Modal
        title="Add new Film"
        centered
        open={openAdd}
        onOk={() => handleSubmitAdd()}
        onCancel={() => {
          setOpenAdd(false);
        }}
        width={1000}
      >
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          ref={inputRefTitle}
        />

        <label>Genre</label>
        <select
          id="genre"
          style={{ backgroundColor: "white" }}

          ref={inputRefGenre}
        >
          <option>ACTION</option>
          <option>ADVENTURE</option>
          <option>COMEDY</option>
          <option>DRAMA</option>
        </select>
        <label>Image</label>
        <input
          type="text"
          placeholder="Enter image link..."
          id="image"

          ref={inputRefImage}
        ></input>
        <label>Year</label>
        <input
          type="number"
          placeholder="Enter year..."
          id="year"

          ref={inputRefYear}
        />
        <label>Description</label>
        <textarea
          type="text"
          placeholder="Enter film Description..."
          id="description"
          style={{ width: "80vw" }}
          ref={inputRefDescription}
        ></textarea>
      </Modal>
    </>
  );
};

export default Home;
