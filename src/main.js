import './css/estilos.css';
import { init } from './init.js';

document.querySelector('.start').addEventListener('click', () => {
  document.querySelector('main').classList.add('hidden');
  document.querySelector('button').classList.add('hidden');

  const canvas = document.querySelector('canvas');
  canvas.classList.remove('canvasHidden');
  canvas.classList.add('canvasVisible');
  init(); 

});
