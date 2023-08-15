import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, runOnJS, interpolate, Extrapolate } from 'react-native-reanimated';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var Marker = function Marker(_ref) {
  var startPx = _ref.startPx,
    endPx = _ref.endPx,
    trackWidth = _ref.trackWidth,
    position = _ref.position,
    markerSize = _ref.markerSize,
    borderWidth = _ref.borderWidth,
    trackHeight = _ref.trackHeight,
    gapPx = _ref.gapPx,
    onChange = _ref.onChange,
    min = _ref.min,
    max = _ref.max,
    markerColor = _ref.markerColor,
    renderCustomMarker = _ref.renderCustomMarker;
  var startX = useSharedValue(position === 'left' ? startPx : endPx);
  var markerStyle = useMemo(function () {
    return getMarkerStyle({
      position: position,
      trackHeight: trackHeight,
      markerSize: markerSize,
      borderWidth: borderWidth,
      markerColor: markerColor
    });
  }, [borderWidth, markerColor, markerSize, position, trackHeight]);
  function onUpdate(translationX) {
    'worklet';

    var newOffsetX = startX.value + translationX;
    var minValue = position === 'left' ? 0 : startPx + gapPx;
    var maxValue = position === 'left' ? endPx - gapPx : trackWidth;
    var clampX = Math.min(Math.max(newOffsetX, minValue), maxValue);
    function getInterpolatedValue(value) {
      return interpolate(value, [0, trackWidth], [min, max]);
    }
    if (!onChange) {
      return;
    }
    if (position === 'left') {
      runOnJS(onChange)(getInterpolatedValue(clampX), getInterpolatedValue(endPx));
    } else {
      runOnJS(onChange)(getInterpolatedValue(startPx), getInterpolatedValue(clampX));
    }
  }
  function onEnd() {
    'worklet';

    startX.value = position === 'left' ? startPx : endPx;
  }
  var gesture = Gesture.Pan().minDistance(0).onUpdate(function (e) {
    onUpdate(e.translationX);
  }).onEnd(onEnd);
  var customMarkerContainerStyle = getCustomMarkerContainerStyle(position);
  return React.createElement(GestureDetector, {
    gesture: gesture
  }, renderCustomMarker ? React.createElement(View, {
    style: customMarkerContainerStyle
  }, renderCustomMarker(position)) : React.createElement(View, {
    style: markerStyle
  }));
};
var getCustomMarkerContainerStyle = function getCustomMarkerContainerStyle(position) {
  return position === 'left' ? {
    position: 'absolute',
    left: 0
  } : {
    position: 'absolute',
    right: 0
  };
};
var getMarkerStyle = function getMarkerStyle(_ref2) {
  var position = _ref2.position,
    markerSize = _ref2.markerSize,
    borderWidth = _ref2.borderWidth,
    trackHeight = _ref2.trackHeight,
    markerColor = _ref2.markerColor;
  var sharedStyle = {
    position: 'absolute',
    backgroundColor: markerColor,
    top: (trackHeight - 2 * borderWidth - markerSize) / 2,
    width: markerSize,
    height: markerSize,
    borderRadius: markerSize / 2
  };
  return position === 'left' ? _extends({}, sharedStyle, {
    left: -((markerSize + borderWidth) / 2)
  }) : _extends({}, sharedStyle, {
    right: -((markerSize + borderWidth) / 2)
  });
};

var Indicator = function Indicator(_ref) {
  var trackHeight = _ref.trackHeight,
    trackWidth = _ref.trackWidth,
    markerSize = _ref.markerSize,
    borderWidth = _ref.borderWidth,
    onChange = _ref.onChange,
    gapPx = _ref.gapPx,
    startValue = _ref.startValue,
    endValue = _ref.endValue,
    min = _ref.min,
    max = _ref.max,
    indicatorColor = _ref.indicatorColor,
    markerColor = _ref.markerColor,
    backdropColor = _ref.backdropColor,
    renderCustomMarker = _ref.renderCustomMarker;
  var startPx = interpolate(startValue, [min, max], [0, trackWidth], {
    extrapolateLeft: Extrapolate.CLAMP,
    extrapolateRight: Extrapolate.CLAMP
  });
  var endPx = interpolate(endValue, [min, max], [0, trackWidth], {
    extrapolateLeft: Extrapolate.CLAMP,
    extrapolateRight: Extrapolate.CLAMP
  });
  var indicatorStyle = {
    position: 'absolute',
    left: startPx,
    right: trackWidth - endPx,
    height: trackHeight,
    backgroundColor: 'transparent',
    borderColor: indicatorColor,
    borderWidth: borderWidth
  };
  var startBackdropViewStyle = useMemo(function () {
    return {
      backgroundColor: backdropColor,
      width: startPx,
      height: '100%'
    };
  }, [backdropColor, startPx]);
  var endBackdropViewStyle = useMemo(function () {
    return {
      backgroundColor: backdropColor,
      width: trackWidth - endPx,
      position: 'absolute',
      left: endPx,
      height: '100%',
      zIndex: -1
    };
  }, [backdropColor, endPx, trackWidth]);
  return React.createElement(GestureHandlerRootView, {
    style: S.flex
  }, React.createElement(View, {
    style: startBackdropViewStyle
  }), React.createElement(Animated.View, {
    style: indicatorStyle
  }, React.createElement(Marker, {
    position: "left",
    startPx: startPx,
    endPx: endPx,
    trackWidth: trackWidth,
    trackHeight: trackHeight,
    borderWidth: borderWidth,
    markerSize: markerSize,
    onChange: onChange,
    gapPx: gapPx,
    min: min,
    max: max,
    markerColor: markerColor,
    renderCustomMarker: renderCustomMarker
  }), React.createElement(Marker, {
    position: "right",
    startPx: startPx,
    endPx: endPx,
    trackWidth: trackWidth,
    trackHeight: trackHeight,
    borderWidth: borderWidth,
    markerSize: markerSize,
    onChange: onChange,
    gapPx: gapPx,
    min: min,
    max: max,
    markerColor: markerColor,
    renderCustomMarker: renderCustomMarker
  })), React.createElement(View, {
    style: endBackdropViewStyle
  }));
};
var S = /*#__PURE__*/StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: 'row'
  }
});

var colors = {
  indicator: '#262626',
  track: '#f39c12',
  marker: '#262626',
  backdrop: 'rgba(0,0,0,0.3)',
  transparent: 'transparent'
};

var Track = function Track(_ref) {
  var renderIndicator = _ref.renderIndicator,
    height = _ref.height,
    trackColor = _ref.trackColor,
    imageBackgroundSource = _ref.imageBackgroundSource,
    imageStyle = _ref.imageStyle;
  var _useState = useState(0),
    trackWidth = _useState[0],
    setTrackWidth = _useState[1];
  var style = useMemo(function () {
    return {
      backgroundColor: imageBackgroundSource ? colors.transparent : trackColor,
      flexDirection: 'row',
      height: height
    };
  }, [height, imageBackgroundSource, trackColor]);
  return React.createElement(View, null, React.createElement(View, {
    onLayout: function onLayout(event) {
      try {
        var width = event.nativeEvent.layout.width;
        setTrackWidth(width);
      } catch (error) {
        console.log('Error in onLayout', String(error));
      }
    },
    style: style
  }, trackWidth !== 0 && renderIndicator(trackWidth)), imageBackgroundSource && React.createElement(View, {
    style: S$1.imageContainer
  }, React.createElement(Image, {
    source: imageBackgroundSource,
    style: imageStyle ? imageStyle : S$1.image
  })));
};
var S$1 = /*#__PURE__*/StyleSheet.create({
  imageContainer: /*#__PURE__*/_extends({}, StyleSheet.absoluteFillObject, {
    zIndex: -100
  }),
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'repeat'
  }
});

var Trimmer = function Trimmer(_ref) {
  var startValue = _ref.startValue,
    endValue = _ref.endValue,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 50 : _ref$height,
    _ref$markerSize = _ref.markerSize,
    markerSize = _ref$markerSize === void 0 ? 24 : _ref$markerSize,
    _ref$borderWidth = _ref.borderWidth,
    borderWidth = _ref$borderWidth === void 0 ? 2 : _ref$borderWidth,
    onChange = _ref.onChange,
    _ref$gapPx = _ref.gapPx,
    gapPx = _ref$gapPx === void 0 ? 0 : _ref$gapPx,
    min = _ref.min,
    max = _ref.max,
    _ref$trackColor = _ref.trackColor,
    trackColor = _ref$trackColor === void 0 ? colors.track : _ref$trackColor,
    _ref$indicatorColor = _ref.indicatorColor,
    indicatorColor = _ref$indicatorColor === void 0 ? colors.indicator : _ref$indicatorColor,
    _ref$markerColor = _ref.markerColor,
    markerColor = _ref$markerColor === void 0 ? colors.marker : _ref$markerColor,
    _ref$backdropColor = _ref.backdropColor,
    backdropColor = _ref$backdropColor === void 0 ? colors.backdrop : _ref$backdropColor,
    imageBackgroundSource = _ref.imageBackgroundSource,
    imageStyle = _ref.imageStyle,
    renderCustomMarker = _ref.renderCustomMarker;
  return React.createElement(Track, {
    trackColor: trackColor,
    imageBackgroundSource: imageBackgroundSource,
    imageStyle: imageStyle,
    height: height,
    renderIndicator: function renderIndicator(trackWidth) {
      return React.createElement(Indicator, {
        backdropColor: backdropColor,
        markerColor: markerColor,
        indicatorColor: indicatorColor,
        startValue: startValue,
        endValue: endValue,
        trackHeight: height,
        trackWidth: trackWidth,
        markerSize: markerSize,
        borderWidth: borderWidth,
        onChange: onChange,
        gapPx: gapPx,
        min: min,
        max: max,
        renderCustomMarker: renderCustomMarker
      });
    }
  });
};

export { Trimmer };
//# sourceMappingURL=react-native-value-range-selector.esm.js.map
