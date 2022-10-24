import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DefaultMetrics = {
    screenHeight: height,
    screenWidth: width,
    baseHeight: height * 0.1,
    baseWidth: width * 0.1,
}

export const Metrics =  {
    screenHeight: DefaultMetrics.screenHeight,
    screenWidth: DefaultMetrics.screenWidth,
    baseHeight: DefaultMetrics.baseHeight,
    baseWidth: DefaultMetrics.baseWidth,
    
};
