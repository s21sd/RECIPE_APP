import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeIn, FadeOut } from 'react-native-reanimated';
import axios from 'axios'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../Component/Loading';
import YouTubeIframe from 'react-native-youtube-iframe';
const RecipeDetails = (props) => {
    let item = props.route.params;
    // console.log(item);
    const [isActivity, setisActive] = useState(false);
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getRecipesDetails(item.idMeal);
    }, [])

    const getRecipesDetails = async (id) => {
        try {
            const resposnse = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (resposnse && resposnse.data) {
                setMeal(resposnse.data.meals[0]);
                setLoading(false);
            }
            // console.log(resposnse.data.meals);
        } catch (error) {
            console.log("Error in fetching api" + error);
        }
    }
    const ingerdiansIndex = (meal) => {
        if (!meal) {
            return [];
        }
        let index = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                index.push(i);
            }

        }
        return index;
    }
    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }


    return (
        <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{
            paddingBottom: 30
        }}>
            <StatusBar style='light' />
            <View className="flex-row justify-center">
                {/* {console.log(item.strMeal)} */}
                <Image sharedTransitionTag={item.strMeal} source={{ uri: item.strMealThumb }} style={{ borderRadius: 53, width: wp(98), height: hp(50), borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }} />

                <Animated.View entering={FadeIn.delay(200).duration(1000)} className="absolute flex-row justify-between items-center w-full pt-14">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full p-2 ml-5 bg-white">
                        <AntDesign name="left" size={hp(3.5)} color="#fbbf24" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setisActive(!isActivity)} className="rounded-full p-2 mr-5 bg-white">
                        <AntDesign name="hearto" size={hp(3.5)} color={isActivity ? "red" : "gray"} />
                    </TouchableOpacity>

                </Animated.View>
            </View>
            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className="flex px-4 pt-8 justify-between space-y-4">

                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                            <Text style={{ fontSize: hp(3) }} className="flex-1 font-bold text-neutral-700">

                                {meal?.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} className="flex-1 font-medium text-neutral-500">
                                {meal?.strArea}
                            </Text>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{
                                    width: hp(6.5),
                                    height: hp(6.5),
                                }} className='flex bg-white rounded-full justify-center items-center'>
                                    <AntDesign name="clockcircle" size={hp(4)} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(4) }} className='font-bold text-neutral-700'>35</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Mins</Text>

                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{
                                    width: hp(6.5),
                                    height: hp(6.5),
                                }} className='flex bg-white rounded-full justify-center items-center'>

                                    <FontAwesome name="user" size={hp(4)} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(4) }} className='font-bold text-neutral-700'>05</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Servings</Text>

                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{
                                    width: hp(6.5),
                                    height: hp(6.5),
                                }} className='flex bg-white rounded-full justify-center items-center'>

                                    <FontAwesome name="fire" size={hp(4)} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(4) }} className='font-bold text-neutral-700'>103</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Cal</Text>

                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{
                                    width: hp(6.5),
                                    height: hp(6.5),
                                }} className='flex bg-white rounded-full justify-center items-center'>
                                    <Ionicons name="file-tray-stacked" size={hp(4)} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Feather name="heart" size={hp(4)} style={{ marginTop: 5, }} color="black" />
                                    {/* <Text style={{ fontSize: hp(4) }} className='font-bold text-neutral-700'></Text> */}
                                    <Text style={{ fontSize: hp(1.4) }} className='font-bold text-neutral-700'>Easy</Text>

                                </View>
                            </View>
                        </Animated.View>


                        {/* {ingerdians} */}
                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700" >Ingredients</Text>
                            <View className="space-y-2 ml-3">
                                {
                                    ingerdiansIndex(meal).map(i => {
                                        return (
                                            <View key={i} className="flex-row space-x-4">
                                                <View style={{ height: hp(1.5), width: hp(1.5) }}
                                                    className="bg-amber-300 rounded-full" />
                                                <View className="flex-row space-x-2">
                                                    <Text style={{ fontSize: hp(1.7) }} className="font-extrabold text-neutral-700">{meal['strMeasure' + i]}</Text>
                                                    <Text style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-600">{meal['strIngredient' + i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>

                        </Animated.View>

                        {/* {instructions} */}

                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700" >Instructions</Text>
                            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                                {
                                    meal?.strInstructions
                                }
                            </Text>

                        </Animated.View>

                        {/* recipe video */}
                        {
                            meal.strYoutube && (
                                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                                    <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                        Recipe Video
                                    </Text>
                                    <View>
                                        {/* YoutubeIfram uses webview and it does not work properly on android (until its fixed we'll just show the video on ios) */}
                                        {

                                            <YouTubeIframe
                                                webViewProps={{
                                                    overScrollMode: "never"
                                                }}
                                                videoId={getYoutubeVideoId(meal.strYoutube)}
                                                height={hp(30)}
                                            />

                                        }

                                    </View>
                                </Animated.View>
                            )
                        }
                    </View>
                )
            }

        </ScrollView>
    )
}

export default RecipeDetails
