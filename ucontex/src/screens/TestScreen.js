import React, { Component } from "react";
import { Animated, Image, Easing, View, Text } from "react-native";
class TestScreen extends Component {
  constructor() {
    super();
    //  this.spinValue = new Animated.Value(0);
    this.animatedValue = new Animated.Value(0);
    this.springValue = new Animated.Value(0.3);
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
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.animate());
  }
  spring() {
    this.springValue.setValue(0.3);
    Animated.spring(this.springValue, {
      toValue: 1,
      tension: 1,
      friction: 1
    }).start();
  }
  render() {
    // const spin = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ["0deg", "360deg"]
    // });
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 360]
    });
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });
    return (
      <View style={{ flex: 1, padding: 6 }}>
        <Animated.Image
          style={{ width: 45, height: 45, marginLeft }}
          source={require("../assets/icon.png")}
        />
        <Animated.View
          style={{
            width: 40,
            height: 40,
            marginTop: 10,
            backgroundColor: "red",
            opacity
          }}
        />

        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 20 }} onPress={this.spring.bind(this)}>
            Spring
          </Text>

          <Animated.Image
            style={{
              width: 45,
              height: 45,
              transform: [{ scale: this.springValue }]
            }}
            source={require("../assets/icon.png")}
          />
        </View>
      </View>
    );
  }
}
export default TestScreen;
