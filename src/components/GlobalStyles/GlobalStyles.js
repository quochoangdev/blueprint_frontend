import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PropTypes from "prop-types";

import "./GlobalStyles.module.scss";

const GlobalStyles = ({ children }) => {
  return React.Children.only(children);
};

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
