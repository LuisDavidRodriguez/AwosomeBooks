import { DateTime } from '../node_modules/luxon/src/luxon.js';

const currentTime = document.querySelector('#currentTime');

export default function printTime() {
  setInterval(() => {
    currentTime.textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  }, 500);
}