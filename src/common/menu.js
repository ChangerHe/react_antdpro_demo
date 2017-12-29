const menuData = [
  //   name: 'dashboard',   icon: 'dashboard',   path: 'dashboard',   children: [{
  //     name: '分析页',     path: 'analysis',   }, {     name: '监控页',     path:
  // 'monitor',   }, {     name: '工作台',     path: 'workplace',     // hideInMenu:
  // true,   }], }, {   name: '表单页',   icon: 'form',   path: 'form',   children:
  // [{     name: '基础表单',     path: 'basic-form',   }, {     name: '分步表单', path:
  // 'step-form',   }, {     name: '高级表单',     path: 'advanced-form',   }], }, {
  // name: '列表页',   icon: 'table',   path: 'list',   children: [{     name:
  // '查询表格',     path: 'table-list',   }, {     name: '标准列表',     path:
  // 'basic-list',   }, {     name: '卡片列表',     path: 'card-list',   }, { name:
  // '搜索列表',     path: 'search',     children: [{       name: '搜索列表（文章）',    path:
  // 'articles',     }, {       name: '搜索列表（项目）',       path: 'projects',     },
  // {       name: '搜索列表（应用）',       path: 'applications',     }],   }], }, {
  // name: '详情页',   icon: 'profile',   path: 'profile',   children: [{ name:
  // '基础详情页',     path: 'basic',   }, {     name: '高级详情页',     path: 'advanced',
  // }], }, {   name: '结果页',   icon: 'check-circle-o',   path: 'result', children:
  // [{     name: '成功',     path: 'success',   }, { name: '失败', path: 'fail',
  // }], }, {   name: '异常页',   icon: 'warning', path: 'exception',   children: [{
  //    name: '403',     path: '403',   }, {  name: '404', path: '404',   }, {
  // name: '500',     path: '500',   }, {     name: '触发异常',     path: 'trigger',
  // }], }, {   name: '账户',   icon: 'user',   path: 'user',   children: [{
  // name: '登录',     path: 'login', }, {     name: '注册',     path: 'register',
  // }, {     name: '注册结果',     path: 'register-result',   }], }, {   name:
  // '使用文档',   icon: 'book',   path: 'http://pro.ant.design/docs/getting-started',
  //   target: '_blank', },
  {
    name: '城际业务', // 页面名称，会展示在菜单栏中
    path: 'intercity', // 匹配的路由
    icon: 'home', // 页面图标，会展示在菜单栏中
    children: [
      {
        name: '线路规划',
        path: 'index'
      }, {
        name: '线路运营',
        path: 'operation'
      }
    ]
  }, {
    name: '班车业务', // 页面名称，会展示在菜单栏中
    path: 'line', // 匹配的路由
    icon: 'dashboard', // 页面图标，会展示在菜单栏中
    children: [
      {
        name: '线路规划',
        path: 'index'
      }, {
        name: '线路运营',
        path: 'operation'
      }, {
        name: '评价信息管理',
        path: 'order'
      }
    ]
  }, {
    name: 'APP控制', // 页面名称，会展示在菜单栏中
    path: 'appcontrol', // 匹配的路由
    icon: 'setting', // 页面图标，会展示在菜单栏中
    children: [
      {
        name: '重要通知',
        path: '404'
      }, {
        name: '活动公告',
        path: '404'
      }, {
        name: '版本升级',
        path: '404'
      }, {
        name: '投诉建议',
        path: '404'
      }, {
        name: 'app模块控制',
        path: '404'
      }, {
        name: '订单管理',
        path: '404'
      }, {
        name: '退款管理',
        path: '404'
      }, {
        name: '优惠券管理',
        path: '404'
      }, {
        name: '需求管理',
        path: '404'
      }, {
        name: '短信发送',
        path: '404'
      }, {
        name: '日历管理',
        path: '404'
      }, {
        name: '订单管理(双平台)',
        path: '404'
      }, {
        name: '紧急事件处理通知(双平台)',
        path: '404'
      }
    ]
  }, {
    name: '基础信息', // 页面名称，会展示在菜单栏中
    path: 'basicdata', // 匹配的路由
    icon: 'calculator', // 页面图标，会展示在菜单栏中
    children: [
      {
        name: '车辆管理',
        path: 'basic-form'
      }, {
        name: '站点管理',
        path: 'step-form'
      }, {
        name: '驾驶员管理',
        path: 'step-form'
      }, {
        name: '场站管理',
        path: 'step-form'
      }
    ]
  }, {
    name: '包车业务', // 页面名称，会展示在菜单栏中
    path: 'charter', // 匹配的路由
    icon: 'car', // 页面图标，会展示在菜单栏中
    children: [
      {
        name: '班次管理',
        path: 'index(/:charter_order_id)'
      }, {
        name: '订单管理',
        path: 'lineplan(/:charter_order_id)'
      }
    ]
  }, {
    name: '报表统计', // 页面名称，会展示在菜单栏中
    path: 'report', // 匹配的路由
    icon: 'profile', // 页面图标，会展示在菜单栏中
    children: [
      {
        name: '运营数据报表',
        path: 'index'
      },
      {
        name: '财务报表',
        path: 'finance'
      },
      {
        name: '线路基础信息表',
        path: 'linebasic'
      },
    ]
  }, {
    name: '旅游业务', // 页面名称，会展示在菜单栏中
    path: 'tour', // 匹配的路由
    icon: 'exception', // 页面图标，会展示在菜单栏中
    children: [
      {
        name: '大鹏套餐',
        path: 'dapeng'
      }
    ]
  }
];

function formatter(data, parentPath = '') {
  const list = [];
  data.forEach((item) => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`)
      });
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`
      });
    }
  });
  return list;
}

export const getMenuData = () => formatter(menuData);
