
## Setup

### Install yarn

```
npm install -g yarn
```

### Create and configure a firebase project

https://console.firebase.google.com/

- Add a web app and copy sdk configurations
- Authentication: Enable Email/Password on Sign-in method
- Database: Create a Firestore database
- Hosting: Enable Hosting and add another site (for admin-site)

### Install packages

```
yarn install
```

### Set Environmenal variables in .npmrc

```
cp .npmrc-template .npmrc
# Please edit .npmrc
```

### Prepare .firebaserc

```
cp .firebaserc-template .firebaserc
# Please edit .firebaserc
```


### Build

```
yarn build
```

### Deploy storage rules


```
yarn deploy:firestore-rules
```

## Deploy


Execute the following in advance.

```
npx firebase login
```

### Deploy functions

```
yarn functions:config:set
yarn deploy:functions
```

### Deploy entry-site

```
yarn deploy:hosting:entry-site
```

### Deploy admin-site

```
yarn deploy:hosting:admin-site
```



## Development

### Run Emulator (for running functions and firestore on local)

```
yarn emulator
```

### Start entry-site

```
yarn start:entry-site
```

http://127.0.0.1:8080

### Start admin-site

```
yarn start:admin-site
```

http://127.0.0.1:9080



