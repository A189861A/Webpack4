# Webpack4
> 本项目主要基于 webpack4 的单页面和多页面的实践。单页面加入了 React + Typescript ，具体可以查阅项目代码

### 项目运行

```bash
# 克隆储存库
$ git@github.com:liandao0815/Webpack4.git

# 切换到指定项目
$ cd webpack4/webpack4_spa
# 或者
$ cd webpack4/webpack4_mpa

# 安装项目依赖
$ yarn
# 或者
$ npm install

# 本地开发调试
$ yarn dev
# 或者
$ npm run dev

# 项目打包
$ yarn build
# 或者
$ npm run build
```

### 项目说明

- webpack4 的安装和之前版本不同，需要额外安装 `webpack-cli`
- 运行 webpack4 需要在在命令行指定具体的`mode` ，可以为`development`或者`production`，也可在webpack的配置文件中指定，否则会产生警告
- webpack4 优化并新增了一些特性，可以参考-->[此处](https://github.com/webpack/webpack/issues/6357)，或者可以查看该项目源码，有相关的注释

