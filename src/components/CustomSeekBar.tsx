import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Animated, Text, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// Files
import {updatedShowModal} from '../redux/common';
import {fonts} from '../theme';
import {getScreenHeight} from '../utils/domUtils';

const CustomSeekBar = () => {
  const theme = useSelector((state: any) => state.colors.theme);
  const modalStatus = useSelector((state: any) => state.common.modalData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const opacity = useState(new Animated.Value(0))[0];

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  useEffect(() => {
    fadeIn();
  }, [fadeIn]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(updatedShowModal({show: false, message: '', type: ''}));
    }, 2000);
  }, [dispatch]);

  return (
    <Animated.View
      style={[
        styles.screen,
        {
          opacity: opacity,
          backgroundColor:
            modalStatus.type === 'error' ? theme.primaryColor : theme.green,
        },
      ]}>
      <Text numberOfLines={1} style={styles.title}>
        {modalStatus?.message}
      </Text>
    </Animated.View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.primaryColor,
      height: getScreenHeight(4),
      alignSelf: 'center',
      top: Platform.OS === 'android' ? getScreenHeight(2) : getScreenHeight(4),
      position: 'absolute',
      zIndex: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getScreenHeight(1),
      elevation: 1,
      paddingHorizontal: getScreenHeight(1),
      marginHorizontal: getScreenHeight(1),
    },
    title: {
      color: theme.white,
      fontFamily: fonts.semibold,
      fontSize: getScreenHeight(1.6),
    },
  });

export default CustomSeekBar;
