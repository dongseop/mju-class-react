import React from 'react';
import { Dimensions } from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';

export default ({ values }) => {
  return (
    <LineChart
      data={{
        datasets: [{
          data: values
        }]
      }}
      width={Dimensions.get('window').width} // from react-native
      height={220}
      chartConfig={{
        backgroundColor: '#022173',
        backgroundGradientFrom: '#022173',
        backgroundGradientTo: '#1b3fa0',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 0
        }
      }}
      bezier
      style={{
        marginVertical: 0,
        borderRadius: 0
      }}
    />
  );
};