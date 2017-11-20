//@flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import ModalRoute from "../ModalRoute";
import AccountCreation from "../accounts/creation/AccountCreation";
import SettingsModal from "../SettingsModal";
import {
  ActionAddAccountIcon,
  ActionExportIcon,
  ActionSettingsIcon,
  ActionActivityIcon
} from "../icons";

import "./ActionBar.css";

const NewAccountLink = () => (
  <Link to="/dashboard/new-account" className="content-header-button">
    <ActionAddAccountIcon />
    <div className="content-header-button-text">account</div>
  </Link>
);

class ActionBar extends Component<{
  location: Object
}> {
  static contextTypes = {
    translate: PropTypes.func.isRequired
  };
  context: {
    translate: string => string
  };
  render() {
    const { location } = this.props;
    // FIXME introduce a component for i18n
    const t = this.context.translate;

    return (
      <div className="ActionBar">
        <ProfileCard />
        <Route path="*/new-account" component={AccountCreation} />
        <ModalRoute
          path="*/settings"
          component={SettingsModal}
          undoAllHistoryOnClickOutside
        />

        <div className="content-header">
          <div className="content-header-left">
            <img
              src="/img/logo.png"
              srcSet="/img/logo@2x.png 2x, /img/logo@3x.png 3x"
              className="content-header-logo"
              alt="Ledger Vault logo"
            />
          </div>
          <div className="content-header-right">
            <Route path="/dashboard" component={NewAccountLink} />
            <Link to="/export" className="content-header-button">
              <ActionExportIcon style={{ marginBottom: "2px" }} />
              <div className="content-header-button-text">
                {t("actionBar.export")}
              </div>
            </Link>
            <Link
              to={location.pathname + "/settings"}
              className="content-header-button"
            >
              <ActionSettingsIcon />
              <div className="content-header-button-text">
                {t("actionBar.settings")}
              </div>
            </Link>
            <Link to="/activity" className="content-header-button">
              <ActionActivityIcon />
              <div className="content-header-button-text">
                {t("actionBar.activity")}
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ActionBar);
