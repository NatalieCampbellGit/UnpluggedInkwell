import { Workbox } from 'workbox-window';
import Editor from './editor';
import { header } from './header.js';
import './database';
import '../css/style.css';


const main = document.querySelector('#main');
main.innerHTML = '';

// Create header container
const headerContainer = document.createElement('div');
headerContainer.classList.add('header');
const headerText = document.createTextNode(header);
headerContainer.appendChild(headerText);

// Append the header before the editor
main.appendChild(headerContainer);

// const appContainer = document.querySelector('#app');
// appContainer.insertBefore(headerContainer, appContainer.firstChild);

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}


