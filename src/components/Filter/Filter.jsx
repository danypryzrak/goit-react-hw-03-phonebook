import PropTypes from 'prop-types';

export const Filter = ({ filter, handleFilter }) => {
  return (
    <label name="filter" className=''>
      <span className=''>You can find contacts by name</span>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilter}
        className=''
      />
    </label>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
