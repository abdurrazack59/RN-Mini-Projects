import React from 'react'
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Colors from '../../constants/Colors';


const SkeletonLoading = () => {
    return (
        <View style={{ marginBottom: 12, }}>
            <SkeletonPlaceholder >
                <SkeletonPlaceholder.Item marginHorizontal={15} >
                    <SkeletonPlaceholder.Item width='100%' height={175} borderRadius={6} />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                    width="40%"
                    height={20}
                    borderRadius={6}
                    marginLeft={15}
                    marginTop={10}

                />
                <SkeletonPlaceholder.Item
                    width="40%"
                    height={20}
                    borderRadius={6}
                    marginLeft={15}
                    marginTop={10}

                />
                <SkeletonPlaceholder.Item
                    width="70%"
                    height={20}
                    borderRadius={6}
                    marginLeft={15}
                    marginTop={10}
                />
            </SkeletonPlaceholder>
        </View>
    )
}

export default SkeletonLoading;
