import React, { Component } from 'react';
import { Pagination } from 'antd';

import './footer.css';

export default class Footer extends Component {
  render() {
    return <Pagination defaultCurrent={1} total={50} />;
  }
}
