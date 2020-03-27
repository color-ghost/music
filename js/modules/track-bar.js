import Playlist from './playlist.js';

const TrackBar = (_ => {

  const trackBarEl = document.querySelector('.track-bar');
  const trackBarFillEl = document.querySelector('.track-bar__fill');

  let fillWidth;

  const init = _ => {
    fillWidth = 0;
    render();
  }

  const listeners = _ => {
    trackBarEl.addEventListener('click', event => {
      const position = event.offsetX / trackBarEl.offsetWidth;
      Playlist.currentTrack.currentTime = position * Playlist.currentTrack.duration;
    })
  }

  const render = _ => {
    trackBarFillEl.style.width = `${fillWidth}%`;
  }

  const getPercent = (current, full) => (current/full) * 100;

  const setWidth = track => {
    fillWidth = getPercent(track.currentTime, track.duration);
    render();
  }

  return {
    init,
    listeners,
    setWidth
  }
})();

export default TrackBar;