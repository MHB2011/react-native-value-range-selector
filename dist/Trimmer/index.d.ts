import React from 'react';
import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import { Position } from './Marker';
interface TrimmerProps {
    startValue: number;
    endValue: number;
    height?: number;
    markerSize?: number;
    borderWidth?: number;
    onChange?: (start: number, end: number) => void;
    gapPx?: number;
    min: number;
    max: number;
    trackColor?: string;
    indicatorColor?: string;
    markerColor?: string;
    backdropColor?: string;
    imageBackgroundSource?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    renderCustomMarker?: (position: Position) => React.ReactNode;
}
export declare const Trimmer: ({ startValue, endValue, height, markerSize, borderWidth, onChange, gapPx, min, max, trackColor, indicatorColor, markerColor, backdropColor, imageBackgroundSource, imageStyle, renderCustomMarker, }: TrimmerProps) => React.JSX.Element;
export {};
