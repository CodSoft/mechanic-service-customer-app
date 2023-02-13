import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {useSelector} from 'react-redux';

// Files
import {strings} from '../constants';
import {fonts} from '../theme';
import {getScreenHeight} from '../utils/domUtils';

const InternetConnection = (props: any) => {
  const [show, setShow] = useState(false);
  const isEnable = useRef(false);
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    if (isEnable.current) {
      if (props.is_internet) {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }
    }
    isEnable.current = true;
  }, [props.is_internet]);

  if (!props.is_internet) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>
          {strings.internet.internet_not_available}
        </Text>
      </View>
    );
  }
  if (show) {
    return (
      <View style={[styles.screen, {backgroundColor: '#35AA4E'}]}>
        <Text style={styles.title}>{strings.internet.internet_available}</Text>
      </View>
    );
  }
  return null;
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.primaryColor,
      height: getScreenHeight(3),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? getScreenHeight(2) : 0,
      width: '100%',
      zIndex: 10,
      elevation: 1,
    },
    title: {
      fontSize: getScreenHeight(1.6),
      color: theme.white,
      fontFamily: fonts.semibold,
    },
  });

export default InternetConnection;
