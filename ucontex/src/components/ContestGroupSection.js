import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon, Button } from "native-base";

const ContestGroupSection = props => {
  const {
    containerStyle,
    titleContainerStyle,
    showAllTextStyle,
    contentContainerStyle,
    imageStyle,
    bottomImagePanel,
    bottomTextStyle,
    nameStyle,
    followButtonStyle,
    followTypeStyle,
    removeButtonStyle,
    closeIconStyle,
    moreSectionContainerStyle,
    sectionSectyle
  } = styles;
  return (
    <View style={{ flex: 1 }}>
      <View style={containerStyle}>
        <View style={titleContainerStyle}>
          <Text>All Contest</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ marginLeft: 10 }}>
            <View style={contentContainerStyle}>
              <View style={{ alignItems: "center" }}>
                <Image
                  resizeMode="cover"
                  source={require("../assets/brand.png")}
                  style={imageStyle}
                />
                <Text style={nameStyle}>{props.totalOngoingContests}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={[
                      styles.statusIconStyle,
                      { backgroundColor: "#55f976" }
                    ]}
                  />
                  <Text>Ongoing</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("OngoingContest", { status: 1 })
                  }
                  style={followButtonStyle}
                >
                  <Text style={{ color: "#fff" }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <View style={contentContainerStyle}>
            <View style={{ alignItems: "center" }}>
              <Image
                resizeMode="cover"
                source={require("../assets/brand.png")}
                style={imageStyle}
              />
              <Text style={nameStyle}>100</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={[
                    styles.statusIconStyle,
                    { backgroundColor: "#ffa500" }
                  ]}
                />
                <Text>Ongoing</Text>
              </View>
              <TouchableOpacity style={followButtonStyle}>
                <Text style={{ color: "#fff" }}>View</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={contentContainerStyle}>
            <View style={{ alignItems: "center" }}>
              <Image
                resizeMode="cover"
                source={require("../assets/brand.png")}
                style={imageStyle}
              />
              <Text style={nameStyle}>0</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={[
                    styles.statusIconStyle,
                    { backgroundColor: "#fe0686" }
                  ]}
                />
                <Text>Trending</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("TrendingContest", { status: 3 })
                }
                style={followButtonStyle}
              >
                <Text style={{ color: "#fff" }}>View</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={contentContainerStyle}>
            <View style={{ alignItems: "center" }}>
              <Image
                resizeMode="cover"
                source={require("../assets/brand.png")}
                style={imageStyle}
              />
              <Text style={nameStyle}>{props.totalClosedContests}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={[
                    styles.statusIconStyle,
                    { backgroundColor: "#e20f0f" }
                  ]}
                />
                <Text>Closed</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("ClosedContest", { status: 2 })
                }
                style={followButtonStyle}
              >
                <Text style={{ color: "#fff" }}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={[moreSectionContainerStyle, { flex: 1 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={sectionSectyle}>
            <Icon style={{ color: "#ffffff" }} name="ribbon" />
            <Text style={{ color: "#ffffff", fontWeight: "800" }}>
              Total Contest
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#ffffff", fontWeight: "800" }}>
                {props.totalContests}
              </Text>
            </View>
            <View />
          </View>
          <View style={[sectionSectyle, { backgroundColor: "#44a4f7" }]}>
            <Image
              resizeMode="cover"
              source={require("../assets/utex.png")}
              style={styles.utexImageStyle}
            />
            <Text style={{ color: "#ffffff", fontWeight: "800" }}>
              Utex Payout
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#ffffff", fontWeight: "800" }}>U1000</Text>
            </View>
          </View>
          <View style={[sectionSectyle, { backgroundColor: "#ffa500" }]}>
            <Icon style={{ color: "#ffffff" }} name="cash" />
            <Text style={{ color: "#ffffff", fontWeight: "800" }}>
              Total Cash Payout
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#ffffff", fontWeight: "800" }}>₦1000</Text>
            </View>
          </View>
          <View
            style={[
              sectionSectyle,
              { marginRight: 0, backgroundColor: "#06a751" }
            ]}
          >
            <Icon style={{ color: "#ffffff" }} name="pricetags" />
            <Text style={{ color: "#ffffff", fontWeight: "800" }}>
              Total Winners
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#ffffff", fontWeight: "800" }}>1000</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  containerStyle: {
    height: "259rem",
    width: "100%",
    alignItems: "center",
    padding: "7rem"
  },
  titleContainerStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "12rem",
    paddingRight: "12rem",
    paddingTop: "14rem"
  },
  showAllTextStyle: {
    paddingLeft: "140rem",
    color: "#959ca7"
  },
  contentContainerStyle: {
    height: "185rem",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.23,
    shadowRadius: 5,
    elevation: 4,
    backgroundColor: "#ffffff",
    width: "136rem",
    marginRight: "5rem",
    padding: "16rem",
    marginTop: "15rem"
  },
  imageStyle: {
    width: "70rem",
    height: "70rem",
    paddingTop: "7rem",
    borderRadius: "75rem"
  },
  nameStyle: {
    paddingTop: "10rem",
    color: "#000",
    fontSize: "15rem",
    fontWeight: "800",
    lineHeight: "20rem"
  },
  followTypeStyle: {
    fontSize: "12rem",
    fontWeight: "500",
    lineHeight: "20rem",
    marginTop: "4rem"
  },
  followButtonStyle: {
    width: "110rem",
    height: "30rem",
    borderRadius: "5rem",
    backgroundColor: "#44a4f7",
    marginTop: "4rem",
    justifyContent: "center",
    alignItems: "center"
  },
  removeButtonStyle: {
    position: "absolute",
    top: "7rem",
    right: "7rem",
    width: "13rem",
    height: "13rem"
  },
  closeIconStyle: {
    color: "#707070",
    fontSize: "15rem"
  },
  moreSectionContainerStyle: {
    width: "100%",
    height: "106rem",

    alignItems: "center",
    padding: "5rem",
    flexDirection: "row",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 3,
    justifyContent: "space-between"
  },
  sectionSectyle: {
    width: "118rem",
    height: "90rem",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    borderRadius: 5,
    backgroundColor: "#6ed3f8",
    elevation: 3,
    marginRight: "9rem",
    alignItems: "center",
    justifyContent: "center"
  },
  statusIconStyle: {
    width: "10rem",
    height: "10rem",
    borderRadius: "75rem",
    marginRight: "4rem"
  },
  utexImageStyle: {
    width: "20rem",
    height: "20rem"
  }
});

export default ContestGroupSection;
