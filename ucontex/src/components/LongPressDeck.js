import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class LongPressDeck extends Component {
  static defaultProps = {
    onSwapRight: () => {},
    onSwapLeft: () => {},
    keyProp: "id"
  };
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    //the pan PanResponder is use for handling user gestures or user input
    const panResponder = PanResponder.create({
      //this are lifecycle method
      onStartShouldSetPanResponder: () => true, //this is for activating panResponder when user clicks or drags the screen
      onPanResponderMove: (event, gestures) => {
        //  position.setValue({ x: gestures.dx, y: gestures.dy });
      }, //this is called anytime user drags on the screen
      onPanResponderRelease: (event, gestures) => {
        if (gestures.dx > SCREEN_THRESHOLD) {
          this.forceSwap("right");
        } else if (gestures.dx < -SCREEN_THRESHOLD) {
          this.forceSwap("left");
        } else {
          this.resetPosition();
        }
      }
    });
    this.state = { panResponder, position, index: 0 };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }
  onSwipeComplete(direction) {
    const { onSwapRight, onSwapLeft, data } = this.props;
    const item = data[this.state.index];
    direction === "right" ? onSwapRight(item) : onSwapLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }
  forceSwap(direction) {
    const x = direction === "right" ? SCREEN_WIDTH * 2 : -SCREEN_WIDTH * 2;
    Animated.timing(this.state.position, {
      toValue: { x: x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  }
  getCardStyle() {
    //interpolation system is used to tie one propertie of a style to another property
    //it use to change the style of a element when another element is affected
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
      outputRange: ["-120deg", "0deg", "120deg"]
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }
  renderCards() {
    //check if no more CardSection
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCard();
    }

    const deck = this.props.data.map((item, i) => {
      console.log(i);
      if (i < this.state.index) {
        //after hiding card do not render it no more
        return null;
      }
      if (i === this.state.index) {
        console.log(i, this.state.index);
        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[
            styles.cardStyle,
            { top: 10 * (i - this.state.index), zIndex: -i }
          ]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });
    return Platform.OS === "android" ? deck.reverse() : deck.reverse();
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}
const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH
  }
};
export default LongPressDeck;
