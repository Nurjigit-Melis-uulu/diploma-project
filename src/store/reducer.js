const initialState = {
  winningCombinations: [],
  player1: [],
  player2: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return {
        ...state
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;
