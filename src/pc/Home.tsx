import React, { useState, useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import * as Actions from "../store/actions/index";

import "./Home.less";

function Home(props) {
  return <div>PC页面</div>;
}

const mapStateToProps = (state) => ({
  global: state.global,
});

const mapDispatchProps = (dispatch) => ({
  setGlobal: (data) =>
    dispatch({
      type: Actions.SET_GLOBAL,
      data,
    }),
});

export default connect(mapStateToProps, mapDispatchProps)(React.memo(Home));
