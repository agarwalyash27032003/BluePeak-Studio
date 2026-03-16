import { useEffect, useState } from "react";
import "../../preloader.css";

export default function PreLoader({ onFinish }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);

      setTimeout(() => {
        onFinish();
      }, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`preloader ${hide ? "hide" : ""}`}>
      <h1 className="loader-text">BluePeak Studio</h1>

      {/* sliding panels */}
      <div className="panel panel-left"></div>
      <div className="panel panel-right"></div>
    </div>
  );
}