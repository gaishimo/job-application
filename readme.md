
## Prerequisite

Please install yarn

```
npm install -g yarn
```


## Install

```
yarn install
```


## Entry Site

```
cd packages/entry-site
```

### Start Dev Server

```
yarn start
```

### Build

```
yarn build
```

## functions


.envファイルを用意

```
cp packages/functions/.env.sample packages/functions/.env
# 内容を編集
```

### config:set (function config値の設定)

```
yarn functions:config:set
```

### Build

```
yarn build
```

### Run Emulator

```
yarn emulator
```

### Deploy

```
yarn functions:deploy
```


