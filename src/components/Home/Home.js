import React from "react";
import bike from "../../images/bike.png";
import car from "../../images/car.png";
import bus from "../../images/bus.png";
import train from "../../images/train.png";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div>
        <Link to="destination">
          <img src={bike} alt="" />
        </Link>
        <h3>BIKE</h3>
      </div>
      <div>
        <Link to="destination">
          <img src={car} alt="" />
        </Link>
        <h3>CAR</h3>
      </div>
      <div>
        <Link to="destination">
          <img src={bus} alt="" />
        </Link>
        <h3>BUS</h3>
      </div>
      <div>
        <Link to="destination">
          <img src={train} alt="" />
        </Link>
        <h3>TRAIN</h3>
      </div>
    </div>
  );
};

export default Home;
