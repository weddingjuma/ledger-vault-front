//@flow
import React from "react";
import InfoModal from "../../InfoModal";
import ApproveLockRow from "../../ApproveLockRow";
import RateLimiterValue from "../../RateLimiterValue";
import Hourglass from "../../icons/thin/Hourglass";
import ValidateBadge from "../../icons/ValidateBadge";
import Rates from "../../icons/thin/Rates";
import LocksPercentage from "../../LocksPercentage";
import type { Account, Operation } from "../../../data/types";

const getTimeLock = (seconds: number) => {
  return `${Math.round(10 * (seconds / 3600)) / 10} hours delay`;
};

function OperationApproveLocks(props: {
  operation: Operation,
  account: Account
}) {
  const { operation, account } = props;
  const isUnactive = operation.approved.length < account.security_scheme.quorum;

  console.log(account.security_scheme);

  return (
    <div>
      <InfoModal>
        Funds will be spent when required approvals have been collected from the
        account{"'"}s members and locks have completed
      </InfoModal>
      <div style={{ marginTop: "40px" }}>
        {account.security_scheme.time_lock && (
          <ApproveLockRow
            icon={<Rates height="30px" stroke="#e2e2e2" strokeWidth="2px" />}
            name="Time-lock"
            value={getTimeLock(account.security_scheme.time_lock)}
            state="15 hours left"
            unactive={isUnactive}
          />
        )}

        {account.security_scheme.rate_limiter && (
          <ApproveLockRow
            icon={
              <Hourglass
                width="25px"
                height="25px"
                stroke="#cccccc"
                strokeWidth="2px"
              />
            }
            name="Rate Limiter"
            value={
              <RateLimiterValue
                max_transaction={
                  account.security_scheme.rate_limiter.max_transaction
                }
                time_slot={account.security_scheme.rate_limiter.time_slot}
              />
            }
            state={<ValidateBadge className="confirmed" />}
            unactive={isUnactive}
          />
        )}
      </div>
      {isUnactive ? <LocksPercentage /> : <LocksPercentage percentage={0.5} />}
    </div>
  );
}

export default OperationApproveLocks;
