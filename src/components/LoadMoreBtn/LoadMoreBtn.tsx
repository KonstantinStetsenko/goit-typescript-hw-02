import React from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div>
      <button className={css.buttonStyle} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
