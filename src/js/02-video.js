import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

const onPlay = function (time) {
  localStorage.setItem(CURRENT_TIME, time.seconds);
};
player.on('timeupdate', throttle(onPlay, 1000));

const savedTime = localStorage.getItem(CURRENT_TIME);
if (savedTime) {
  player.setCurrentTime(savedTime);
}

// "time" - is an object containing properties specific to that event
// timeupdate - один из вариантов player.on
