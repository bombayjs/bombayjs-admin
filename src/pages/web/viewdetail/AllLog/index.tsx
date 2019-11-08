import React, { PureComponent } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import DataTable from '@/components/DataTable';
import SearchParam from './SearchParam';
import { viewDetailStateType } from '@/models/viewDetail';

// import styles from './index.less';

interface AllLogTypeProps {
  dispatch?: Dispatch<AnyAction>;
  viewdetail: viewDetailStateType;
}

interface AllLogTypeState {
  tableTitleColumns: Array<any>;
  dataSource: Array<any>;
}

@connect(({ viewdetail }: { viewdetail: viewDetailStateType }) => ({
  viewdetail,
}))
class AllLog extends PureComponent<AllLogTypeProps, AllLogTypeState> {
  constructor(props: AllLogTypeProps) {
    super(props);
    this.state = {
      tableTitleColumns: [
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.time' }),
          dataIndex: 'time',
          key: 'time',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.logTime' }),
          dataIndex: 'logTypes',
          key: 'logTypes',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.pageUrl' }),
          dataIndex: 'pageUrl',
          key: 'pageUrl',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.uid' }),
          dataIndex: 'uid',
          key: 'uid',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.device' }),
          dataIndex: 'device',
          key: 'device',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.jsFileUrl' }),
          dataIndex: 'jsFileUrl',
          key: 'jsFileUrl',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.jsErrMsg' }),
          dataIndex: 'jsErrMsg',
          key: 'jsErrMsg',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.pageLoadTime' }),
          dataIndex: 'pageLoadTime',
          key: 'pageLoadTime',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.geography' }),
          dataIndex: 'geography',
          key: 'geography',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.apiReqUrl' }),
          dataIndex: 'apiReqUrl',
          key: 'apiReqUrl',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.apiReponseTime' }),
          dataIndex: 'apiReponseTime',
          key: 'apiReponseTime',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.apiMsg' }),
          dataIndex: 'apiMsg',
          key: 'apiMsg',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.apiWhether' }),
          dataIndex: 'apiWhether',
          key: 'apiWhether',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.traceId' }),
          dataIndex: 'traceId',
          key: 'traceId',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.code' }),
          dataIndex: 'code',
          key: 'code',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.browser' }),
          dataIndex: 'browser',
          key: 'browser',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.osys' }),
          dataIndex: 'osys',
          key: 'osys',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.resolution' }),
          dataIndex: 'resolution',
          key: 'resolution',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.client' }),
          dataIndex: 'client',
          key: 'client',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.ref' }),
          dataIndex: 'ref',
          key: 'ref',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.ip' }),
          dataIndex: 'ip',
          key: 'ip',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.sid' }),
          dataIndex: 'sid',
          key: 'sid',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.alllog' }),
          dataIndex: 'alllog',
          key: 'alllog',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.tag' }),
          dataIndex: 'tag',
          key: 'tag',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.customLog' }),
          dataIndex: 'customLog',
          key: 'customLog',
          isShowHead: true,
        },
        {
          title: formatMessage({ id: 'viewdetail.alllog.table.titleColumns.operation' }),
          dataIndex: 'operation',
          key: 'operation',
          isShowHead: true,
        },
      ],
      dataSource: [
        {
          key: '1',
          Time: '胡彦斌',
          uid: 32,
          device: '西湖区湖底公园1号',
        },
        {
          key: '2',
          Time: '胡彦祖',
          uid: 42,
          device: '西湖区湖底公园1号',
        },
      ],
    };
  }

  componentDidMount() {
    this.initAllLogDataAction();
  }

  initAllLogDataAction() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'viewdetail/getAllLogAction',
        payload: {
          startTime: 1463390087795,
          endTime: 1572419773054,
          currentPage: 1,
          pageSize: 10,
          order: 'desc',
          query: {},
        },
      });
    }

    // console.log('result:', AllLogResult)
  }

  // washAllLogData = () => {
  //   const allLogData = this.props.viewdetail.allLog.allLogDataList
  //   console.log('allLogData:', allLogData)
  //   const tempArray = allLogData.map((item) => ({
  //     time: item.begin,
  //     logTypes: item.t,
  //     pageUrl: item.page,
  //     uid: item.uid,
  //     device: item.detector.device.name,
  //     jsFileUrl: '',
  //     jsErrMsg: '',
  //     pageLoadTime: item.load,
  //     geography: item.ad_info.nation,
  //     apiReqUrl: item.api,
  //     apiReponseTime: item.time,
  //     apiMsg: apiMsg,
  //     apiWhether: apiWhether,
  //     traceId: traceId,
  //     code: code,
  //     browser: browser,
  //     osys: osys,
  //     resolution: resolution,
  //     client: client,
  //     ref: ref,
  //     ip: ip,
  //     sid: sid,
  //     alllog: item.msg,
  //     tag: tag,
  //     customLog: customLog,
  //     operation: operation,
  //   }))
  //   console.log('allLogData:',tempArray)
  // }

  render() {
    const { tableTitleColumns, dataSource } = this.state;
    // console.log('viewdetail:', this.props.viewdetail)
    // console.log('allLog:', this.props.viewdetail.allLog)
    // this.washAllLogData();

    return (
      <div>
        <SearchParam />
        <DataTable dataSource={dataSource} columns={tableTitleColumns} />
      </div>
    );
  }
}

export default AllLog;
