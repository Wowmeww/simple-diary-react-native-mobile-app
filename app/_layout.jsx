import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import "@/global.css";
import { GlobalProvider } from "@/GlobalContext"; 
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GlobalProvider>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="edit" options={{
					title: "Edit",
					headerStyle: {
						backgroundColor: "rgba(6,117,252,0.5)",
					},
					headerTintColor: "#fff",
					headerTitleAlign: "center",
					headerTransparent: true
				}} />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</GlobalProvider>
	);
}
