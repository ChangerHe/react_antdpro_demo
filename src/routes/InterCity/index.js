import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';

export default class InterCity extends Component {


  render() {


    return (
        <Input type='text'/>
    );
  }
}
