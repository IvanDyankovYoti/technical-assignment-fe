import * as Game from '../src/js/rpsGameEngine';

describe('rpsGameEngine', () => {
  const clearRectMock = jest.fn();
  const fillTextMock = jest.fn();

  const canvasMock = {
    width: 10,
    height: 11,
    getContext: () => ({
      clearRect: clearRectMock,
      fillText: fillTextMock
    })
  };

  beforeAll(() => {
    // This is a bit hacky, as I am not doing proper DOM testing due to lack of time
    Object.assign(document, { getElementById: () => ({ innerText: ''})});
  });

  afterAll(() => {
    delete document.getElementById;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('play()', () => {

    it('should return DRAW when both players make the same move', () => {
      expect(Game.play(Game.ROCK, Game.ROCK)).toEqual(Game.GAME_RESULT_DRAW);
      expect(Game.play(Game.PAPER, Game.PAPER)).toEqual(Game.GAME_RESULT_DRAW);
      expect(Game.play(Game.SCISSORS, Game.SCISSORS)).toEqual(Game.GAME_RESULT_DRAW);
    });

    it('should return PAPER when PAPER vs ROCK', () => {
      expect(Game.play(Game.ROCK, Game.PAPER)).toEqual(Game.PLAYER_WON(Game.PAPER));
      expect(Game.play(Game.PAPER, Game.ROCK)).toEqual(Game.PLAYER_WON(Game.PAPER));
    });

    it('should return ROCK when ROCK vs SCISSORS', () => {
      expect(Game.play(Game.ROCK, Game.SCISSORS)).toEqual(Game.PLAYER_WON(Game.ROCK));
      expect(Game.play(Game.SCISSORS, Game.ROCK)).toEqual(Game.PLAYER_WON(Game.ROCK));
    });

    it('should return SCISSORS when PAPER vs SCISSORS', () => {
      expect(Game.play(Game.PAPER, Game.SCISSORS)).toEqual(Game.PLAYER_WON(Game.SCISSORS));
      expect(Game.play(Game.SCISSORS, Game.PAPER)).toEqual(Game.PLAYER_WON(Game.SCISSORS));
    });
  });

  describe('getRandomMove()', () => {
    it('should return one of [ROCK, PAPER, SCISSORS] reliably i.e. 1000 iterations', () => {
      for (let i = 0; i < 1001; i += 1) {
        expect(Game.GAME_OBJECTS.includes(Game.getRandomMove())).toBe(true);
      }
    });
  });

  describe('reset()', () => {
    it('should reset the game board using clearRect method ', () => {
      Game.reset(canvasMock)();
      expect(clearRectMock).toBeCalledWith(0, 0, canvasMock.width, canvasMock.height);
    });
  });

  describe('simulate()', () => {
    it('should draw the game correctly on the canvas', () => {
      Game.simulate(canvasMock)();
      expect(fillTextMock.mock.calls.length).toBe(4);
      expect(fillTextMock.mock.calls[0]).toEqual([
        Game.COMPUTER_PLAYER_ONE, 10, 20
      ]);
      expect(fillTextMock.mock.calls[1]).toEqual([
        Game.COMPUTER_PLAYER_TWO, 130, 20
      ]);

      // TODO: improve regext matching for emojis
      expect(fillTextMock.mock.calls[2]).toEqual([
        expect.anything(), 10, 90
      ]);
      expect(fillTextMock.mock.calls[3]).toEqual([
        expect.anything(), 140, 90
      ]);
    });
  });

  describe('start()', () => {
    it('should draw the game correctly on the canvas', () => {
      const playerMove = {
        target: {
          value: Game.ROCK
        }
      }
      Game.start(canvasMock)(playerMove);
      expect(fillTextMock.mock.calls.length).toBe(4);
      expect(fillTextMock.mock.calls[0]).toEqual([
        Game.COMPUTER_PLAYER_ONE, 10, 20
      ]);
      expect(fillTextMock.mock.calls[1]).toEqual([
        Game.HUMAN_PLAYER, 130, 20
      ]);

      // TODO: improve regext matching for emojis
      expect(fillTextMock.mock.calls[2]).toEqual([
        expect.anything(), 10, 90
      ]);
      expect(fillTextMock.mock.calls[3]).toEqual([
        playerMove.target.value, 140, 90
      ]);
    });
  });
});
