## layouts页面布局组件

- BasicLayout：基础页面布局，包含了头部导航，侧边栏和通知栏：(项目中使用)
- BlankLayout：空白的布局
- PageHeaderLayout：带有标准 PageHeader 的布局
- UserLayout：抽离出用于登陆注册页面的通用布局(项目中使用)

## 功能页面

```
- Dashboard
  - Analytic
  - Monitor
  - Workspace
- Form
  - Basic Form
  - Step Form
  - Advanced From
- List
  - Standard Table
  - Standard List
  - Card List
  - Search List (Project/Applications/Article)
- Profile
  - Simple Profile
  - Advanced Profile
- Result
  - Success
  - Failed
- Exception
  - 403
  - 404
  - 500
- User
  - Login
  - Register
  - Register Result
```

## common

- menu 所有的页面配置信息
- router 所有路由的配置信息

通过在`menu`页面书写对象的方式, 可以在左侧的dashboard直接生成相应的链接及目录信息

```
{
  name: '新页面',             // 页面名称，会展示在菜单栏中
  path: 'new',               // 匹配的路由
  icon: 'file',              // 页面图标，会展示在菜单栏中
}
```

然后通过在`router`中的配置, 可以直接对我们在menu中配置的`path`路径进行实现跳转

```
'/new': {
  component: dynamicWrapper(app, [], () => import('../routes/Test/TestDemo')),
},
```

根据在`router`中的配置, 我们在对应的文件位置中新建一个对应的js及less文件

如果有需要, 可以再到我们的less文件中引入antd默认的样式变量

```
@import "~antd/lib/style/themes/default.less";
```

## components

components中存放的是所有的页面组件, 组件中可以再依赖于其他的组件

我们在components中新建一个组件文件夹, 并在其中新建一个index.js和index.less文件, 如果还有其他复用组件的需求, 可以在这个文件夹中再新建一个文件夹, 放入其他的文件组件

大概的伪代码如下

```
// MainComponent.js
export default ({ ... }) => (...);

// SubComponent1.js
export default ({ ... }) => (...);

// SubComponent2.js
export default ({ ... }) => (...);

// index.js
import MainComponent from './MainComponent';
import SubComponent1 from './SubComponent1';
import SubComponent2 from './SubComponent2';

MainComponent.SubComponent1 = SubComponent1;
MainComponent.SubComponent2 = SubComponent2;
export default MainComponent;
```

现在我们可以在我们的`index.js`文件中写入需要的组件的dom

```
// index.js
import React from 'react';
import styles from './index.less';    // 按照 CSS Modules 的方式引入样式文件。

export default ({ src, desc, style }) => (
  <div style={style} className={styles.imageWrapper}>
    <img className={styles.img} src={src} alt={desc} />
    {desc && <div className={styles.desc}>{desc}</div>}
  </div>
);
```

同样的, 我们在`index.less`中书写我们需要的样式

```
// index.less
.imageWrapper {
  padding: 0 20px 8px;
  background: #f2f4f5;
  width: 400px;
  margin: 0 auto;
  text-align: center;
}

.img {
  vertical-align: middle;
  max-width: calc(100% - 32px);
  margin: 2.4em 1em;
  box-shadow: 0 8px 20px rgba(143, 168, 191, 0.35);
}
```

到这里, 组件就已经成功创建出来, 并暴露了, 现在可以在其他文件中引用这个组件

```
import React from 'react';
import ImageWrapper from '../../components/ImageWrapper';  // 注意保证引用路径的正确

export default () => (
  <ImageWrapper
    src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
    desc="示意图"
  />;
)
```

## 框架中的样式书写问题

因为react中默认配置了`css module`的书写方案, 我们每次写的css文件或者相应的css预编译文件都是会默认加上一个hash后缀的, 所以我们不需要担心因为css文件的命名而产生的样式污染问题

```
// example.js
import styles from './example.less';

export default ({ title }) => <div className={styles.title}>{title}</div>;
```

但是, 当我们需要一个全局的样式怎么办呢? 这个时候可以使用一个全局的样式

```
/* 定义全局样式 */
:global(.text) {
  font-size: 16px;
}

/* 定义多个全局样式 */
:global {
  .footer {
    color: #ccc;
  }
  .sider {
    background: #ebebeb;
  }
}
```

但是`css module`并不是万能钥匙, 它只对简单的`id`选择器和`class`选择器有效, 所以我们需要复杂选择器的时候会出现问题, 不建议这样做

#### 全局样式

因此, 我们可以在`src/index.less`这个文件中定义一些全局需要的样式, 他会显示到全局上

#### 工具类样式

当我们需要一些工具类的样式函数供调用的时候, 可以将这些样式书写在`src/utils/utils.less`文件中

#### 通用模块级样式

例如 `src/layouts/BasicLayout.less`，里面包含一些基本布局的样式，被 `src/layouts/BasicLayout.js` 引用，项目中使用这种布局的页面就不需要再关心整体布局的设置。如果你的项目中需要使用其他布局，也建议将布局相关的 `js` 和 `less` 放在这里 `src/layouts`。

#### 页面级样式

具体页面相关的样式，例如 `src/routes/Dashborad/Monitor.less`，里面的内容仅和本页面的内容相关。一般情况下，如果不是页面内容特别复杂，有了前面全局样式、通用模块样式的配合，这里要写的应该不多。

#### 覆盖组件样式

由于业务的个性化需求，我们经常会遇到需要覆盖组件样式的情况，这里举个简单的例子。

antd Select 在多选状态下，默认会展示所有选中项，这里我们给它加一个限制高度，超过此高度就出滚动条。

那么书写的方式就是这样子

```
.customSelect {
  :global {
    .ant-select-selection {
      max-height: 51px;
      overflow: auto;
    }
  }
}
```

## 和服务器的交互

#### 前端请求流程

在 Ant Design Pro 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

- UI 组件交互操作；
- 调用 model 的 effect；
- 调用统一管理的 service 请求函数；
- 使用封装的 request.js 发送请求；
- 获取服务端返回；
- 然后调用 reducer 改变 state；
- 更新 model。

#### 通过`.roadhogrc.mock.js`来模拟数据和处理请求的交互

在`.roadhogrc.mock.js`文件中, 定义了各种请求的方式及数据的接收, 我们可以通过这个来实现数据的mock

## 特别注意

因为我们直接使用这个脚手架是没有办法直接使用到类似于`antd-pro`的图表等的功能的, 所以在这个情况下我们必须要先将该依赖引入进来

```
cnpm install ant-design-pro --save
```












