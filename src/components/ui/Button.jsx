import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, onClick, variant = 'default' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantClasses = {
    default: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'destructive']),
}

export default Button

