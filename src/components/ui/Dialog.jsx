import React from 'react'
import PropTypes from 'prop-types'

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
      </div>
    </div>
  )
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

Dialog.Content = ({ children }) => <div>{children}</div>
Dialog.Header = ({ children }) => <div className="mb-4">{children}</div>
Dialog.Title = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>
Dialog.Footer = ({ children }) => <div className="mt-4 flex justify-end space-x-2">{children}</div>

export default Dialog

