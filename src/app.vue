<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

<template>
  <div id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <transition name="moveInUp">
      <RouterView :key="$route.fullPath" />
    </transition>
  </div>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

// Design variables and utilities from src/design.
@import '@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: $color-body-bg;
}
#app {
  @extend %typography-small;
}

// ===
// Base element styles
// ===

a,
a:visited {
  color: $color-link-text;
}

h1 {
  @extend %typography-xxlarge;
}

h2 {
  @extend %typography-xlarge;
}

h3 {
  @extend %typography-large;
}

h4 {
  @extend %typography-medium;
}

h5,
h6 {
  @extend %typography-small;
}

// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-link-text;
}

// ===
// Router Transitions
// ==

.moveInUp-enter-active {
  animation: fadeIn 0.9s ease-in;
}

// .moveInUp-enter-active{
//   opacity: 0;
//   transition: opacity 1s ease-in;
// }
// .moveInUp-leave-active {
//   animation: moveInUp 0.3s ease-in;
// }

@keyframes moveInUp {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50px);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
