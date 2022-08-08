import { DateTime } from './luxon.js';

const currentTime = document.querySelector('#currentTime');

export default function printTime() {
  setInterval(() => {
    currentTime.textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  }, 500);
}