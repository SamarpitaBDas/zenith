import React from 'react'
import PropTypes from 'prop-types'

const Label = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Label

