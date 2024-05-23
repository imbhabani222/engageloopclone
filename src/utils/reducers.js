/* eslint-disable no-prototype-builtins */
export const createReducer = (initialState, handlers) => {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export const getFetchingState = state => ({
  ...state,
  fetching: true,
  result: null,
  error: null
});

export const getSuccessState = (state, { result }) => ({
  ...state,
  fetching: false,
  result: result.result || result,
  error: null
});

export const getSuccessStateWithFirstItemOfList = (state, { result }) => ({
  ...state,
  fetching: false,
  result,
  error: null
});

export const getErrorState = (state, { error }) => ({
  ...state,
  fetching: false,
  result: null,
  error
});

export const getSuccessStateForListDataWithoutSearch = (
  state,
  { result, append, pageSize, key }
) => {
  let data = result[key];
  const isLastPage = data.length < pageSize;

  if (append) {
    const oldList = state.result;

    if (Array.isArray(oldList)) {
      data = oldList.concat(data);
    }
  }

  return {
    ...state,
    fetching: false,
    result: data,
    error: null,
    isLastPage
  };
};

export const getSuccessStateForListData = (
  state,
  { result, append, pageSize }
) => {
  const resultData = result.result;
  let data = resultData && resultData.data;
  const isLastPage = data && data.length < pageSize;

  if (append) {
    const oldList = state.result && state.result.data;

    if (Array.isArray(oldList)) {
      data = oldList.concat(data);
    }
  }

  return {
    ...state,
    fetching: false,
    result: {
      data,
      searchableFields: resultData && resultData.searchableFields
    },
    error: null,
    isLastPage
  };
};

export const getFetchingStateForListData = (state, { data }) => {
  if (data && data.append) {
    return {
      ...state,
      fetching: true,
      isLastPage: false
    };
  } else {
    return {
      ...getFetchingState(state),
      isLastPage: false
    };
  }
};

export const getResetState = state => ({
  ...state,
  fetching: false,
  result: null,
  error: null
});

export const getResetStateForListing = state => ({
  ...state,
  fetching: false,
  result: [],
  error: null
});
