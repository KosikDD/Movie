import React, { Component } from 'react';
import { Input, Menu } from 'antd';

import './header.css';

export default class Header extends Component {
  render() {
    const menuItems = [
      {
        label: 'Search',
        key: 'search',
      },
      {
        label: 'Rated',
        key: 'rated',
      },
    ];

    return (
      <header className="header">
        <Menu className="menu" mode="horizontal" items={menuItems} />
        <form className="search-form">
          <Input className="input" type={'text'} placeholder="Type to search..."></Input>
        </form>
      </header>
    );
  }
}
