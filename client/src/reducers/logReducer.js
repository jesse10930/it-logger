import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../actions/types';

// declare initial state
const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null
};

// find type passed into action prop, update state and return
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [action.payload, ...state.logs],
        loading: false
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload),
        loading: false
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log =>
          log._id === action.payload._id ? action.payload : log
        )
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: state.logs.filter(log => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            log.tech.match(regex) ||
            log.id.match(regex) ||
            log.message.match(regex)
          );
        })
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
