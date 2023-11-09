import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { categoryData } from '../Constrans/Data'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown} from 'react-native-reanimated';
const Categoury = ({ cati, getcategory, handleCategoury }) => {

    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4" contentContainerStyle={{ paddingHorizontal: 15 }}>

                {

                    cati.map((cat, index) => {
                        let isActive = cat.strCategory == getcategory;
                        let activeBtn = isActive ? 'bg-amber-500' : 'bg-black/10';
                        return (
                            <TouchableOpacity key={index} className="flex items-center  space-y-1" onPress={() => handleCategoury(cat.strCategory)}>
                                <View className={"rounded-full p-[6px] " + activeBtn}>
                                    <Image className="rounded-full" source={{ uri: cat.strCategoryThumb }} style={{
                                        width: hp(6.5),
                                        height: hp(6.5),

                                    }} />
                                </View>
                                <Text className="text-neutral-500">{cat.strCategory}</Text>

                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )
}

export default Categoury
