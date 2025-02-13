import PropTypes from 'prop-types'

export function PostSorting({
  fields = [],
  value,
  onChange,
  valueOrder,
  onChangeOrder,
}) {
  return (
    <>
      <label htmlFor='sortBy'>Sort By: </label>
      <select
        name='sortBy'
        id='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {' / '}

      <label htmlFor='sortOrder'>Sort Order: </label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={valueOrder}
        onChange={(e) => onChangeOrder(e.target.value)}
      >
        <option value={'ascending'}>ascending</option>
        <option value={'descending'}>descending</option>
      </select>
    </>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  valueOrder: PropTypes.string.isRequired,
  onChangeOrder: PropTypes.func.isRequired,
}
