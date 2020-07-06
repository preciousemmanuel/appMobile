import React, { Component } from "react";
import {
  View,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import EStyleSheet from "react-native-extended-stylesheet";

import { signUpFormField } from "../actions";
// import styles from './style';

let componentIndex = 0;

const { height, width } = Dimensions.get("window");
const HIGHLIGHT_COLOR = "rgba(0,118,255,0.9)";
const OPTION_CONTAINER_HEIGHT = 400;

// const propTypes = {
//   data: PropTypes.array,
//   onChange: PropTypes.func,
//   initValue: PropTypes.string,
//   style: View.PropTypes.style,
//   selectStyle: View.PropTypes.style,
//   optionStyle: View.PropTypes.style,
//   optionTextStyle: Text.PropTypes.style,
//   sectionStyle: View.PropTypes.style,
//   sectionTextStyle: Text.PropTypes.style,
//   cancelStyle: View.PropTypes.style,
//   cancelTextStyle: Text.PropTypes.style,
//   overlayStyle: View.PropTypes.style,
//   cancelText: PropTypes.string
// };

const defaultProps = {
  data: [],
  onChange: () => {},
  initValue: "Select me!",
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: "cancel"
};

class ModalPhoneInput extends Component {
  constructor() {
    super();

    this.state = {
      animationType: "slide",
      modalVisible: false,
      transparent: false,
      selected: "please select",
      data: []
    };
  }

  componentDidMount() {
    this.setState({ selected: this.props.initValue });
    this.setState({ cancelText: this.props.cancelText });
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  onChange = item => {
    this.props.onChange(item);
    this.setState({ selected: item.label });
    this.close();
  };

  close = () => {
    this.setState({
      modalVisible: false
    });
  };

  open() {
    this.setState({
      modalVisible: true
    });
  }

  renderSection = section => {
    return (
      <View
        key={section.key}
        style={[styles.sectionStyle, this.props.sectionStyle]}
      >
        <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>
          {section.label}
        </Text>
      </View>
    );
  };

  renderOption = option => {
    return (
      <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
        <View
          style={[
            styles.optionStyle,
            this.props.optionStyle,
            {
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }
          ]}
        >
          <View style={{ flex: 0.15 }}>
            <Image
              source={option.image}
              resizeMode="stretch"
              style={{ width: 30, height: 16 }}
            />
          </View>
          <View style={{ flex: 0.7, alignItems: "center" }}>
            <Text
              style={[
                styles.optionTextStyle,
                this.props.optionTextStyle,
                { color: "#434343", fontSize: 14 }
              ]}
            >
              {option.label}
            </Text>
          </View>
          <View style={{ flex: 0.15, alignItems: "flex-end" }}>
            <Text
              style={[
                styles.optionTextStyle,
                this.props.optionTextStyle,
                { color: "grey", fontSize: 12 }
              ]}
            >
              {option.dialCode}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderOptionList = () => {
    const options = this.state.data.map(item => {
      if (item.section) {
        return this.renderSection(item);
      }

      return this.renderOption(item);
    });

    return (
      <View
        style={[styles.overlayStyle, this.props.overlayStyle]}
        key={`modalPicker${componentIndex++}`}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ paddingHorizontal: 10 }}>{options}</View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text
                style={[styles.cancelTextStyle, this.props.cancelTextStyle]}
              >
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderChildren = () => {
    if (this.props.children) {
      return this.props.children;
    }
  };

  render() {
    const dp = (
      <Modal
        transparent
        ref={ref => {
          this.modal = ref;
        }}
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        animationType={this.state.animationType}
      >
        {this.renderOptionList()}
      </Modal>
    );

    return (
      <View style={this.props.style}>
        {dp}

        <TouchableOpacity onPress={this.open}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}

// ModalPhoneInput.propTypes = propTypes;
ModalPhoneInput.defaultProps = defaultProps;

const styles = EStyleSheet.create({
  overlayStyle: {
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.7)"
  },

  optionContainer: {
    borderRadius: "8rem",
    width: width * 0.8,
    height: OPTION_CONTAINER_HEIGHT,
    backgroundColor: "rgba(255,255,255,0.8)",
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2
  },

  cancelContainer: {
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 10
  },

  selectStyle: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: "8rem"
  },

  selectTextStyle: {
    textAlign: "center",
    color: "#333",
    fontSize: "16rem"
  },

  cancelStyle: {
    borderRadius: "8rem",
    width: width * 0.8,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: "8rem"
  },

  cancelTextStyle: {
    textAlign: "center",
    color: "#333",
    fontSize: "16rem"
  },

  optionStyle: {
    padding: "8rem",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },

  optionTextStyle: {
    textAlign: "center",
    fontSize: "16rem",
    color: HIGHLIGHT_COLOR
  },

  sectionStyle: {
    padding: "8rem" * 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },

  sectionTextStyle: {
    textAlign: "center",
    fontSize: "16rem"
  }
});

const mapStateToProps = ({ auth }) => {
  const { phone } = auth;
  return { phone };
};
export default connect(
  mapStateToProps,
  { signUpFormField }
)(ModalPhoneInput);
