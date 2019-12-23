import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = ( size, factor = 0.5 ) => size + (scale(size) - size) * factor; 

const DEFAULT_GAP = 8;
const DEFAULT_BUTTON_INLINE_GAP = 8;

//Get size window
const WINDOW_SIZE = {
    WIDTH: width,
    HEIGHT: height,
}

const SPACING_CONSTANTS = {
    GAP: scale(DEFAULT_GAP),
    BUTTON_INLINE_GAP: scale(DEFAULT_BUTTON_INLINE_GAP),
    BORDER_RADIUS: verticalScale(3),
};

export {
    scale,
    verticalScale,
    moderateScale,
    WINDOW_SIZE,
    SPACING_CONSTANTS
};