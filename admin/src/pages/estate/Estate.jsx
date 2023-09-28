import { Link, useLocation } from "react-router-dom";
import "./estate.css";
import Chart from "../../components/chart/Chart";
//import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Estate() {
  const location = useLocation();
  const timelineId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const timeline = useSelector((state) =>
    state.timeline.timelines.find((timeline) => timeline._id === timelineId)
  );
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + timelineId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [timelineId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Timeline</h1>
        <Link to="/newtimeline">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{timeline.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{timeline._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">subtite:</span>
              <span className="productInfoValue">{timeline.subtitle}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Duration:</span>
              <span className="productInfoValue">{timeline.dateText}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Timeline Title</label>
            <input type="text" placeholder={timeline.title} />
            <label>Timeline Description</label>
            <input type="textarea" placeholder={timeline.paragraph} />
            <label>Duration</label>
            <input type="text" placeholder={timeline.dateText} />
          </div>
          <div className="productFormRight">
            <label>Paragraph</label>
            <input type="text" placeholder={timeline.paragraph2} />
            <label>Color</label>
            <input type="textarea" placeholder={timeline.color} />
            <label>Background Color</label>
            <input type="text" placeholder={timeline.color} />
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}