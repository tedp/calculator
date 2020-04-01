import React from 'react';
import './Button.scss';

class Button extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.value);
  }

  render() {
    return (
      <div className="Button" onClick={this.handleClick}>
        {this.props.value}
      </div>
    );
  }
}

export default Button
