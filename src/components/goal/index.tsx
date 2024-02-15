import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import moment from "moment";

const Goal = () => {
  const [expectedTime, setExpectedTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    let timeout = setInterval(round, 1000);
    function round() {
      const drift = Date.now() - expectedTime;
      setCurrentTime(Date.now());
      setExpectedTime((prevExpected) => (prevExpected += 1000));
      timeout = setTimeout(round, 1000 - drift);
    }

    return () => {
      clearInterval(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col mt-[35px]">
        <div className="flex justify-between mb-[13px] items-center">
          <h1 className="text-[24px] font-bold">Goals</h1>
          <Button>Add Goal</Button>
        </div>
        <Card
          className={
            `bg-gradient-to-r from-indigo-500` +
            ` from-${moment(currentTime).second()}% to-transparent to-${moment(
              currentTime
            ).second()}%`
          }
          style={{
            background: `linear-gradient(90deg, rgba(0, 0, 0, 0.05) ${moment(
              currentTime
            ).second()}%, rgba(32, 32, 32, 0) ${moment(
              currentTime
            ).second()}%)`,
          }}
        >
          <h1>{moment(currentTime).second()}</h1>
        </Card>
      </div>
    </>
  );
};

export default Goal;
