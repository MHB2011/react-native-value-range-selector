import React, { PropsWithChildren } from 'react';
import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
interface TrackProps {
    height: number;
    renderIndicator: (trackWidth: number) => JSX.Element;
    trackColor?: string;
    imageBackgroundSource?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
}
export declare const Track: ({ renderIndicator, height, trackColor, imageBackgroundSource, imageStyle, }: PropsWithChildren<TrackProps>) => React.JSX.Element;
export {};
