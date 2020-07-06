import React from "react";
import Hyperlink from "react-native-hyperlink";
import ViewMoreText from "react-native-view-more-text";
import EStyleSheet from "react-native-extended-stylesheet";
import { Text } from "react-native";

const PostDescription = props => {
  renderViewMore = onPress => {
    return (
      <Text style={{ color: "#44a4f7" }} onPress={onPress}>
        View more
      </Text>
    );
  };
  renderViewLess = onPress => {
    return (
      <Text style={{ color: "#44a4f7" }} onPress={onPress}>
        View less
      </Text>
    );
  };

  return (
    <Hyperlink
      linkDefault={true}
      linkStyle={{ color: "#2980b3", fontStyle: "italic" }}
      onPress={(url, text) => alert(url + ", " + text)}
    >
      <ViewMoreText
        numberOfLines={7}
        renderViewMore={this.renderViewMore}
        renderViewLess={this.renderViewLess}
        // textStyle={{ textAlign: "center" }}
      >
        <Text style={styles.textStyle}>{props.children}</Text>
      </ViewMoreText>
    </Hyperlink>
  );
};

const styles = EStyleSheet.create({
  textStyle: {
    fontWeight: "300",
    lineHeight: "25rem"
  }
});

export default PostDescription;
