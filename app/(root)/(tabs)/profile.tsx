import {Text,View,Image, Touchable, TouchableOpacity, ImageSourcePropType, Alert} from "react-native"
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface SettingsItemProps{
    icon:ImageSourcePropType,
    title:string,
    onPress?:()=>void,
    textStyle?:String,
    showArrow?:boolean;
}
const SettingItem=({icon,title,onPress,textStyle,showArrow=true}:SettingsItemProps)=>{
    return (
    <TouchableOpacity onPress={onPress}
    className="flex flex-row items-center justify-between py-3">
        <View className="flex flex-row items-center gap-3">
            <Image source={icon} className="size-6"/>
            <Text  className="text-lg font-rubik-medium text-black-300">{title}</Text>
        </View>
        {showArrow && <Image source={icons.rightArrow} className="size-5"/>}
        
    </TouchableOpacity>
)}   
const profile=()=>{
    const{user,refetch} = useGlobalContext()
    const handleLogout=async()=>{
        const result = await logout();
        if(result){
            Alert.alert("You have been logged out successfully")
            refetch(); 
        }
        else{
            Alert.alert("An error occoured while logging out")
        }
    }
    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-32 px-7"
            >

        <View className="flex flex-row items-center justify-between mt-5">
            
        
        <Text className="text-xl font-rubrik-bold">Profile</Text>
            <Image source={icons.bell}className="size-5"/>
            </View>
            <View className="flex-row justify-center flex mt-5">
                <View className="flex flex-col items-center relative mt-5">
                    <Image source={{uri:user?.avatar}} className="size-44 relative rounedd-full"/>
                    <TouchableOpacity className="absolute bottom-11 right-2">
                        <Image source={icons.edit} className="size-9"/>
                    </TouchableOpacity>
                    <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
                    
                </View>
                </View>
                
            <View className="flex flex-col mt -10">
                <SettingItem icon={icons.calendar} title="My bookings"/>
                 <SettingItem icon={icons.wallet} title="Payments"/>
                  <View className="flex flex-col mt-5 border-t pt-5 border-primary-200"></View>

                  {settings.slice(2).map((item, index) => (
  <SettingItem key={index} {...item} />
))}

                 </View>

                            <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                                <SettingItem icon={icons.logout} textStyle={"text-danger"} showArrow={false} onPress={handleLogout} title="Logout"/>
                            </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}
export default profile;