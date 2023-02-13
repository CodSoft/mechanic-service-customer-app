import React, {useMemo} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = () => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar backgroundColor={theme.light} />
      <View style={styles.screen}>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.white,
    },
  });

export default Login;
