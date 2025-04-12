import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const router = useRouter();

	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: true,
				tabBarInactiveTintColor: "#fff",
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarShowLabel: false,
				headerTransparent: true,
				tabBarTranslucent: true,
				headerTintColor: "#fff",
				headerTitleAlign: "center",

				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
					},
					default: {
						backgroundColor: "rgba(6,117,252,0.5)",
						position: "absolute",
					},
				}),
				headerStyle: {
					backgroundColor: "rgba(6,117,252,0.4)",
				},
				headerBackButtonDisplayMode: "default",
				headerBackTitleVisible: true,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={30}
							name="house.fill"
							color={color}
						/>
					),
					
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Add",
					tabBarIcon: ({ color }) => (
						<FontAwesome6
							name="add"
							size={29}
							color={color}
						/>
					),
					
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: "About",
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="groups-2"
							size={30}
							color={color}
						/>
					),
					
				}}
			/>
			
		</Tabs>
	);
}
