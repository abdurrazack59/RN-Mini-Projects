import React, { useRef, forwardRef } from 'react';
import { Text, View, Dimensions, } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useCombinedRefs } from '../../utils/use-combined-refs';
import Colors from '../../constants/Colors';


export const SimpleContent = forwardRef(({ children, onClose }, ref) => {

  const modalizeRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  const deviceHeight = Dimensions.get("window").height;


  const renderHeader = () => {
    return (
      <View style={{ backgroundColor: Colors.white, paddingVertical: 4, borderRadius: 20 }}>
        <Text></Text>
      </View>
    )
  }

  return (
    <Modalize
      ref={combinedRef}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        // stickyHeaderIndices: [0],
      }}
      modalHeight={deviceHeight / 1.25}
      handlePosition={'inside'}
      handleStyle={{ backgroundColor: Colors.medium, }}
      HeaderComponent={renderHeader()}
      onClose={onClose}
    >
      {children}
    </Modalize>
  );
});
