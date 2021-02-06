// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';

import Wrapper from '../styles/Sidebar';
import {
  HomeIcon,
  LibIcon,
  SubIcon,
  TrendingIcon,
} from './Icons';
import SidebarAuth from './SidebarAuth';

function Sidebar({ isSidebarOpen }) {
  return (
    <Wrapper open={isSidebarOpen}>
      <NavLink exact to="/" activeClassName="active">
        <div className="icon">
          <HomeIcon />
          <span>Home</span>
        </div>
      </NavLink>

      <NavLink to="/feed/trending" activeClassName="active">
        <div className="icon">
          <TrendingIcon />
          <span>Trending</span>
        </div>
      </NavLink>

      <NavLink to="/feed/snapshot" activeClassName="active">
        <div className="icon">
          <SubIcon />
          <span>Market Snapshot</span>
        </div>
      </NavLink>

      <div className="divider"></div>

      <NavLink
        to="/feed/watchlist"
        activeClassName="active">
        <div className="icon">
          <LibIcon />
          <span>Watchlist</span>
        </div>
      </NavLink>

      <div className="divider"></div>

      <SidebarAuth />
    </Wrapper>
  );
}

export default Sidebar;
