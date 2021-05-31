import React from "react";
import "./AdaptiveContainer.less";

interface PropsType {
  ratio?: {
    x: number;
    y: number;
  };
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const AdaptiveContainer: React.FC<PropsType> = (props) => {
  const ratio = props.ratio || { x: 16, y: 9 };
  return (
    <div
      className={`adaptive-container ${props.className}`}
      data-ratio={`${ratio.x}:${ratio.y}`}
      style={{ paddingTop: (ratio.y / ratio.x) * 100 + "%", ...props.style }}
      onClick={props.onClick}
    >
      <div className={`adaptive-content`}>{props.children}</div>
    </div>
  );
};

export default AdaptiveContainer;
