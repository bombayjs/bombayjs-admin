import React, { PureComponent } from 'react';
import { Table } from 'antd';

import styles from './index.less';

interface DataTableTypeProps {
  dataSource: Array<any>;
  columns: Array<any>;
}

interface DataTableTypeState {}

class DataTable extends PureComponent<DataTableTypeProps, DataTableTypeState> {
  constructor(props: DataTableTypeProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { columns, dataSource } = this.props;
    return (
      <div className={styles['table-container']}>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1300, y: 600 }} />
      </div>
    );
  }
}

export default DataTable;
