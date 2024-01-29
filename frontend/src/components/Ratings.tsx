import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface IProps {
  value: number;
  text?: string;
  maxValue?: number;
}

const Ratings = (props: IProps) => {
  const { 
    value, 
    text, 
    maxValue = 5,
  } = props;

  let jsx = [];

  for(let i = 1; i <= maxValue; i++) {
    jsx.push(
      <span key={i}>
        {value >= i ? <FaStar /> : value >= i - 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
    );
  }

  return (
    <div className="rating">
      {jsx}

      <span className="rating-text">
        {text}
      </span>
    </div>
  )
}

export default Ratings;