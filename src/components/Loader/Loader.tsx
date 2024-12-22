import { ThreeCircles } from "react-loader-spinner";
import css from "./Loaderr.module.css";
export default function RotatingLinesLoader() {
  return (
    <div className={css.loaderContainer}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="orange"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
