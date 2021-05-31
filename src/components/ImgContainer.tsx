import React from "react";
import "./ImgContainer.less";

interface PropsType {
  src?: string;
}

export default function ImgContainer(props: PropsType) {

  return (
    <div
      className="img-container"
      style={{
        backgroundImage: `url(${
          props.src || require("../assets/img/cover.jpg")
        })`,
      }}
    ></div>
  );
}
