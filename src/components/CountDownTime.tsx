import React, { useState, useRef, useEffect } from "react";
import moment from "moment";

interface PropsType {
  style: React.CSSProperties;
  pattern: string;
  startTime: string;
  callback: () => void;
}

function creatTimer() {
  const interValPrecisionObj = { num: 0 };
  function setIntervalPrecision(
    callback: (count?: number) => void,
    delay = 1000
  ) {
    // 生成并记录定时器ID
    let obj = interValPrecisionObj;
    obj.num++;
    obj["n" + obj.num] = true;
    const intervalId = obj.num;
    const startTime = +new Date();
    let count = 0;
    (function loop() {
      // 定时器被清除，则终止
      if (!obj["n" + intervalId]) return;

      // 满足条件执行回调
      if (+new Date() > startTime + delay * (count + 1)) {
        count++;
        callback(count);
      }
      requestAnimationFrame(loop);
    })();
    return intervalId;
  }

  function clearIntervalPrecision(intervalId) {
    delete interValPrecisionObj["n" + intervalId];
  }

  return {
    setIntervalPrecision,
    clearIntervalPrecision,
  };
}

function calcDuration(startTime) {
  let duration = +new Date(startTime) - +new Date();
  duration = Math.floor(duration / 1000);
  const seconds = duration % 60;
  const mins = Math.floor(duration / 60) % 60;
  const hours = Math.floor(Math.floor(duration / 60) / 60) % 24;
  const days = Math.floor(Math.floor(Math.floor(duration / 60) / 60) / 24);
  return {
    days,
    seconds,
    mins,
    hours,
  };
}

export default function CutdownTime(props: Partial<PropsType>) {
  const [dateInfo, setDateInfo] = useState({
    days: 0,
    seconds: 0,
    mins: 0,
    hours: 0,
  });

  useEffect(() => {
    if (!props.startTime) return;

    const { setIntervalPrecision, clearIntervalPrecision } = creatTimer();
    let timer;
    timer = setIntervalPrecision(() => {
      const newDateInfo = calcDuration(props.startTime);

      if (
        newDateInfo.days > 0 ||
        newDateInfo.hours > 0 ||
        newDateInfo.mins > 0 ||
        newDateInfo.seconds > 0
      ) {
        setDateInfo(newDateInfo);
      } else {
        props.callback && props.callback();
        clearIntervalPrecision(timer);
      }
    }, 1000);
  }, [props.startTime]);

  return (
    <div className="activity-countdown">
      距{props.pattern}开始：
      <span className="activity-countdown-number" style={props.style}>
        {dateInfo.days}
      </span>
      天
      <span className="activity-countdown-number" style={props.style}>
        {dateInfo.hours}
      </span>
      时
      <span className="activity-countdown-number" style={props.style}>
        {dateInfo.mins}
      </span>
      分
      <span className="activity-countdown-number" style={props.style}>
        {dateInfo.seconds}
      </span>
      秒
    </div>
  );
}
