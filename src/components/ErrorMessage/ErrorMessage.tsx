import React from "react";
import { BiError } from "react-icons/bi";
import css from "./ErrorMessager.module.css";

interface ErrorMessagerProps {
  error: boolean;
  status: string | number | null;
}

const ErrorMessager: React.FC<ErrorMessagerProps> = ({ error, status }) => {
  return (
    <div className={css.error}>
      Ошибка {status} <BiError size={60} />
    </div>
  );
};

export default ErrorMessager;
