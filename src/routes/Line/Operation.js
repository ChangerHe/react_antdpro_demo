import React from 'react';
import {Link, hashHistory} from 'dva/router';
import Main from '../../components/business/main';
import {
    DatePicker,
    message,
    Tabs,
    Table,
    Button,
    Form,
    Popconfirm,
    Input,
    Upload,
    Icon,
    Tooltip
} from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Search = Input.Search;
const MonthPicker = DatePicker.MonthPicker;
import classnames from 'classnames';

import styles from '../Common.css';

import MyCalendar from '../../components/common/MyCalendar';

import request from '../../utils/request-ajax';
import util from '../../utils/util';
import Dialog from '../../components/common/Dialog';

import NavData from './NavData';

import commonConfig from '../commonConfig';

import {lineStatusChange} from './NavData';

import {LineDetail} from './index';

var _selectedRows = [];

const rowSelectionSubLine = {
    onChange: (selectedRowKeys, selectedRows) => {
        _selectedRows = selectedRows;
    },
    onSelect: (record, selected, selectedRows) => {
        _selectedRows = selectedRows;
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        _selectedRows = selectedRows;
    }
}

var expandSubLine = (dataSource) => {

    var subLineList = dataSource.subLineList;

    var handleClick = (record, text) => {
        Operation
            ._this
            .onUpdateSubLine(record)
            .then(data => {
                if (data.status === '200') {
                    message.success(data.msg);
                    //record.status
                    record.status = record.status === 'cancel'
                        ? 'running'
                        : 'cancel';
                    if (Operation._this) {
                        Operation
                            ._this
                            .forceUpdate();
                    }
                }
            });

    }

    const columns = [
        {
            title: '线路名称',
            dataIndex: 'lineName',
            key: 'lineName'
        }, {
            title: '线路编号',
            dataIndex: 'lineNo',
            key: 'lineNo'
        }, {
            title: '出发站点',
            dataIndex: 'startStationName',
            key: 'startStationName'
        }, {
            title: '到达站点',
            dataIndex: 'endStationName',
            key: 'endStationName'
        }, {
            title: '出发时间',
            dataIndex: 'startTime',
            key: 'startTime'
        }, {
            title: '到达时间',
            dataIndex: 'arriveTime',
            key: 'arriveTime'
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => commonConfig.statusMap[text]
        }, {
            title: '车票管理',
            render: (text, record) => (
                <span>
                    <Link to={"/intercity/operation/ticket/" + dataSource.id + "_" + record.lineId}>车票管理</Link>
                </span>
            )
        }
    ];
    if (Operation._this.state.curTab == 'running') {
        columns.push({
            title: '操作',
            dataIndex: "status",
            key: "status2",
            render: (text, record) => (
                <Popconfirm
                    title="确定吗？"
                    onConfirm={handleClick.bind(this, record, text)}
                    okText="Yes"
                    cancelText="No">
                    <a>{text === 'cancel'
                            ? "恢复"
                            : "取消"}</a>
                </Popconfirm>
            )
        })
    }
    return (
        <div>
            <Table //rowSelection={rowSelectionSubLine
        }} rowKey={record => record.lineId} columns={columns} dataSource={subLineList} pagination={false}/>
        </div>
    );
};

class Operation extends React.Component {

    state = {
        runningPagination: {
            defaultPageSize: 20
        },
        cancelPagination: {
            defaultPageSize: 20
        },
        loading: false,
        curTab: "running",
        searchVisible: true
    }

    componentWillMount() {
        Operation._this = this;
        //获取运营中的路线
        NavData
            .getLineCommute
            .call(this, "running");
        //获取已取消运营的路线
        NavData
            .getLineCommute
            .call(this, "cancel");
    }
    handlePanelClick(type) {
        switch (type) {
            case "delete":
                if (this.isSelectedRows()) {
                    Modal.warning({
                        content: "确定删除吗？",
                        onOk: () => {
                            request({
                                url: "/api/line/commute",
                                method: "delete",
                                data: {
                                    line_id: this.state.selectedRows[0].id
                                }
                            }).then(data => {
                                console.log(data)
                            });
                        },
                        maskClosable: true,
                        okText: "确定",
                        cancelText: "取消"
                    });

                }
                break;
            case "add":
                break;
            case "modify":
                console.log("modify");
                if (this.isSelectedRows()) {
                    //util.setSessionStorage('editLine', this.state.selectedRows[0]);
                    hashHistory.push('/line/index/edit/' + this.state.selectedRows[0].id);
                }
                break;
            case "search":
                this.setState({
                    searchVisible: !this.state.searchVisible
                });
                break;
            default:
                console.log()
        }
    }
    handleRunningTableChange(pagination, filters) {
        NavData
            .getLineCommute
            .call(this, "running", pagination, this.state.query_name, filters.lineModel && filters.lineModel[0] || "");
    }
    handleCancelTableChange(pagination) {
        NavData
            .getLineCommute
            .call(this, "cancel", paginationthis.state.query_name, filters.lineModel && filters.lineModel[0] || "");
    }
    searchCommute(value) {
        NavData
            .getLineCommute
            .call(this, this.state.curTab, {
                current: 1,
                pageSize: 10
            }, value);
        this.setState({query_name: value});
    }
    onTabsChange(key) {
        this.setState({curTab: key});
    }
    onUpdateSubLine(record) {
        return request({
            url: "/api/line/intercity/subline",
            method: "post",
            data: {
                sub_line_id: record.lineId,
                start_time: "2016-01-01 " + record.startTime + ":00",
                status: record.status === 'cancel'
                    ? 'running'
                    : 'cancel'
            }
        });
    }
    render() {
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
                key: 'lineModel',
                render: (text) => commonConfig.lineModeMap[text],
                filters: commonConfig.lineModeList,
                filterMultiple: false
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
                key: "isSupportSZT",
                render: text => text
                    ? '支持'
                    : '不支持'
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
                        onConfirm={lineStatusChange.bind(this, record, 'cancel', 'running')}
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
                key: 'lineModel',
                render: (text) => commonConfig.lineModeMap[text],
                filters: commonConfig.lineModeList,
                filterMultiple: false
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
                key: "isSupportSZT",
                render: text => text
                    ? '支持'
                    : '不支持'
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
                        onConfirm={lineStatusChange.bind(this, record, 'preparerunning', 'cancel')}
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
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {},
            onSelect: (record, selected, selectedRows) => {},
            onSelectAll: (selected, selectedRows, changeRows) => {}
        };

        const props = {
            name: 'file',
            //action: "http://192.168.1.109:8080/ydbus-admin/api/lineplan/import_ss",
            data: {
                month: "ssss",
                file_name: "fasdfasd"
            },
            action: request.theURL + "/api/lineplan/import_ss",
            beforeUpload(file) {
                console.log(props.data);
                var file_name = file.name;
                var month = '';
                var reg = /[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;

                var matchArr = file_name.match(reg);
                if (matchArr) {
                    month = matchArr[0];
                    props.data.month = month;
                    props.data.file_name = file_name;
                } else {
                    message.error('文件名称必须包含年月格式，"YYYY-MM-DD"');
                    return false;
                }
                return true;
            },
            onChange(info) {

                if (info.file.status === 'done') {
                    // message.success(`${info.file.name} file uploaded successfully`);
                    try {
                        var data = info.file.response;
                        if (data.status === '200') {
                            message.success("线路导入成功");
                        } else {
                            message.error('上传失败,请联系管理员~');
                        }
                        //console.log(JSON.parse(info.file.response))
                    } catch (error) {
                        console.log(error);
                    }

                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
        };

        return (
            <div >
                <Main.ControlPanel
                    dataSource={{
                    iconURL: require('../../assets/images/icon/icon白/icon-运营管理.png'),
                    name: "线路运营",
                    onBack: () => {
                        hashHistory.push('/business');
                    }
                }}/>

                <div className={styles.content}>
                    <Main.LeftNav dataSource={NavData} activeItem="/intercity/operation"/>
                    <div className={styles.rightContent}>
                        <div className={styles.tablePanel}>
                            <img
                                src={require("../../assets/images/icon/搜索.png")}
                                onClick={this
                                .handlePanelClick
                                .bind(this, "search")}/>
                        </div>
                        <div
                            className={classnames({
                            "displayNone": !this.state.searchVisible
                        })}>
                            <Main.TitleMod modName="查询">
                                <div className={styles.filters}>
                                    <div className={styles.controlBarWrapper}>
                                        <div className={styles.filter}>
                                            关键词： {/*<Input
                                        className={styles.selectInput}
                                        onChange={this.onQueryNameChange} />*/}
                                            <Search
                                                placeholder=""
                                                style={{
                                                width: "200px"
                                            }}
                                                onSearch={this
                                                .searchCommute
                                                .bind(this)}/>
                                            <span></span>
                                            <Upload {...props}>
                                                <Tooltip
                                                    placement="right"
                                                    title="导入的文件必须是.xls文件，且文件名需要带上日期。例如：城际线路_ 2017-08-01.xls">

                                                    <Button><Icon type="upload"/>导入线路</Button>

                                                </Tooltip>
                                            </Upload>

                                        </div>
                                    </div>
                                    {/* <div className={styles.controlBarWrapper}>
                                    <div className={styles.filter}>
                                        <MonthPicker />
                                        <span> </span>

                                    </div>
                                </div> */}
                                </div>
                            </Main.TitleMod>
                        </div>
                        <Tabs
                            defaultActiveKey="running"
                            activeKey={this.state.curTab}
                            onChange={this
                            .onTabsChange
                            .bind(this)}>
                            <TabPane tab="当前运营线路" key="running">
                                <Main.TitleMod>
                                    <Table
                                        rowKey={record => record.id}
                                        expandedRowRender={expandSubLine}
                                        dataSource={this.state.runningLines}
                                        columns={columnsRunning}
                                        pagination={this.state.runningPagination}
                                        onChange={this
                                        .handleRunningTableChange
                                        .bind(this)}
                                        loading={this.state.loading}/>
                                </Main.TitleMod>
                            </TabPane>
                            <TabPane tab="已取消运营线路" key="cancel">
                                <Main.TitleMod>
                                    <Table
                                        rowKey={record => record.id}
                                        expandedRowRender={expandSubLine}
                                        dataSource={this.state.cancelLines}
                                        pagination={this.state.cancelPagination}
                                        onChange={this
                                        .handleCancelTableChange
                                        .bind(this)}
                                        columns={columnsCancel}
                                        loading={this.state.loading}/>
                                </Main.TitleMod>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div >
        );
    }
}
//车票管理
Operation.Ticket = class Ticket extends React.Component {
    state = {
        the_line_id: this.props.params.id,
        line_id: "",
        line_info: {}
    }
    componentWillMount() {
        //获取线路信息
        if (this.state.the_line_id) {
            var line_id_s = this
                .state
                .the_line_id
                .split('_');
            var line_id = line_id_s[0];
            var sub_line_id = line_id_s[1];
        } else {
            return;
        }

        request({
            url: "/api/line/intercity/subline",
            data: {
                line_id: line_id
            }
        }).then(data => {
            if (data.status === '200') {
                var line_info = data.data.subLineList[0];
                //var line_id = line_info && line_info.id;

                this.setState({line_info: line_info, line_id: sub_line_id});
            } else {
                message.error(data.msg);
            }
        });
    }

    render() {
        const {line_info} = this.state;

        return (
            <div>
                <Main.ControlPanel
                    dataSource={{
                    name: "车票管理"
                }}/>

                <div className={styles.noNavContent}>
                    <Main.TitleMod modName="">
                        <div
                            style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <h4 className={styles.lineName}>{line_info.lineName}</h4>
                        </div>
                        <LineDetail lineEdit={line_info}/>
                    </Main.TitleMod>
                    <div>
                        <MyCalendar lineId={this.state.line_id}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Operation;