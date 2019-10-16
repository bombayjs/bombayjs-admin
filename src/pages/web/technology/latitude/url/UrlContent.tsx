import React, { Component } from 'react';
// 引入组件
import UrlPvUv from './UrlPvUv';
// 引入样式
import styles from './style.less';

interface UrlListData {
  page: string;
  pv?: string;
  uv?: string;
  active?: boolean;
}
interface UrlContentProps {
  urlListData: UrlListData[];
  activePage: null | UrlListData;
}
class UrlContent extends Component<UrlContentProps, {}> {
  handleClick = () => {
    console.log(12);
  };

  render() {
    const { activePage } = this.props;
    return (
      <div onClick={this.handleClick} className={styles.urlContentContainer}>
        {activePage && <UrlPvUv activePage={activePage} />}
      </div>
    );
  }
}

export default UrlContent;
