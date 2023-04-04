import React, { Component } from 'react';
import { Input, Menu } from 'antd';

import './header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', current: 'search' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(event) {
    await this.setState(() => {
      return { value: event.target.value };
    });
    this.props.searchMovie(this.state.value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.searchMovie(this.state.value);
  };

  render() {
    const menuItems = [
      {
        label: 'Search',
        key: 'search',
        selected: true,
      },
      {
        label: 'Rated',
        key: 'rated',
      },
    ];

    const onClick = (e) => {
      this.props.onTab(e.key);
      this.setState(() => {
        return {
          current: e.key,
        };
      });
    };

    if (this.state.current === 'rated') {
      return (
        <header className="header">
          <Menu
            className="menu"
            selectedKeys={this.state.current}
            mode="horizontal"
            items={menuItems}
            onClick={onClick}
          />
        </header>
      );
    } else {
      return (
        <header className="header">
          <Menu
            className="menu"
            selectedKeys={this.state.current}
            mode="horizontal"
            items={menuItems}
            onClick={onClick}
          />
          <form className="search-form" onSubmit={this.handleSubmit}>
            <Input
              className="input"
              type={'text'}
              value={this.state.value}
              placeholder="Type to search..."
              onChange={this.handleChange}
              required={true}
              pattern="^[^\s]+(\s.*)?$"
            ></Input>
          </form>
        </header>
      );
    }
  }
}
