import ActionType from '../actions/ActionTypes';

const initialState = {
  profile: {},
  isLoading: false,
  isLoadingResumeList: false,
  resumeList: [],
  isCreatingResume: false,
  createdResume: null,
  resumeListLoaded: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
  case ActionType.SAMPLE:
    return {
      ...state,
      isLoading: true,
      profile: action.payload,
    };
  default:
    return state;
  }
};


export default auth;
