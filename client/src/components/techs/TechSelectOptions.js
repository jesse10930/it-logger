import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from '../../actions/techActions';

const TechSelectOptions = ({ getTechs, tech: { techs, loading } }) => {
  // get techs when component first mounts
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    // check loading false and techs not null
    !loading &&
    techs !== null &&
    techs.map(t => (
      // map through tech array, return option tag for each
      <option key={t.id} value={`${t.firstName} ${t.lastName}`}>
        {t.firstName} {t.lastName}
      </option>
    ))
  );
};

TechSelectOptions.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

// declare component level action
const mapStateToProps = state => ({
  tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(TechSelectOptions);
