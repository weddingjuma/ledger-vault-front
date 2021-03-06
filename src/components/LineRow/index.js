//@flow
import React, { Component } from "react";
import "./index.css";

class LineRow extends Component<{
  label: string,
  children: React$Node | string
}> {
  render() {
    const { label, children } = this.props;
    return (
      <div className="line-row">
        <span className="line-row-title">{label}</span>
        <span className="line-row-value">{children}</span>
      </div>
    );
  }
}

export default LineRow;
