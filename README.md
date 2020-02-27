# react-native-instagram-media
⚛️ An &lt;InstagramMedia /> component for React Native.

## This project still a work in progress
You can already download it and use it as such:

```js
import { instagramMediaParser } from 'react-native-instagram-media'

instagramMediaParser({ uri: 'https://www.instagram.com/p/B866lKJgReK/' })
  .then(post => console.log(post))
```