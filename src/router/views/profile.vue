<script>
export default {
  page() {
    return {
      title: this.user.name,
      meta: [
        {
          name: 'description',
          content: `The user profile for ${this.user.name}.`,
        },
      ],
    }
  },
  components: {},
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    createNewLink() {
      this.$router.push('new-link')
    },
  },
}
</script>

<template>
  <div class="container-fluid">
    <div class="row mx-3">
      <div class="col-12 col-md-3">
        <div class="card" @click="createNewLink">
          Create New
        </div>
        <div class="card-menu mt-4">
          <ul>
            <li>
              <div class="bell_svg icon mr-3 mt-3"></div>
              <div>Dashboard</div>
            </li>
            <li>
              <div class="card_svg icon mr-3 mt-3"></div>
              <div>Change Password</div>
            </li>
            <li>
              <div class="folder_svg icon mr-3 mt-3"></div>
              <div>Check Activity</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-9">
        <div class="d-flex main_card_container">
          <div class="bg_svg d-flex flex-jsutify">
            <h1>Hello Sanaz</h1>
            <h3 class="pl-4">You are nice ❤️</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';
.container-fluid {
  padding-top: 90px;
}
.card {
  width: 100%;
  background-image: url('./../../assets/images/81744.jpg');
  cursor: pointer;
  text-align: center;
  line-height: 89px;
  font-size: 1.6rem;
  height: 85px;
  border-radius: 25px;
  background-position: top;
  background-size: cover;
  box-shadow: 0 2px 5px 0 #c2c2c26b;
  transition: all 1s ease-in;
}

.card-menu {
  width: 100%;
  background-color: white;
  text-align: left;
  padding-top: 50px;
  line-height: 59px;
  font-size: 0.9rem;
  height: 305px;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 2px 5px 0 #c2c2c26b;
  transition: all 1s ease-in;
}

.main_card_container {
  border-radius: 30px;
  padding: 15px;
  background-color: #ffffff;
  overflow: hidden;
}

.card-menu ul {
  list-style: none;
}

.d-flex {
  display: flex;
}

.flex-jsutify {
  text-align: left;
  flex-direction: column;
  align-items: center;
}

.card-menu ul > li {
  cursor: pointer;
  display: flex;
  flex-direction: row;
}

.card-menu ul > li:hover {
  opacity: 0.4;
}

.card:hover {
  box-shadow: 1px 1px 10px 3px #c2c2c26b;
  opacity: 0.7;
  transition: all 0.8s ease-in;
}

.icon {
  color: #000;
  background-size: contain;
  width: 27px;
  height: 27px;
}

.bell_svg {
  background-image: url('./../../assets/images/bell.svg');
}

.card_svg {
  background-image: url('./../../assets/images/card.svg');
}

.folder_svg {
  background-image: url('./../../assets/images/folder.svg');
}

.bg_svg {
  width: 100%;
  height: 240px;
  background-repeat: no-repeat;
  padding: 30px;
  background-color: white;
  background-image: url('./../../assets/images/undraw_video_streaming_yyld.svg');
  background-size: contain;
}
</style>
