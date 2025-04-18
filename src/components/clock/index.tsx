import { useState, useEffect } from "react";
import Moment from "react-moment";
import { Card } from "../ui/card";

const Clock = () => {
  // useState declarations
  const [expectedTime, setExpectedTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());

  const clockHandler = () => {
    let timeout: NodeJS.Timeout = setInterval(round, 1000);
    function round() {
      const drift = Date.now() - expectedTime;
      setCurrentTime(Date.now());
      setExpectedTime((prevExpected) => (prevExpected += 1000));
      timeout = setTimeout(round, 1000 - drift);
    }
  };

  useEffect(() => {
    if (document.visibilityState == "visible") {
      clockHandler();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        clockHandler();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Card className="col-start-1 col-end-13 h-[310px] flex justify-center items-center flex-col">
      <h1 className="text-[69px] font-bold">
        <Moment date={""} element={"time"} format={"MMM DD"}>
          {currentTime}
        </Moment>
      </h1>
      <h3 className="text-[18px] mb-12">
        <span>
          <Moment date={""} element={"time"} format={"ddd"}>
            {currentTime}
          </Moment>
        </span>{" "}
        -{" "}
        <span>
          <Moment date={""} element={"time"} format={"HH:mm:ss A"}>
            {currentTime}
          </Moment>
        </span>
      </h3>
    </Card>
  );
};

export default Clock;
