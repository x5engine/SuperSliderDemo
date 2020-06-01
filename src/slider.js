import React from "react";
import { isFunction, isUndefined } from "lodash";
import SliderCore from "./slider-core";
import Popover from "./popover-follow";
import PropTypes from "prop-types";
var classnames = require("classnames");

// replace React.createClass with a class:
class Slider extends React.Component {
  // Use static properties for propTypes/defaultProps
  static propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    ticks: PropTypes.bool,
    handleColor: PropTypes.string,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    triggerOnChangeWhileDragging: PropTypes.bool,
    markerLabel: PropTypes.array,
    displayFollowerPopover: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.slider = React.createRef();
  }

  static defaultProps = {
    rtPosition: undefined,
    handleWidth: undefined,
    handleColor: "#ffffff",
    triggerOnChangeWhileDragging: false
  };

  // Initialize state right in the class body,
  // with a property initializer:
  state = {
    rtPosition: this.props.rtPosition || 0,
    handleWidth: this.props.handleWidth || undefined,
    localValue: this.props.value
  };

  componentDidUpdate() {
    if (
      isUndefined(this.state.handleWidth) &&
      this.slider?.input?.refs?.handle
    ) {
      this.setState({
        handleWidth: this.slider.input?.refs?.handle?.offsetWidth
      }); // eslint-disable-line
    }
  }

  handleSliderChange = (value, rtPosition) => {
    this.setState({ rtPosition, localValue: value });
    if (isFunction(this.props.onChange)) {
      // Send the value and position of the slider in case the container needs it.
      this.props.onChange(value, rtPosition);
    }
  };

  render() {
    var trackWidth = this.slider?.current?.state?.trackWidth;
    var handleWidth = this.slider?.current?.state?.handleWidth;
    var dragging = this.slider?.current?.state?.dragging;
    var follower =
      this.props.displayPopover && !isUndefined(this.state.rtPosition) ? (
        <Popover
          trackWidth={trackWidth}
          handleWidth={handleWidth}
          value={
            this.props.popoverValue ? this.props.popoverValue : this.props.value
          }
          position={this.state.rtPosition}
        />
      ) : (
        <span />
      );
    return (
      <div
        className={classnames("slider-container-component", {
          dragging: dragging
        })}
      >
        {this.props.displayBox && (
          <p class="slider-value">
            {this.props.boxValue ? this.props.boxValue : this.props.value}
          </p>
        )}
        <SliderCore
          ref={this.slider}
          handleColor={this.props.handleColor}
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={this.handleSliderChange}
          onDragStart={this.props.onDragStart}
          onDragEnd={this.props.onDragEnd}
          triggerOnChangeWhileDragging={this.props.triggerOnChangeWhileDragging}
          ticks={this.props.ticks}
          markerLabel={this.props.markerLabel}
        />
        {follower}
      </div>
    );
  }
}
export default Slider;
