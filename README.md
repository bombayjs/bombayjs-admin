# BOMBAYJS-ADMIN

此项目是bombayjs后台管理系统

bombayjs是前端监控解决方案，包括bombayjs、bombayjs-server、bombayjs-admin三个项目

项目地址：

* https://github.com/bombayjs/bombayjs (web sdk)
* https://github.com/bombayjs/bombayjs-server (服务端，用于提供api)
* https://github.com/bombayjs/bombayjs-admin （后台管理系统，可视化数据等）

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

mock
```bash
npm start
```

if you are running the [server](https://github.com/bombayjs/bombayjs-server), you can run without mock

```bash
npm run start:no-mock
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```
