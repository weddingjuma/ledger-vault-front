//@flow
import React from "react";
import Checkbox from "../../form/Checkbox";
import { PopBubble, DialogButton } from "../../";
import EnableForm from "../../../components/EnableForm";
import InfoModal from "../../InfoModal";
import ArrowDown from "../../icons/ArrowDown";

type Props = {
  rate_limiter: *,
  popbubble: boolean,
  anchor?: boolean,
  anchor: React.DOM,
  enable: () => void,
  switchInternalModal: string => void,
  changeFrequency: (a: string, b: { value: number, label: string }) => void,
  openPopBubble: (*) => void,
  change: (a: string) => void
};

function AccountCreationRateLimiter(props: Props) {
  const {
    switchInternalModal,
    rate_limiter,
    enable,
    popbubble,
    openPopBubble,
    anchor,
    change,
    changeFrequency
  } = props;

  return (
    <div className="small-modal">
      <header>
        <h3>Rate Limiter</h3>
      </header>
      <div className="content">
        <EnableForm checked={rate_limiter.enabled} toggle={enable}>
          <div className="form-field">
            <input
              className={`medium-padding ${rate_limiter.value === 0
                ? "error"
                : ""}`}
              type="text"
              id="text-duration"
              value={rate_limiter.value}
              onChange={e => change(e.target.value)}
            />
            <label htmlFor="text-duration">Rate</label>
            <span
              className="count dropdown"
              role="button"
              tabIndex={0}
              onClick={e => openPopBubble(e.currentTarget)}
            >
              <strong>operations</strong> per {rate_limiter.frequency.label}
              <ArrowDown className="arrow-down" />
            </span>
            <PopBubble
              open={popbubble}
              onRequestClose={openPopBubble}
              anchorEl={anchor}
              style={{
                marginLeft: "34px",
                marginTop: "11px"
              }}
            >
              <div className="frequency-bubble">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    changeFrequency("rate-limiter", {
                      value: 60,
                      label: "minute"
                    })}
                  className={`frequency-bubble-row ${rate_limiter.frequency
                    .value === 60
                    ? "active"
                    : ""}`}
                >
                  minute
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    changeFrequency("rate-limiter", {
                      value: 3600,
                      label: "hour"
                    })}
                  className={`frequency-bubble-row ${rate_limiter.frequency
                    .value === 3600
                    ? "active"
                    : ""}`}
                >
                  hour
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    changeFrequency("rate-limiter", {
                      value: 84600,
                      label: "day"
                    })}
                  className={`frequency-bubble-row ${rate_limiter.frequency
                    .value === 84600
                    ? "active"
                    : ""}`}
                >
                  day
                </div>
              </div>
            </PopBubble>
          </div>
          <InfoModal>
            Rate-limiter enforces that your team does not exceed a pre-defined
            number of outgoing transaction per interval of time.
          </InfoModal>
        </EnableForm>
      </div>

      <div className="footer">
        <DialogButton
          right
          highlight
          onTouchTap={() => switchInternalModal("main")}
        >
          Done
        </DialogButton>
      </div>
    </div>
  );
}

export default AccountCreationRateLimiter;
