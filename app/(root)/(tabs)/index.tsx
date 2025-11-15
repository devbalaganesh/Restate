import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { Card, FeaturedCard } from "@/components/cards";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">

        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full" />

            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubrik-medium text-black-300">
                Good Morning
              </Text>
              <Text>Balaganesh</Text>
            </View>
          </View>

          <Image source={icons.bell} className="size-6" />
        </View>

        {/* Search BELOW Name */}
        <View className="mt-5">
          <Search />
        </View>

        {/* Featured Section */}
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">
                See All
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <FeaturedCard/>
      <Card/>
    </SafeAreaView>
  );
}
