import React from 'react';
import "../sass/badge.scss"

function Badge({ content, type }) {
  return (
    <span className={`badge badge--${type}`}>
      {content}
    </span>
  )
}

export default Badge;
