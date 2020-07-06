import React, { Component } from "react";
import { Animated, Image, Easing, View, Text } from "react-native";
class TestScreen extends Component {
  constructor() {
    super();
    //  this.spinValue = new Animated.Value(0);
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.animatedValue3 = new Animated.Value(0);
  }
  componentDidMount() {
    //this.spin();
    this.animate();
  }

  // spin() {
  //   this.spinValue.setValue(0);
  //   Animated.timing(this.spinValue, {
  //     toValue: 1,
  //     duration: 4000,
  //     easing: Easing.linear
  //   }).start(() => this.spin());
  // }
  animate() {
    this.animatedValue1.setValue(0);
    this.animatedValue2.setValue(0);
    this.animatedValue3.setValue(0);
    const createAnimation = (value, duration, easing, delay = 0) => {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay
      });
    };

    Animated.parallel([
      createAnimation(this.animatedValue1, 2000, Easing.linear),
      createAnimation(this.animatedValue2, 1000, Easing.linear, 1000),
      createAnimation(this.animatedValue3, 2000, Easing.linear, 2000)
    ]).start();
  }

  render() {
    // const spin = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ["0deg", "360deg"]
    // });
    const spinText = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "750deg"]
    });
    const scaleText = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 2]
    });
    const introButton = this.animatedValue3.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 400]
    });

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={{
            transform: [{ scale: scaleText }],
            marginTop: 10
          }}
        >
          <Text>Welcome Here</Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ rotate: spinText }],
            marginTop: 10
          }}
        >
          <Text>To my App</Text>
        </Animated.View>
        <Animated.View
          style={{
            top: introButton,
            position: "absolute"
          }}
        >
          <Text>Click me!</Text>
        </Animated.View>
      </View>
    );
  }
}
export default TestScreen;
