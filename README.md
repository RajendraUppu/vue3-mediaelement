# vue3-mediaelement Js Video Player

MediaElement Js video player for Vue 3 and Nuxt 3 (Integrate Package as a client-side Plugin), Inspired By vue-mediaelement player.

## Install

```bash
$ npm install vue3-mediaelement
```

## Import

### Import using module

Import components to your project:

```js
require("vue3-mediaelement/dist/style.css");

// in ES6 modules SFC component
import { Mediaelement } from "vue3-mediaelement";

// in CommonJS
const { Mediaelement } = require("vue3-mediaelement");

// in Global variable
const { Mediaelement } = VueMediaelement;
```

You can also register Mediaelement component as a Global component across the app (recommended):

```js
import { createApp } from "vue";
import App from "./App.vue";
import Mediaelement from "vue3-mediaelement";
import "vue3-mediaelement/dist/style.css";

const app = createApp(App);
app.use(Mediaelement);
app.mount("#app");
```

### Import using script tag

```html
<link
  rel="stylesheet"
  href="../node-modules/vue3-mediaelement/dist/style.css"
  charset="utf-8"
/>
<script src="../node-modules/vue3-mediaelement/dist/vue3-mediaelement.js"></script>
```

## Usage

on Vue Component after Global Component Registration Just include MediaElement with Props Defined below.

```vue
<mediaelement
  width="500"
  height="300"
  source="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
></mediaelement>
```

```

## Options

### Props

| Option | Type | Description | Default |
| ----- | ----- | ----- | ----- |
| source | String | Specifies the URL of the video file; this value can also be indicated with source tags (refer to the Multiple Codecs section for more information) | '' |
| width | String | Sets the width of the video player in pixels; you can also indicate percentages | 480 |
| height | String | Sets the height of the video player in pixels; you can also indicate percentages | 270 |
| preload | String | Specifies if and how the author thinks the video should be loaded when the page loads; possible values: `auto`, `metadata` or `none` (recommended) | none | (Upcoming Feature)
| autoplay | Boolean | Specifies that the video will start playing as soon as it is ready | false | (Upcoming Feature)
| forceLive | Boolean | If set to true, the Live Broadcast message will be displayed and progress bar will be hidden, no matter if duration is a valid number | true | (Upcoming Feature)

### Events

| Event Name | Type | Description |
| ----- | ----- | ----- |
| success | callback | Action(s) that will be executed as soon as the source is loaded; passes 2 arguments: media (the wrapper that mimics all the native events/properties/methods for all renderers) and node (the original HTML video, audio or iframe tag where the media was loaded originally; if html5 is being used, media and node are the basically the same) |
| error | callback | Action(s) that will be executed if source doesn't load for any reason. Passes same arguments as success |
```

Hope This Package Helped you integrating MediaElement JS into Your Vue 3 or Nuxt 3 Application.

I know there are alot of Optimization and Features to be added, ill try to add them as soon as possible.

## Author

Rajendra Uppu

## License

MIT
