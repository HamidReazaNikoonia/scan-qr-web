<script>
import iconControlls from '@components/icon-controlls'

export default {
  components: { iconControlls },
  data: function() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
    }
  },
  created() {
    this.tracks = this.$store.state.track.tracks
    let vm = this
    this.currentTrack = this.tracks[0]
    this.audio = new Audio()
    this.audio.src = this.currentTrack.source
    this.audio.ontimeupdate = function() {
      vm.generateTime()
    }
    this.audio.onloadedmetadata = function() {
      vm.generateTime()
    }
    this.audio.onended = function() {
      vm.nextTrack()
      this.isTimerPlaying = true
    }

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index]
      let link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = element.cover
      link.as = 'image'
      document.head.appendChild(link)
    }
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play()
        this.isTimerPlaying = true
      } else {
        this.audio.pause()
        this.isTimerPlaying = false
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime
      this.barWidth = width + '%'
      this.circleLeft = width + '%'
      let durmin = Math.floor(this.audio.duration / 60)
      let dursec = Math.floor(this.audio.duration - durmin * 60)
      let curmin = Math.floor(this.audio.currentTime / 60)
      let cursec = Math.floor(this.audio.currentTime - curmin * 60)
      if (durmin < 10) {
        durmin = '0' + durmin
      }
      if (dursec < 10) {
        dursec = '0' + dursec
      }
      if (curmin < 10) {
        curmin = '0' + curmin
      }
      if (cursec < 10) {
        cursec = '0' + cursec
      }
      this.duration = durmin + ':' + dursec
      this.currentTime = curmin + ':' + cursec
    },
    updateBar(x) {
      let progress = this.$refs.progress
      let maxduration = this.audio.duration
      let position = x - progress.offsetLeft
      let percentage = (100 * position) / progress.offsetWidth
      if (percentage > 100) {
        percentage = 100
      }
      if (percentage < 0) {
        percentage = 0
      }
      this.barWidth = percentage + '%'
      this.circleLeft = percentage + '%'
      this.audio.currentTime = (maxduration * percentage) / 100
      this.audio.play()
    },
    clickProgress(e) {
      this.isTimerPlaying = true
      this.audio.pause()
      this.updateBar(e.pageX)
    },
    prevTrack() {
      this.transitionName = 'scale-in'
      this.isShowCover = false
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--
      } else {
        this.currentTrackIndex = this.tracks.length - 1
      }
      this.currentTrack = this.tracks[this.currentTrackIndex]
      this.resetPlayer()
    },
    nextTrack() {
      this.transitionName = 'scale-out'
      this.isShowCover = false
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++
      } else {
        this.currentTrackIndex = 0
      }
      this.currentTrack = this.tracks[this.currentTrackIndex]
      this.resetPlayer()
    },
    resetPlayer() {
      this.barWidth = 0
      this.circleLeft = 0
      this.audio.currentTime = 0
      this.audio.src = this.currentTrack.source
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      }, 300)
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited
    },
    handler(e) {
      console.log(e)
    },
  },
  page: {
    title: 'Player',
    meta: [{ name: 'description', content: 'Player' }],
  },
}
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <div class="player">
        <div class="player__top">
          <div class="player-cover" @click="handler">
            <transition-group :name="transitionName">
              <div
                v-for="(track, $index) in tracks"
                v-if="$index === currentTrackIndex"
                :key="$index"
                class="player-cover__item"
                :style="{ backgroundImage: `url(${track.cover})` }"
              ></div>
            </transition-group>
          </div>
          <div class="player-controls">
            <div
              class="player-controls__item -favorite"
              :class="{ active: currentTrack.favorited }"
              @click="favorite"
            >
              <svg class="icon">
                <use xlink:href="#icon-heart-o"></use>
              </svg>
            </div>
            <a
              :href="currentTrack.url"
              target="_blank"
              class="player-controls__item"
            >
              <svg class="icon">
                <use xlink:href="#icon-link"></use>
              </svg>
            </a>
            <div class="player-controls__item" @click="prevTrack">
              <svg class="icon">
                <use xlink:href="#icon-prev"></use>
              </svg>
            </div>
            <div class="player-controls__item" @click="nextTrack">
              <svg class="icon">
                <use xlink:href="#icon-next"></use>
              </svg>
            </div>
            <div class="player-controls__item -xl js-play" @click="play">
              <svg class="icon">
                <use v-if="isTimerPlaying" xlink:href="#icon-pause"></use>
                <use v-else xlink:href="#icon-play"></use>
              </svg>
            </div>
          </div>
        </div>
        <div ref="progress" class="progress">
          <div class="progress__top">
            <div v-if="currentTrack" class="album-info">
              <div class="album-info__name">{{ currentTrack.artist }}</div>
              <div class="album-info__track">{{ currentTrack.name }}</div>
            </div>
            <div class="progress__duration">{{ duration }}</div>
          </div>
          <div class="progress__bar" @click="clickProgress">
            <div class="progress__current" :style="{ width: barWidth }"></div>
          </div>
          <div class="progress__time">{{ currentTime }}</div>
        </div>
        <div v-cloak></div>
      </div>
    </div>

    <icon-controlls />
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.container {
  background: linear-gradient(
    60deg,
    rgba(84, 58, 183, 0.6) 0%,
    rgba(0, 172, 193, 0.1) 100%
  );
}
</style>
