export const ROCK = "✊";
export const PAPER = "🖐️";
export const SCISSORS = "✌";
export const GAME_RESULT_DRAW = "DRAW";
export const PLAYER_WON = (player) => `${player} won!`;
export const GAME_OBJECTS = [ROCK, PAPER, SCISSORS];
export const COMPUTER_PLAYER_ONE = "CPU 1";
export const COMPUTER_PLAYER_TWO = "CPU 2";
export const HUMAN_PLAYER = "YOU";

/**
 * Returns one of [ROCK, PAPER, SCISSORS].
 * Exported for unit testing only.
 */
export const getRandomMove = () => GAME_OBJECTS[Math.floor(Math.random() * GAME_OBJECTS.length)];

/**
 * This function plays a game for Rock, Paper, scissors.
 * Exported for unit testing only.
 * @param {String} player1 the value for player 1
 * @param {String} player2 the vlaue for player 2
 * @return {String} tells you who won.
 */
export const play = (player1, player2) => {
  if (player1 === player2) return GAME_RESULT_DRAW;

  if (player1 === ROCK && player2 !== PAPER) return PLAYER_WON(player1);

  if (player1 === PAPER && player2 !== SCISSORS) return PLAYER_WON(player1);

  if (player1 === SCISSORS && player2 !== ROCK) return PLAYER_WON(player1);

  return PLAYER_WON(player2);

}

const drawScene = (gameBoard, playerOneValue, playerOneName, playerTwoValue, playerTwoName) => {
  const context = gameBoard.getContext('2d');
  context.font = "20px Arial";
  context.fillText(playerOneName, 10, 20);
  context.fillText(playerTwoName, 130, 20);
  context.font = "50px Arial";
  context.fillText(playerOneValue, 10, 90);
  context.fillText(playerTwoValue, 140, 90);
  const result = document.getElementById("result");
  result.innerText = play(playerOneValue, playerTwoValue);
}

export const reset = (gameBoard) => () => {
  const context = gameBoard.getContext('2d');
  context.clearRect(0, 0, gameBoard.width, gameBoard.height);
};

export const simulate = (gameBoard) => () => {
  reset(gameBoard)();
  const playerOne = getRandomMove();
  const playerTwo = getRandomMove();
  drawScene(
    gameBoard,
    playerOne,
    COMPUTER_PLAYER_ONE,
    playerTwo,
    COMPUTER_PLAYER_TWO
  );
};

export const start = (gameBoard) => (evt) => {
  reset(gameBoard)();
  const playerOne = getRandomMove();
  const playerTwo = evt.target.value;
  drawScene(
    gameBoard,
    playerOne,
    COMPUTER_PLAYER_ONE,
    playerTwo,
    HUMAN_PLAYER
  );
};
