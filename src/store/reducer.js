const initialState = {
  levels: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LEVELS":
      return {
        ...state,
        levels: [...action.data]
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;
