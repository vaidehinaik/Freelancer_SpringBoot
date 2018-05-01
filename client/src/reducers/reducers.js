const initialState = {
    token: '',
    username: '',
    projectId: '',
    skills: [],
    userinfo: {},
    allProjects: [],
    userProjects: [],
    userBidProjects: [],
    projectDetails: {},
    userProfilesWithBids: [],
    total_funds: '',
    transactions: []
}

const reducers = (state = initialState, action) => {
  switch(action.type) {
    case "USERNAME":
        state={
          ...state,
          username: action.payload.username,
          token: action.payload.token
        };
    break;

    case "PROJECT_ID":
        state={
          ...state,
          projectId: action.payload.projectId
        };
    break;

    case "USERINFO":
        state={
          ...state,
          userinfo: action.payload.userinfo
        };
    break;

    case "PROJECT_DETAILS":
        state={
          ...state,
          projectDetails: action.payload.projectDetails
        };
    break;

    case "ALL_PROJECTS":
        state={
          ...state,
          allProjects: action.payload.allProjects
        };
    break;

    case "USER_PROJECTS":
        state={
          ...state,
          userProjects: action.payload.userProjects
        };
    break;

    case "USER_BID_PROJECTS":
        state={
          ...state,
          userBidProjects: action.payload.userBidProjects
        };
    break;

    case "USER_PROFILES_WITH_BIDS":
        state={
          ...state,
          userProfilesWithBids: action.payload.userProfilesWithBids
        };
    break;

    case "TRANSACTIONS":
        state={
          ...state,
          transactions: action.payload.transactions
        };
    break;

    case "TOTAL_FUNDS":
        state={
          ...state,
          total_funds: action.payload.total_funds
        };
    break;

    case "REHYDRATE":
        state={
          ...state,
          state: action.payload.persistState
        };
    break;

    case "RESET":
        state={
            token: '',
            username: '',
            projectId: '',
            total_funds: '',
            skills: [],
            userinfo: {},
            allProjects: [],
            userProjects: [],
            transactions: [],
            userBidProjects: [],
            projectDetails: {},
            userProfilesWithBids: []
        };
    break;

    default:
      break;
  }
  return state;
};

export default reducers;
