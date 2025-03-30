import {
	Image,
	StyleSheet,
	Platform,
	Text,
	ImageBackground,
	View,
} from "react-native";

import Layout from "@/components/diary/layout";
export default function HomeScreen() {
	return (
		<Layout>
			<Text className="text-red-500 text-9xl">Home</Text>
		</Layout>
	);
}
