import {
	Image,
	StyleSheet,
	Platform,
	Text,
	ImageBackground,
	View,
	SafeAreaView,
	ScrollView
} from "react-native";

import Layout from "@/components/diary/layout";
export default function HomeScreen() {
	return (
		<Layout>
			<SafeAreaView className="flex-1 p-2">
			<ScrollView>
				<View className="bg-primary/50 rounded-md p-1 flex-1 flex-row" >
					<View>
						<Text>Month</Text>
						<Text>Date</Text>
						<Text>Year</Text>
					</View>
					<View>
					<Text>Title</Text>
					<Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aperiam beatae eius.</Text>
					</View>
				</View>
			</ScrollView>
			</SafeAreaView>
		</Layout>
	);
}
