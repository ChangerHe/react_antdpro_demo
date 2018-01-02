import React, {Component} from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import {connect, Popconfirm} from 'dva';
import {Table, Icon, Divider, Tabs} from 'antd';
const TabPane = Tabs.TabPane;

export default class Operation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curTab: 'edit'
        }
    }
    onTabsChange = (key) => {
        // console.log(key)
        console.log(this)
        this.setState({curTab: key})
        setTimeout(() => {
            console.log(this.state.curTab)
        }, 20);
    }
    // props
    render() {
        // 编辑线路的data
        const data = [];
        const columnsRunning = [
            {
                title: '线路名称',
                dataIndex: 'lineName',
                key: 'lineName'
            }, {
                title: '线路编号',
                dataIndex: 'lineNo',
                key: 'lineNo'
            }, {
                title: '线路模式',
                dataIndex: 'lineModel',
                key: 'lineModel'
            }, {
                title: '起始站',
                dataIndex: 'startStationName',
                key: 'startStationName'
            }, {
                title: '终点站',
                dataIndex: 'endStationName',
                key: 'endStationName'
            }, {
                title: '出发城市',
                dataIndex: 'startCity',
                key: 'startCity'
            }, {
                title: '到达城市',
                dataIndex: 'endCity',
                key: 'endCity'
            }, {
                title: '开设日期',
                dataIndex: 'beginDate',
                key: 'startDate'
            }, {
                title: '取消日期',
                dataIndex: 'endDate',
                key: 'endDate'
            }, {
                title: "深圳通",
                dataIndex: "isSupportSZT",
                key: "isSupportSZT"
            }, {
                title: '运行时长',
                dataIndex: 'runTime',
                key: 'runTime'
            }, {
                title: '里程',
                dataIndex: 'mileage',
                key: 'mileage'
            }, {
                title: '取消',
                key: 'cancel',
                render: (text, record) => (
                    <Popconfirm
                        title="确定取消吗？"
                        okText="Yes"
                        cancelText="No">
                        <a>取消</a>
                    </Popconfirm>
                )
            }, {
                title: '查看线路',
                dataIndex: 'id',
                render: (text) => <Link to={"/intercity/index/edit/" + text}>查看线路</Link>
            }
        ];

        const columnsCancel = [
            {
                title: '线路名称',
                dataIndex: 'lineName',
                key: 'lineName'
            }, {
                title: '线路编号',
                dataIndex: 'lineNo',
                key: 'lineNo'
            }, {
                title: '线路模式',
                dataIndex: 'lineModel',
                key: 'lineModel'
            }, {
                title: '起始站',
                dataIndex: 'startStationName',
                key: 'startStationName'
            }, {
                title: '终点站',
                dataIndex: 'endStationName',
                key: 'endStationName'
            }, {
                title: '出发城市',
                dataIndex: 'startCity',
                key: 'startCity'
            }, {
                title: '到达城市',
                dataIndex: 'endCity',
                key: 'endCity'
            }, {
                title: '开设日期',
                dataIndex: 'beginDate',
                key: 'startDate'
            }, {
                title: '取消日期',
                dataIndex: 'endDate',
                key: 'endDate'
            }, {
                title: '运行时长',
                dataIndex: 'runTime',
                key: 'runTime'
            }, {
                title: "深圳通",
                dataIndex: "isSupportSZT",
                key: "isSupportSZT"
            }, {
                title: '里程',
                dataIndex: 'mileage',
                key: 'mileage'
            }, {
                title: '恢复运营准备',
                key: 'cancel',
                render: (text, record) => (
                    <Popconfirm
                        title="确定恢复吗？"
                        okText="Yes"
                        cancelText="No">
                        <a>恢复运营准备</a>
                    </Popconfirm>
                )
            }, {
                title: '查看线路',
                dataIndex: 'id',
                render: (text) => <Link to={"/intercity/index/edit/" + text}>查看线路</Link>
            }
        ];

        // return (<Table columns={columns} dataSource={data}/>);
        return (
            <div>
                <Tabs
                    defaultActiveKey="edit"
                    activeKey={this.state.curTab}
                    onChange={this.onTabsChange}>
                    <TabPane tab="当前运营线路" key="edit">
                        <Table columns={columnsRunning} dataSource={data}/>
                    </TabPane>
                    <TabPane tab="已取消运营线路" key="prepare">
                        <Table columns={columnsCancel} dataSource={data}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}