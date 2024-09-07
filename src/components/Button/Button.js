import React from 'react';
import PropTypes from 'prop-types';
import { Button as ReactstrapButton } from 'reactstrap';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  corner = '',
  pill = false, 
  icon, 
  disabled = false,
  ...props
}) => {
  const classNames = `btn-${variant} btn-${size} ${corner} ${pill ? 'btn-pills' : ''}`;

  return (
    <ReactstrapButton
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </ReactstrapButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'full']),
  corner: PropTypes.oneOf(['', 'btn-corner-right', 'btn-corner-left', 'btn-corner-left-top']),
  pill: PropTypes.bool, 
  icon: PropTypes.node,
  disabled: PropTypes.bool,
};

export default Button;
