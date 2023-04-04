import React, { Component } from 'react';
import { Pagination } from 'antd';

import './footer.css';

export default class Footer extends Component {
  render() {
    let total = 0;
    if (this.props.totalmovies >= 10000) {
      total = 10000;
    } else {
      total = this.props.totalmovies;
    }

    if (this.props.error) {
      return null;
    } else {
      return (
        <Pagination
          defaultCurrent={1}
          total={total}
          defaultPageSize={20}
          pageSizeOptions={[20]}
          showSizeChanger={false}
          onChange={this.props.onClickPage}
          current={this.props.currentPage}
          hideOnSinglePage={true}
        />
      );
    }
  }
}
