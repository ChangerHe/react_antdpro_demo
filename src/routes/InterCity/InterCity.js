import React, {Component} from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import {connect} from 'dva';
import {Input, Button} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {getRoutes} from '../../utils/utils';
import styles from './InterCity.less'

@connect()
export default class InterCity extends Component {
  render() {
    // const tabList = [
    //   {
    //     key: 'edit',
    //     tab: '编辑线路'
    //   }, {
    //     key: 'prepare',
    //     tab: '运营准备'
    //   }
    // ];

    const mainSearch = (
      <div style={{
        textAlign: 'center'
      }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{
          maxWidth: 522,
          width: '90%'
        }}/>
      </div>
    );

    const {match, routerData, location} = this.props;
    const routes = getRoutes(match.path, routerData);
    console.log(match)

    return (
      <div>
        <PageHeaderLayout
          title="搜索列表"
          content={mainSearch}>
          <Switch>
            {routes.map(item => (<Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}/>))
            }
          </Switch>
        </PageHeaderLayout>
      </div>
    );
  }
}
