import React, {useMemo} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import {strings} from '../constants';
import {fonts} from '../theme';
import {getScreenHeight, getScreenWidth} from '../utils/domUtils';

const CustomLoadingModal = (props: any) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
        {...props}>
        <StatusBar barStyle={'dark-content'} />
        <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
          <View style={styles.modalContanier}>
            <View style={styles.row}>
              <ActivityIndicator size={'large'} color={theme.primaryColor} />
              <Text style={styles.title}>{strings.common.loading}</Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContanier: {
      backgroundColor: theme.white,
      width: getScreenWidth(90),
      padding: getScreenHeight(2),
      alignSelf: 'center',
      borderRadius: getScreenHeight(1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.medium,
      color: theme.textColor,
      marginLeft: getScreenHeight(1),
    },
  });

export default CustomLoadingModal;
