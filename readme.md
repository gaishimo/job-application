
## Prerequisite

Please install yarn

```
npm install -g yarn
```


## Install

```
yarn install
```

## Build

```
yarn build
```


## Entry Site

```
cd packages/entry-site
```

### Start Dev Server

```
yarn start
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


### Run Emulator

```
yarn emulator
```

### Deploy

```
yarn functions:deploy
```


