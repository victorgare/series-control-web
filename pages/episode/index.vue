<template>
  <!-- @waiting="onPlayerWaiting($event)" -->
  <video ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from 'video.js'
require('video.js/dist/video-js.css')

export default {
  data() {
    return {
      player: null,
      options: {
        autoplay: false,
        controls: true,
        sources: [
          {
            src: 'https://localhost:44376/api/crawler/getVideo',
            type: 'video/mp4',
          },
        ],
      },
    }
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this)
      }
    )
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>
