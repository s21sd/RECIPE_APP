import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mealData } from '../Constrans/Data';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import Loading from './Loading';
export const Recipes = ({ cati, meals }) => {
    return (
        <View className="mx-5 my-5 space-y-4">
            <Text style={{ fontSize: hp(4) }} className="font-semibold text-neutral-600 ">Recipes</Text>
            <View>
                {
                    cati.length == 0 || meals.length == 0 ? (
                        <Loading size="large" className="mt-20" />
                    ) :
                        (<MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />)

                }

            </View>
        </View>
    )
}
const RecipeCard = ({ item, index }) => {
    let isEven = index % 2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable
                className="flex  justify-center mb-4 space-y-1"
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}>
                <Image source={{ uri: item.strMealThumb }} index={index} style={{ borderRadius: 35, width: '100%', height: index % 3 == 0 ? hp(25) : hp(35) }} className="bg-black/5" />
                <Text style={{ fontSize: hp(2) }} className="text-neutral-500">{
                    item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                }</Text>
            </Pressable>

        </Animated.View>
    )
}
