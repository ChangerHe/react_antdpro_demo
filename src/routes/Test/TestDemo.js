import React from 'react';
import {Button, notification, Card } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Charts from 'ant-design-pro/lib/Charts';
import {Pie, yuan} from 'ant-design-pro/lib/Charts';

export default class NewPage extends React.Component {
  state = {
    value: 'test',
    salesPieData: [
      {
        x: '家用电器',
        y: 4544,
      },
      {
        x: '食用酒水',
        y: 3321,
      },
      {
        x: '个护健康',
        y: 3113,
      },
      {
        x: '服饰箱包',
        y: 2341,
      },
      {
        x: '母婴产品',
        y: 1231,
      },
      {
        x: '其他',
        y: 1231,
      }
    ]
  };

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  prompt = () => {
    notification.open({
      message: 'We got value:',
      description: <span dangerouslySetInnerHTML={{ __html: this.state.value }}></span>,
    });
  };

  render() {
    return (
      <div>
        <Card title="富文本编辑器">
          <ReactQuill value={this.state.value} onChange={this.handleChange} />
          <Button style={{ marginTop: 16 }} onClick={this.prompt}>Prompt</Button>
        </Card>
        <Pie
          hasLegend
          title="销售额"
          subTitle="销售额"
          total={yuan(this.state.salesPieData.reduce((pre, now) => now.y + pre, 0))}
          data={this.state.salesPieData}
          valueFormat={val => yuan(val)}
          height={294}
        />
      </div>
    );
  }
}