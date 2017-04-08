export const initialState = {
  people: null,
  error: null
};

const handlers = {
  'PEOPLE_RETRIEVED': handlePeopleRetrieved
};

export const reducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  const newState = handler ? handler(state, action) : state;
  
  return newState;
}

function handlePeopleRetrieved(state, action) {
  if (action.error) {
    return {
      ...state,
      people: null,
      error: action.payload
    };
  }

  return {
    ...state,
    people: action.payload,
    error: null
  };
}

