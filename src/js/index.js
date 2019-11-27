import "core-js/stable";
import "regenerator-runtime/runtime";

import logger from './logger';
import { start, reset as resetBoard, simulate} from './rpcGameEngine';

import '../css/index.scss';

logger('let the games begin!');

//TODO:
// Make the buttons prettier
// Add unit tests.
// I didn't follow TDD for this exercise, because the spec was vague
// and I wasn't sure how to TDD somethign which I kept chaning.
document.addEventListener("DOMContentLoaded", function() {

  /* The canvas element */
  const gameBoard = document.getElementById("scene");

  /* Attach Game Controls */
  const compVcomp = document.getElementById("compVcomp");
  compVcomp.onclick = simulate(gameBoard);

  const playerControls = document.querySelectorAll(".gameControls__playerChoice button");
  playerControls.forEach(button => button.onclick = start(gameBoard));

  const reset = document.getElementById("reset");
  reset.onclick = resetBoard(gameBoard);
});
