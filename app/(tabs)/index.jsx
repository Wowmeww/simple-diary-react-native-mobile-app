import {
	Image,
	StyleSheet,
	Platform,
	Text,
	ImageBackground,
	View,
	SafeAreaView,
	ScrollView,
} from "react-native";
import Layout from "@/components/diary/layout";
import Card from "@/components/diary/card";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
	const [entries, setEntries] = useState([]);
	const fetchData = async () => {
		try {
			const keys = await AsyncStorage.getAllKeys();
			const result = await AsyncStorage.multiGet(keys);
			const entries = result.map(([key, value]) => ({
				key,
				value: JSON.parse(value),
			}));
			entries.sort((a, b) => new Date(b.value.date) - new Date(a.value.date));
			setEntries(entries);
		} catch (error) {
			console.error("Error retrieving data", error);
		}
	};
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<Layout>
			<ScrollView className="p-2 flex-1  w-full max-w-xl mx-auto">
				{entries.map((entry) => (
					<Card
						entry={entry}
						key={entry.key}
					/>
				))}
			</ScrollView>
			<View className="absolute inset-0 bg-white/60 z-10 flex-1 justify-center items-center">
				<View className="mb-24 bg-secondary/80 py-10 px-8 mx-auto max-w-xl rounded-xl gap-3">
					<Text className="font-normal text-center text-base text-white capitalize">
						Options
					</Text>
					<Text>Delete</Text>
					<Text>Edit</Text>
					<Text>cancel</Text>
				</View>
			</View>
		</Layout>
	);
}
