import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Categoury from '../Component/Categoury';
import axios from 'axios'
import { Recipes } from '../Component/Recipes';
const Home = () => {
    const [getcategory, setCategory] = useState('Beef');
    const [cati, setCat] = useState([]);
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        getcategoryvalues();
        getRecipes();
    }, [])
    const getcategoryvalues = async () => {
        try {
            const resposnse = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            if (resposnse && resposnse.data) {
                setCat(resposnse.data.categories);
            }
            // console.log(resposnse.data);
        } catch (error) {
            console.log("Error in fetching api" + error);
        }
    }
    const getRecipes = async (cati = "Beef") => {
        try {
            const resposnse = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${cati}`);
            if (resposnse && resposnse.data) {
                setMeals(resposnse.data.meals);
            }
            // console.log(resposnse.data);
        } catch (error) {
            console.log("Error in fetching api" + error);
        }
    }
    const handleCategoury = (category) => {
        getRecipes(category)
        setCategory(category);
        setMeals([])
    }
    return (
        <View className="flex-1 bg-white">
            <StatusBar className='dark' />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6 pt-14"
            >
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Image source={require("../../assets/avtar.png")} style={{ height: hp(5.3), width: hp(5.3) }} />
                    <EvilIcons name="bell" size={hp(5.3)} color="black" />
                </View>
                <View className="mx-4 space-y-2 mb-2">
                    <Text style={{ fontSize: hp(2) }} className="text-neutral-700">Hello,Sunny!</Text>
                    <View>
                        <Text style={{ fontSize: hp(3.8) }} className="text-neutral-600 font-semibold">Make your own food</Text>
                    </View>
                    <Text style={{ fontSize: hp(3.8) }} className="text-neutral-400 font-semibold">stay at <Text className="text-amber-500 ">home</Text></Text>
                </View>

                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput style={{ fontSize: hp(2) }} className="flex-1 text-base mb-1 pl-3 tracking-wider" placeholder='Search any recipe' placeholderTextColor={'gray'} ></TextInput>
                    <View className="bg-white rounded-full p-3">
                        <Entypo name="magnifying-glass" size={hp(3)} color="black" />
                    </View>
                </View>
                {/* {Categury} */}
                <View>
                    {cati.length > 0 && < Categoury cati={cati} getcategory={getcategory} handleCategoury={handleCategoury} />}
                </View>
                {/* {Recipes} */}
                <Recipes meals={meals} cati={cati} />

            </ScrollView>
        </View>
    )
}

export default Home
