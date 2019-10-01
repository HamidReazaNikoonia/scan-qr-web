<script>
export default {
  page: {
    title: 'Landing',
    meta: [{ name: 'description', content: 'Landing' }],
  },
}
</script>

<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12">
        <div class="d-flex card">
          <div class="card_item mt-5">SANAZ JOONI ❤️❤️</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.card {
  width: 100%;
  min-height: 300px;
  background-image: url('./../../assets/images/810.jpg');
  background-size: contain;
  flex-direction: column;
}

.card_item {
  background-color: black;
  mix-blend-mode: multiply;
  color: yellow;
  font-size: 9rem;
  padding-left: 10px;
  font-weight: bolder;
  align-self: center;
  line-height: 100px;
  width: 60%;
  height: 100%;
}
</style>
