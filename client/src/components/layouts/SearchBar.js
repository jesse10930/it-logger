import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchLogs, getLogs } from '../../actions/logActions';

const SearchBar = ({ searchLogs, getLogs }) => {
  const text = useRef('');

  // reset text field, run getLogs
  const onClick = e => {
    text.current.value = '';
    getLogs();
  };

  // run when key released
  const onKeyUp = async e => {
    // run  if back space pressed
    if (e.keyCode === 8) {
      // if text field empty, return all logs, else return searchLogs for text field value
      if (text.current.value !== '') {
        getLogs();
      }
      let temp = e.target.value;
      await getLogs();
      searchLogs(temp);
      // run for all other keys pressed
    } else if (text.current.value !== '') {
      searchLogs(e.target.value);
    } else {
      getLogs();
    }
  };

  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search Logs...'
              ref={text}
              onKeyUp={onKeyUp}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons' onClick={onClick}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
  getLogs: PropTypes.func.isRequired
};

export default connect(null, { searchLogs, getLogs })(SearchBar);
