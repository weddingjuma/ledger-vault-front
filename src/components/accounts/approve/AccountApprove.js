//@flow
import React, { Component } from "react";
import { Overscroll } from "../../";
import { withRouter, Redirect } from "react-router";
import connectData from "../../../restlay/connectData";

import Footer from "../../approve/Footer";
// import CircularProgress from "material-ui/CircularProgress";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AccountApproveDetails from "./AccountApproveDetails";
import AccountApproveMembers from "./AccountApproveMembers";
import ModalLoading from "../../../components/ModalLoading";
import AccountApproveApprovals from "./AccountApproveApprovals";
import AccountQuery from "../../../api/queries/AccountQuery";
import ApproversQuery from "../../../api/queries/ApproversQuery";
import ProfileQuery from "../../../api/queries/ProfileQuery";
import MembersQuery from "../../../api/queries/MembersQuery";
import type { Member, Account } from "../../../data/types";

type Props = {
  members: Array<Member>,
  profile: Member,
  approvers: Array<Member>,
  account: Account,
  close: Function,
  approve: Function,
  aborting: Function,
  match: *
};
class AccountApprove extends Component<Props> {
  render() {
    const {
      members,
      profile,
      approvers,
      account,
      close,
      approve,
      aborting
    } = this.props;

    return (
      <Tabs>
        <div className="header">
          <h2>Account request</h2>
          <TabList>
            <Tab>details</Tab>
            <Tab>members</Tab>
            <Tab>approvals</Tab>
          </TabList>
        </div>
        <div className="content">
          <TabPanel className="tabs_panel">
            <AccountApproveDetails account={account} approvers={approvers} />
          </TabPanel>
          <TabPanel className="tabs_panel">
            <Overscroll>
              <AccountApproveMembers members={members} account={account} />
            </Overscroll>
          </TabPanel>
          <TabPanel className="tabs_panel">
            <Overscroll>
              <AccountApproveApprovals
                approvers={approvers}
                account={account}
              />
            </Overscroll>
          </TabPanel>
        </div>
        <Footer
          close={close}
          approve={approve}
          aborting={aborting}
          approved={account.approved.indexOf(profile.pub_key) > -1}
        />
      </Tabs>
    );
  }
}

const RenderError = () => {
  return <Redirect to="/pending" />;
};

const connected = connectData(AccountApprove, {
  RenderError,
  queries: {
    account: AccountQuery,
    members: MembersQuery,
    approvers: ApproversQuery,
    profile: ProfileQuery
  },
  propsToQueryParams: props => ({ accountId: props.match.params.id || "" }),
  RenderLoading: ModalLoading
});

export default withRouter(connected);
