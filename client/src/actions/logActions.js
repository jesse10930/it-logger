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
} from './types';

// Gets logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const res = await fetch('/api/logs');
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    });
  }
};
//

// Add new log
export const addLog = log => async dispatch => {
  try {
    setLoading();

    const res = await fetch('/api/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    });
  }
};
//

// Delete log from server
export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    await fetch(`/api/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    });
  }
};
//

// Update log on server
export const updateLog = updLog => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`api/logs/${updLog.tempID}`, {
      method: 'PUT',
      body: JSON.stringify(updLog),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    });
  }
};
//

// Search logs
export const searchLogs = text => async dispatch => {
  dispatch({ type: SEARCH_LOGS, payload: text });
  // try {
  //   setLoading();

  //   const res = await fetch(`api/logs`);
  //   const data = await res.json();

  //   dispatch({
  //     type: SEARCH_LOGS,
  //     payload: data
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: LOGS_ERROR,
  //     payload: err.response
  //   });
  // }
};
//

// Set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};
//

// Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};
//

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
//
