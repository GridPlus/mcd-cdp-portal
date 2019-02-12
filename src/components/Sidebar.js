import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getAllFeeds } from 'reducers/network/cdpTypes';

import { Flex } from '@makerdao/ui-components';
import Jazzicon from './Jazzicon';
import { cutMiddle } from 'utils/ui';

import SidebarFeeds from './sidebar/Feeds';
import SidebarSystem from './sidebar/System';
import AccountConnect from './sidebar/AccountConnect';

const StyledSidebar = styled.aside`
  min-height: 1000px;
  background: #fff;
  box-shadow: -1px 0px 3px rgba(159, 159, 159, 0.25);
`;

const Section = styled.section`
  padding: 0 20px;
  border-bottom: 1px solid #e0e0e0;
  box-sizing: content-box;
`;

const Header = styled(Section)`
  height: 50px;
  margin-top: 1px;
`;

const Network = styled(Section)`
  height: 30px;
  line-height: 30px;
  color: #48495f;
  font-size: 12px;
`;

const Dot = styled.span`
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin: 0 1rem 0 0.2rem;
  background: ${({ color }) => color || '#000'};
`;

const StyledAddress = styled.span`
  line-height: 24px;
  font-size: 15px;
  color: #231536;
  margin: 0 14px;
`;

const NETWORK_COLORS = {
  1: '#1abc9c',
  42: '#690496'
};

const NETWORK_DISPLAY_NAMES = {
  1: 'Mainnet',
  42: 'Kovan Testnet'
};

function netIdToDisplayName(networkId) {
  const displayName = NETWORK_DISPLAY_NAMES[networkId];
  if (displayName !== undefined) return displayName;
  return 'Unkown network';
}

function NetworkSection({ swappable = false, networkID }) {
  const networkDisplayName = netIdToDisplayName(networkID);
  if (swappable)
    return (
      <Network>
        <Dot color={NETWORK_COLORS[networkID]} />
        {networkDisplayName}
      </Network>
    );

  return (
    <Network>
      <Dot color={NETWORK_COLORS[networkID]} />
      {networkDisplayName}
    </Network>
  );
}

function AccountSection({ address = null } = {}) {
  if (address !== null)
    return (
      <Header>
        <Flex height="50px" alignItems="center">
          <Jazzicon address={address} />
          <StyledAddress>{cutMiddle(address, 7, 5)}</StyledAddress>
        </Flex>
      </Header>
    );

  return (
    <Header>
      <Flex height="50px" alignItems="center">
        <AccountConnect />
      </Flex>
    </Header>
  );
}

function Sidebar({ feeds, system, address, network }) {
  return (
    <StyledSidebar>
      <AccountSection address={address} />
      <NetworkSection networkID={network.id} swappable={network.swappable} />
      <Section>
        <SidebarFeeds feeds={feeds} />
      </Section>
      <Section>
        <SidebarSystem system={system} />
      </Section>
    </StyledSidebar>
  );
}

function mapStateToProps(state) {
  return {
    feeds: getAllFeeds(state),
    system: state.network.system
  };
}

export default connect(mapStateToProps)(Sidebar);
