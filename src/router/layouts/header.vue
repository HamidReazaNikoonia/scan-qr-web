<script>
export default {
  data: function() {
    return {
      fullScreenDisplay: false,
      activedTab: 'Home',
      indexItem: 1,
      svgIcon: [
        {
          svg: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
            />
            </svg>`,
          title: 'Home',
        },
        {
          svg: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
            />
          </svg>`,
          title: 'Files',
        },
        {
          svg: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>`,
          title: 'Profile',
        },
        {
          svg: ` <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"
            />
            </svg>`,
          title: 'player',
        },
        {
          svg: ` <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
            /></svg>`,
          title: 'newlink',
        },
      ],
    }
  },
  watch: {
    fullScreenDisplay: function() {
      if (this.fullScreenDisplay === true) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
  },
  methods: {
    fullScreenMenuAppear() {
      this.fullScreenDisplay = !this.fullScreenDisplay
    },
    generateTitle(title) {
      switch (title) {
        case 'Home':
          return 'خانه'
          break
        case 'Files':
          return 'فایل ها'
          break
        case 'player':
          return 'پلیر'
          break
        case 'Profile':
          return 'داشبورد'
          break
        case 'newlink':
          return 'ایجاد لینک'
          break
      }
    },
    setTab(tab) {
      console.log(tab)
      console.log(tab)
      console.log(tab)
      console.log(tab)
      console.log(tab.toLowerCase())
      const routeName = tab === 'Home' ? '' : tab.toLowerCase()
      this.$router.push({
        path: `/${routeName}`,
      })
      this.activedTab = tab
    },
  },
}
</script>

<template>
  <div :class="['container_']">
    <div v-if="fullScreenDisplay" class="menu-full-screen">
      <div @click="fullScreenMenuAppear">X</div>
    </div>
    <ul>
      <span class="hamburger-menu">
        <img
          src="./../../assets/images/menu.svg"
          @click="fullScreenMenuAppear"
        />
      </span>
      <li
        v-for="(tab, index) in svgIcon"
        :key="index"
        :data-active="activedTab == tab.title"
        @click="setTab(tab.title)"
      >
        <div class="icon" v-html=""> </div>
        <div style="font-weight:500" class="font-iranSans text">
          {{ generateTitle(tab.title) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.container_ {
  position: absolute;
  // left: 50%;
  // transform: translateY(-90%);
  min-width: 100vw;
  margin: 0 auto;
  transition: all 0.6s ease-in-out;
}

.container_ ul {
  padding: 14px 11px 10px;
}

ul {
  list-style: none;
  background-color: white;
  margin: 0;
  padding: 2.5rem calc(2.5rem / 2);
  position: relative;
  padding-right: calc(90px + 2.5rem / 2);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-auto-flow: column;
}

li {
  position: relative;
}
li > * {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 0;
}
li .icon {
  z-index: 100;
  justify-content: center;
  width: 60px;
  cursor: pointer;
  text-align: center;
  opacity: 0.3;
  transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
  transition-property: opacity, transform, -webkit-transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
li .text {
  position: absolute;
  left: 0;
  top: 0;
  color: rgb(53, 13, 80);
  opacity: 1;
  width: 90px;
  margin-left: 60px;
  pointer-events: none;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  height: 100%;
  font-size: 0.9rem;
  font-weight: bold;
}
li[data-active] .text {
  opacity: 0.3;
}

[data-active] ~ li .icon {
  -webkit-transform: translatex(calc((1 * 1px) + 90px));
  transform: translatex(calc((1 * 1px) + 90px));
}

ul .hamburger-menu {
  display: none;
}

.menu-full-screen {
  // display: none;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
  z-index: 9999999;
  position: fixed;
  top: 0;
  left: 0;
}

@media only screen and (max-width: 700px) {
  ul > li {
    display: none;
  }

  ul .hamburger-menu {
    display: block;
    opacity: 0.3;
    cursor: pointer;
    transition: all 0.6s ease-in;
  }

  ul .hamburger-menu:hover {
    opacity: 1;
    transition: all 0.6s ease-in;
  }

  .hamburger-menu > img {
    width: 100%;
    height: auto;
    max-width: 30px;
    float: right;
  }
}
</style>
