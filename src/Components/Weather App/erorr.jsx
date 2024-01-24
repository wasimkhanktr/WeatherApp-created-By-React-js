import { useNavigate } from "react-router-dom";
import "../Weather App/weatherApp.css";
const Erorr = () => {
  const navigate = useNavigate();
  const refresh = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <div className="nav">
        <button onClick={refresh}>home</button>
      </div>
      <div id="err">
        <img src="/Assets/erorr.png" alt="" />
        <h3>Something Wnt Wrong...!!Plase Refresh</h3>
        <button onClick={refresh}>refresh</button>
      </div>
      <div className="copyright-container">
      <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved by @WK❤ Powered by Weather App.</p>
    </div>

    </div>
  );
};

export default Erorr;
