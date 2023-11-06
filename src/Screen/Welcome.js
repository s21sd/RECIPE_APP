import { StatusBar } from 'expo-status-bar'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Welcome = () => {
    const ringonePadding1 = useSharedValue(0);
    const ringonePadding2 = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ringonePadding1.value = 0;
        ringonePadding2.value = 0;
        setTimeout(() => ringonePadding1.value = withSpring(ringonePadding1.value + hp(5)), 100)
        setTimeout(() => ringonePadding2.value = withSpring(ringonePadding2.value + hp(5.5)), 300)

        setTimeout(() => navigation.navigate("Home"),2500);
    }, [])
    return (
        <View className="flex-1 justify-center items-center bg-amber-500">
            <StatusBar className='light' />
            <Animated.View className="bg-white/20 rounded-full" style={{ padding: ringonePadding1 }}>
                <Animated.View className="bg-white/20 rounded-full" style={{ padding: ringonePadding2 }}>
                    <Image source={require('../../assets/welcome.png')}
                        style={{
                            width: hp(25),
                            height: hp(25)
                        }}

                    />
                </Animated.View>
            </Animated.View>
            {/* {"For punch line "} */}
            <View className="flex items-center mt-6">
                <Text style={{ fontSize: hp(7) }} className="font-bold text-white text-6xl">FOODY</Text>
                <Text style={{ fontSize: hp(2) }} className="font-medium text-white  text-lg">Food is always right</Text>
            </View>
        </View>
    )
}

export default Welcome
