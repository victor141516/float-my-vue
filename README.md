<img width="300" alt="image" align="left" src="https://user-images.githubusercontent.com/5548950/236342921-71cc0711-fad6-48a1-ab87-f24c79fe24f8.png">

# Float My Vue

Float My Vue is a lightweight and versatile Vue.js library that simplifies the positioning and handling of floating elements such as tooltips, popovers and more.

<details>
  <summary>Video example</summary>
  <video loop autoplay width="100" src="https://user-images.githubusercontent.com/5548950/236342380-a775553a-e717-4748-aa85-3528b5e185a2.mov" />
</details>

## Features

- Automatic positioning and repositioning of floating elements
- Fully customizable
- Easy integration with existing Vue projects
- Built-in accessibility features
- Slot support for custom content
- Responsive design

## Installation

Install the package using npm:

```bash
npm install float-my-vue
```

## Setup

Import `FloatMyVue` in the components where you would like to use it:

```js
import { FloatMyVue } from 'float-my-vue';
```

And import the styles in the main file of your project (or wherever you prefer while making sure that the styles are loaded before the component is used):

```js
import 'float-my-vue/style.css';
```

## Usage

### Basic Usage

By default you can use the component with some styled content:

```html
<FloatMyVue side="right">
    <template #reference>Open!</template>
    <template #content>Content</template>
</FloatMyVue>
```

Also you can use a light theme:

```html
<FloatMyVue side="right" color="light">
    <template #reference>Open!</template>
    <template #content>Content</template>
</FloatMyVue>
```

### Customization

You can change the position of the floating element:

```html
<FloatMyVue side="right" side="right"> <!-- left, top, bottom -->
    <template #reference>Open!</template>
    <template #content>Content</template>
</FloatMyVue>
```

You can change the size of the arrow:

```html
<FloatMyVue side="right" :arrow-size="50">
    <template #reference>Open!</template>
    <template #content>Content</template>
</FloatMyVue>
```

You can adjust the position of the floating element:

```html
<FloatMyVue side="right" :offset="{ x: 123, y: 321 }">
    <template #reference>Open!</template>
    <template #content>Content</template>
</FloatMyVue>
```

You can control the open/close state externally:

```html
<FloatMyVue side="right" :open="true">
    <template #reference>Open!</template>
    <template #content>Content</template>
</FloatMyVue>
```

### Slots

There are slots that allow you to customize the content:

```html
<FloatMyVue side="right" color="light">
    <template #reference>Open!</template>
    <template #arrow>⬇️</template>
    <template #float>This doesn't look good</template>
</FloatMyVue>
```