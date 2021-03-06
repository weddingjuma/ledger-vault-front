//@flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextField, DialogButton } from "../../components";
import Profile from "../../components/icons/thin/Profile";

export class TeamLogin extends Component<{
  onChange: Function,
  onStartAuth: Function,
  onCloseTeamError: Function,
  isChecking: boolean,
  team: string,
  teamError: boolean
}> {
  context: {
    translate: string => string
  };
  componentDidMount() {
    // FIXME a better way is to use a wrapping <form>, hook on onSubmit so we can catch the ENTER or any submitting other ways
    document.addEventListener("keypress", this.confirm);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.confirm);
  }

  selectTeam = () => {
    if (this.props.team !== "" && !this.props.isChecking) {
      this.props.onStartAuth();
    }
  };

  confirm = (e: *) => {
    if (e.charCode === 13) {
      this.selectTeam();
    }
  };

  handleRequestClose = () => {
    this.props.onCloseTeamError();
  };

  render() {
    const t = this.context.translate;
    return (
      <div className="TeamLogin">
        <Profile className="user" color="#e2e2e2" />
        <br />
        <TextField
          onKeyDown={this.confirm}
          error={this.props.teamError && this.props.team !== ""}
          style={{ width: "320px" }}
          inputProps={{ style: { textAlign: "center" } }}
          disabled={this.props.isChecking}
          value={this.props.team}
          id="textField"
          onChange={this.props.onChange}
          placeholder={t("login.hint")}
        />
        <br />
        <div className="instructions">{t("login.instructions")}</div>
        <DialogButton
          highlight
          disabled={this.props.team === ""}
          right
          onTouchTap={this.selectTeam}
        >
          {t("common.continue")}
        </DialogButton>
      </div>
    );
  }
}

TeamLogin.contextTypes = {
  translate: PropTypes.func.isRequired
};

export default TeamLogin;
