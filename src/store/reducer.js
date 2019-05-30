const initialState = {
  levels: [],
  params: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LEVELS":
      return {
        ...state,
        levels: [...action.data]
      };
    case "TRANS_LEVEL_PARAMS":
      return {
        ...state,
        params: action.params
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;
