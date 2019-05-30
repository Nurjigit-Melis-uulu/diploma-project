const initialState = {
  levels: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LEVELS":
      return {
        ...state,
        levels: action.value
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;
