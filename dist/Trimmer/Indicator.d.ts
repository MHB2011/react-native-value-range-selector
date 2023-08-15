import React from 'react';
import { Position } from './Marker';
interface IndicatorProp {
    trackHeight: number;
    trackWidth: number;
    markerSize: number;
    borderWidth: number;
    onChange?: (start: number, end: number) => void;
    gapPx: number;
    startValue: number;
    endValue: number;
    min: number;
    max: number;
    indicatorColor: string;
    markerColor: string;
    backdropColor: string;
    renderCustomMarker?: (position: Position) => React.ReactNode;
}
export declare const Indicator: ({ trackHeight, trackWidth, markerSize, borderWidth, onChange, gapPx, startValue, endValue, min, max, indicatorColor, markerColor, backdropColor, renderCustomMarker, }: IndicatorProp) => React.JSX.Element;
export {};
