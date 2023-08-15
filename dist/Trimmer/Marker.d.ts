import React from 'react';
interface MarkerProps {
    position: Position;
    startPx: number;
    endPx: number;
    gapPx: number;
    min: number;
    max: number;
    trackWidth: number;
    trackHeight: number;
    markerSize: number;
    borderWidth: number;
    onChange?: (start: number, end: number) => void;
    markerColor: string;
    renderCustomMarker?: (position: Position) => React.ReactNode;
}
export declare const Marker: ({ startPx, endPx, trackWidth, position, markerSize, borderWidth, trackHeight, gapPx, onChange, min, max, markerColor, renderCustomMarker, }: MarkerProps) => React.JSX.Element;
export declare type Position = 'left' | 'right';
export {};
