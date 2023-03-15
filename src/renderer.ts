import { desktopCapturer } from 'electron';

// 獲取本地視頻流
async function getLocalStream() {
  const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });

  return navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      // ts 報錯 `類型 'MediaTrackConstraints' 中沒有 'mandatory'`
      // mandatory: {
      //   chromeMediaSource: 'desktop',
      //   chromeMediaSourceId: sources[0].id
      // },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  });
}

// 顯示本地視頻流
async function showLocalStream() {
  const localStream = await getLocalStream();
  const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
  localVideo.srcObject = localStream;
}

// 開始 WebRTC 連接
async function startWebRTC() {
  const pc = new RTCPeerConnection();
  const localStream = await getLocalStream();
  const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
  pc.ontrack = event => remoteVideo.srcObject = event.streams[0];
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  // 將 offer 通過信令服務傳遞給對方
}

showLocalStream();
startWebRTC();
