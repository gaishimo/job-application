
## About this

This is an example repository of job application system.

Features:
- Job Application Form
- Admin Site


Technologies:
- TypeScript
- yarn workspaces
- Firebase (Firestore, Functions, Hosting)
- React
- Webpack
- Emotion


## Setup

### Install yarn

```
npm install -g yarn
```

### Install expo cli (If you use mobile app)

```
npm install -g expo-cli
```

### Install expo client app (If you use mobile app)

Refer https://docs.expo.io/get-started/installation/#2-mobile-app-expo-client-for-ios.


### Create and configure a firebase project

https://console.firebase.google.com/

- Add a web app and copy sdk configurations
- Authentication: Enable Email/Password on Sign-in method and create a test user
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

### Deploy firestore rules


```
yarn deploy:firestore-rules
```

## Deploy


Login to firebase in advance.

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

### Publish entry-mobile

```
yarn publish:entry-mobile
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

### Start entry-mobile


```
yarn start:entry-mobile
```

