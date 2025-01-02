import React from 'react'
import PropTypes from 'prop-types'

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  className: PropTypes.string,
}

export default Input

