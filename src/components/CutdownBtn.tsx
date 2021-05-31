import React, { useState, useRef, useReducer } from "react";
import { Button } from "antd";
import { createReducer, actionType } from "../store/utils";

interface PropsType {
  onClick: Function;
  style: React.CSSProperties;
}

const initialState = {
  seconds: 60,
  loading: false,
  counting: false,
};

type StateType = typeof initialState;

const handlers = {
  setState: (state: StateType, action: actionType<Partial<StateType>>) => {
    return Object.assign({}, state, action.data);
  },
};

const reducer = createReducer(initialState, handlers);

async function onStart(
  props: Partial<PropsType>,
  setState: (data: Partial<StateType>) => void,
  timer: React.MutableRefObject<null | number>
) {
  if (!props.onClick) return;

  setState({ loading: true });
  const error = await props.onClick();
  setState({ loading: false });
  if (error) {
    return;
  }
  if (timer.current) {
    clearInterval(timer.current);
    timer.current = null;
  }
  setState({ counting: true });

  let countSec = 60;
  setInterval(() => {
    if (--countSec < 0) {
      setState({ counting: false });
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }
    setState({ seconds: countSec });
  }, 1000);

  setState({ seconds: 60 });
}

export default function CutdownBtn(props: Partial<PropsType>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timer = useRef<number | null>(null);
  const { counting, loading, seconds } = state;

  const setState = (data: Partial<StateType>) =>
    dispatch({
      type: "setState",
      data: data,
    });

  return (
    <Button
      onClick={() => onStart(props, setState, timer)}
      disabled={counting}
      type="primary"
      className="cutdown-btn"
      loading={loading}
      style={props.style}
    >
      {counting ? `${seconds}秒后重试` : "发送验证码"}
    </Button>
  );
}
