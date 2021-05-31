import React, { useState, useEffect } from "react";
import { Icon } from "antd";
import "./ActionSheet.less";

interface PropsType {
  visible: boolean;
  children: React.ReactNode;
  onClose: Function;
}

function ActionSheet(props: PropsType) {
  const [visible, setVisible] = useState<boolean>(props.visible || false);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    <div className={`action-sheet ${visible ? "show" : ""}`}>
      {props.children}
      <div
        className="action-sheet-close"
        onClick={() => {
          setVisible(false);
          props.onClose();
        }}
      >
        <Icon type="close" />
      </div>
    </div>
  );
}

export default ActionSheet;
