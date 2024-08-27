import './css/estilos.css';
import { init } from './init.js';

document.querySelector('.start').addEventListener('click', () => {
  const canvas = document.querySelector('canvas');
  canvas.classList.remove('canvasHidden');
  
  init(); 

  document.querySelector('.start').disabled = true;
});
