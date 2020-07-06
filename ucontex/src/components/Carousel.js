import React, {Component} from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';
import {Image, TouchableOpacity, Dimensions, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ScaleImage from 'react-native-scalable-image';
import FastImage from 'react-native-fast-image';
import ProgressiveImage from './ProgressiveImage';

const SCREEN_WIDTH = Dimensions.get('window').width;
class CarouselImage extends Component {
  state = {activeSlide: 0};

  showMorePix = () => {
    this.props.navigation.navigate('ShowMorePicx', {data: this.props.data});
  };
  get pagination() {
    //const { entries, activeSlide } = this.props.;
    //check if media item is greater than 5

    if (this.props.images.length > 5) {
      return (
        <View sty>
          <Pagination
            dotsLength={5}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{backgroundColor: '#fff'}}
            dotStyle={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 1,
              backgroundColor: '#44a4f7',
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      );
    } else {
      //not greater than five
      return (
        <Pagination
          dotsLength={this.props.images.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{backgroundColor: '#fff'}}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 1,
            backgroundColor: '#44a4f7',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      );
    }
  }

  _renderMedia = ({item, index}) => {
    //console.log("kopkkkkkk", index);
    if (index === 4) {
      return (
        <View style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.showMorePix()}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={styles.carouselImageStyle}
              source={{uri: item.url}}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.showMorePix()}>
          <FastImage
            //resizeMode={FastImage.resizeMode.contain}
            style={styles.carouselImageStyle}
            source={{uri: item.url}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderImage = () => {
    const {images} = this.props;
    if (images.length > 0) {
      if (images.length === 1) {
        return images.map((item, index) => {
          return (
            <View style={styles.singleMediaContainerStyle} key={index}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.showMorePix()}>
                {/* <ScaleImage width={SCREEN_WIDTH} source={{uri: item.url}} /> */}
                <FastImage
                  source={{uri: item.url}}
                  style={{width: SCREEN_WIDTH, minHeight: 300}}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
            </View>
          );
        });
      }
      //console.log("job", ...images);
      const imagesC = images.length > 5 ? images.slice(0).slice(-5) : images;
      return (
        <View style={{flex: 1}}>
          {/* <View style={styles.numMediaContainerStyle}>
        <Button iconLeft transparent style={styles.numMediaBtnStyle}>
          <Icon
            name="camera"
            style={{
              color: "#7e7b7b",
              fontSize: 9,
              marginRight: 2
            }}
          />
          <Text style={{ color: "#7e7b7b", fontSize: 9 }}>
            {images.length}
          </Text>
        </Button>
      </View> */}
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={imagesC}
            renderItem={this._renderMedia}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            containerCustomStyle={{flex: 1}}
            slideStyle={{flex: 1}}
            onSnapToItem={index => this.setState({activeSlide: index})}
          />
          {images.length > 5 && (
            <TouchableOpacity
              transparent
              onPress={() => this.showMorePix()}
              style={styles.moreMediaButonStyles}>
              <Text style={{color: '#686767'}}>+{images.length - 5}</Text>
            </TouchableOpacity>
          )}
          {this.pagination}

          {/* <PhotoGrid
        source={images.map(({ postImagePath }) => postImagePath)}
      /> */}
        </View>
        /* <View>
      <AutoResponsiveGrid {...this.getAutoResponsiveProps()}>
        {this.renderMultipleMedia(images)}
      </AutoResponsiveGrid>
    </View> */
      );
    }
    return;
  };
  render() {
    return <View>{this.renderImage()}</View>;
  }
}

const styles = EStyleSheet.create({
  singleMediaContainerStyle: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: '70rem',
  },
  moreMediaButonStyles: {
    position: 'absolute',
    right: '95rem',
    bottom: '25rem',
    zIndex: 1000,
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: '#fff',
  },
  carouselImageStyle: {
    width: SCREEN_WIDTH,
    minHeight: '300rem',
  },
});

export default CarouselImage;
