import { trackList } from '../data/tracks.js';
import PlayInfo from './play-info.js';
import TrackBar from './track-bar.js';

const Playlist = (_ => {

  const tracks = trackList;
  let currentIndex = 0;
  const currentTrack = new Audio(tracks[currentIndex].url);

  const playlistBodyEl = document.querySelector('.playlist__body');

  const init = _ => {
    render();
    listeners();
    PlayInfo.toggleTrigger(false);
    changeTrackInfo();
  }

  const flip = _ => {
    togglePlayPause();
    render();
  }

  const changeAudioSrc = _ => {
    currentTrack.src = tracks[currentIndex].url;
  }

  const togglePlayPause = _ => {
    currentTrack.paused ? PlayInfo.toggleTrigger(true) : PlayInfo.toggleTrigger(false);
    currentTrack.paused ? currentTrack.play() : currentTrack.pause();
  }

  const changeTrackInfo = _ => {
    PlayInfo.render(
      tracks[currentIndex].art,
      tracks[currentIndex].title,
      tracks[currentIndex].artist
    )
  }

  const mainPlay = clickedIndex => {
    if (currentIndex === clickedIndex) {
      togglePlayPause();
    } else {
      currentIndex = clickedIndex;
      changeAudioSrc();
      togglePlayPause();
      changeTrackInfo();
    }
  }

  const playNext = _ => {
    if (tracks[currentIndex + 1]) {
      currentIndex++;
      changeAudioSrc();
      togglePlayPause();
      changeTrackInfo();
      render();
    } else {
      currentIndex = 0;
      changeAudioSrc();
      TrackBar.init();
      PlayInfo.toggleTrigger(false);
      changeTrackInfo();
      render();
    }
  }

  const listeners = _ => {
    playlistBodyEl.addEventListener('click', event => {
      if (event.target.matches('.playlist__track')) {
        mainPlay([...event.target.parentNode.children].indexOf(event.target));
        render();
      } else {
        mainPlay([...event.target.parentNode.parentNode.children].indexOf(event.target.parentNode));
        render();
      }
    })
    currentTrack.addEventListener('timeupdate', _  =>  {
      TrackBar.setWidth(currentTrack);
    })
    currentTrack.addEventListener('ended', _ => {
      playNext();
    })
  }

  const render = _ => {
    let markup = '';

    const toggleIcon = itemIndex => {
      if (currentIndex === itemIndex) {
        return currentTrack.paused ? 'fa-play' : 'fa-pause';
      }
      return 'fa-play';
    }

    tracks.forEach((trackObj, index) => {
      markup += `
        <div class="playlist__track ${index === currentIndex ? 'playlist__track--active' : ''}">
          <span class="fa ${toggleIcon(index)}"></span>
          <span class="playlist__track-name">${trackObj.title}</span>
          <span class="playlist__track-duration">${trackObj.time}</span>
        </div>
      `;
    })
    playlistBodyEl.innerHTML = markup;
  }

  return {
    currentTrack,
    init,
    flip
  }
})();

export default Playlist;
