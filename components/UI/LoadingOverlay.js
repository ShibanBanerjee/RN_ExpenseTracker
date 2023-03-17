import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="grey" />
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    }
})