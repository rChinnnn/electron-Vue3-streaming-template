<template>
  <div>
    <video ref="videoRef" autoplay></video>
    <video v-if="remoteStream" ref="remoteVideoRef" autoplay></video>
    <button @click="onShareScreen">Share Screen</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import SimplePeer from 'simple-peer/simplepeer.min.js';

export default defineComponent({
  name: "ScreenSharing",

  setup() {
    const videoRef = ref<HTMLVideoElement | null>(null);
    const remoteVideoRef = ref<HTMLVideoElement | null>(null);
    const localStream = ref<MediaStream | null>(null);
    const remoteStream = ref<MediaStream | null>(null);
    const peer = ref<SimplePeer.Instance | null>(null);

    const initiateWebRTC = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          localStream.value = stream;
          videoRef.value!.srcObject = localStream.value;
          const p = new SimplePeer({ initiator: true, stream });
          p.on("signal", (data) => {
            peer.value?.signal(data);
          });
          p.on("stream", (stream) => {
            remoteStream.value = stream;
            remoteVideoRef.value!.srcObject = remoteStream.value;
          });
          peer.value = p;
        })
        .catch((error) => console.error(error));
    };

    const onShareScreen = () => {
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: false })
        .then((stream) => {
          localStream.value = stream;
          videoRef.value!.srcObject = localStream.value;
          peer.value?.replaceTrack(
            localStream.value.getTracks()[0],
            localStream.value.getTracks()[0],
            localStream.value
          );
        })
        .catch((error) => console.error(error));
    };

    onMounted(() => {
      initiateWebRTC();
    });

    onUnmounted(() => {
      localStream.value?.getTracks().forEach((track) => track.stop());
      remoteStream.value?.getTracks().forEach((track) => track.stop());
      peer.value?.destroy();
    });

    return {
      videoRef,
      remoteVideoRef,
      localStream,
      remoteStream,
      onShareScreen,
    };
  },
});
</script>