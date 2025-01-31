import PropTypes from 'prop-types'

export function PostFilter({ field, value, onChange }) {
  return (
    <>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input
        type='text'
        name={`field-${field}`}
        id={`field-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  )
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
