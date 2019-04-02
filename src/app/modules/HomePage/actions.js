export const HOME_ACTIONS = {
  SEARCH_FOR_KEY: 'HOME_ACTIONS/SEARCH_FOR_KEY'
};

export const searchForKey = searchString => ({
  type: HOME_ACTIONS.SEARCH_FOR_KEY,
  payload: { searchString }
});
