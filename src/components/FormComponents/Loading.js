import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <ThreeDots
        type="ThreeDots"
        color="#FFFFFF"
        height={30}
        width={30}
      />
    </>
  );
}