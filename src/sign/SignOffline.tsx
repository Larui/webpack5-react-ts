import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./SignOffline.less";


function SignOffline(props) {
  return <div>签到页</div>
}

const mapStateToProps = (state) => ({
  global: state.global,
});

const mapDispatchProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(React.memo(SignOffline));
