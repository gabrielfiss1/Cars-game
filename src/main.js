import './css/estilos.css';
import { init } from './init.js';

document.querySelector('.start').addEventListener('click', () => {
  const canvas = document.querySelector('canvas');
  canvas.classList.remove('canvasHidden');
  
  // Iniciar o jogo chamando a função init
  init(); 

  // Opcional: Desativar o botão "START" após o clique
  document.querySelector('.start').disabled = true;
});
