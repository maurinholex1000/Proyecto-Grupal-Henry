import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import prodStyle from "./Product.module.css";

const Product = ({ id, image, name, price, review = [1, 2, 3] }) => {
  const valorReview = {
    size: 25,
    value: 4,
    edit: false
  };
  return (
    <Link to={`/detail/${id}`}>
      <div className={prodStyle.card1}>
        <div className={prodStyle.cardheader}>
          <img src={image} alt={name} />
        </div>
        <div className={prodStyle.cardbody}>
          <div className={prodStyle.cardData1}>
            <span className={prodStyle.cardPrice}>
              <b>Price:</b> ${price}
            </span>
            <span>
            <ReactStars {...valorReview} />
              {review?.map((n) =>
                n < 1 ? (
                  <FaIcons.FaStarHalf key={n} />
                ) : (
                  <FaIcons.FaStar key={n} />
                )
              )}
            </span>
           
          </div>
          <div className={prodStyle.cardText}>{name}</div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
