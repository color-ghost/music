import Playlist from './playlist.js';

const PlayInfo = (_ => {

  const playerImgEl = document.querySelector('.player__img');
  const playerTitleEl = document.querySelector('.player__title');
  const playerArtistEl = document.querySelector('.player__artist');
  const playerTriggerEl = document.querySelector('.player__trigger');

  const init = _ => {
    listeners();
  }

  const listeners = _ => {
    playerTriggerEl.addEventListener('click', _ => {
      Playlist.flip();
    })
  }

  const render = (art, title, artist) => {
    playerImgEl.src = art;
    playerTitleEl.innerHTML = title;
    playerArtistEl.innerHTML = artist;
  }

  const toggleTrigger = trigger => {
    playerTriggerEl.innerHTML = trigger ? 'PAUSE' : 'PLAY';
  }

  return {
    init,
    render,
    toggleTrigger
  }
})();

export default PlayInfo;