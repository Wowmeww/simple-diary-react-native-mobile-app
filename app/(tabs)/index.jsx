import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Layout from "@/components/diary/layout";
import Card from "@/components/diary/card";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { GlobalContext } from "@/GlobalContext";

export default function HomeScreen() {
	const { setSelected, isOptionOpen, selectedForOption, setIsOptionOpen } =
		useContext(GlobalContext);

	const router = useRouter();
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
		setSelected(null);
		fetchData();
	}, [isOptionOpen, selectedForOption]);

	return (
		<>
			<Layout>
				<ScrollView className="p-2 flex-1  w-full max-w-xl mx-auto">
					{entries.map((entry) => (
						<Card
							entry={entry}
							key={entry.key}
						/>
					))}
				</ScrollView>
				{isOptionOpen && (
					<View className="absolute inset-0 bg-white/60 z-10 flex-1 justify-center">
						<View className="mb-24 bg-secondary/80 p-4 mx-auto min-w-80 rounded-xl gap-3 relative">
							<TouchableOpacity
								onPress={() => setIsOptionOpen(false)}
								className="absolute right-0 top-0 p-3 z-30"
							>
								<AntDesign
									name="close"
									size={20}
									color="white"
								/>
							</TouchableOpacity>
							<Text className="font-medium text-center text-4xl text-white capitalize">
								Options
							</Text>
							<View className="flex-row justify-center gap-6 items-center">
								<TouchableOpacity
									onPress={handleDelete}
									className="bg-red-500 py-1 px-3 rounded-md border border-white"
								>
									<Text className=" font-medium text-white">Delete</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={handleEdit}
									className="bg-yellow-400 py-1 px-3 rounded-md border border-white"
								>
									<Text className=" font-medium text-white">Edit</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			</Layout>
		</>
	);
	async function handleDelete() {
		await AsyncStorage.removeItem(selectedForOption).then(() => {
			setIsOptionOpen(false);
		});
	}
	function handleEdit() {
		setSelected(selectedForOption);
		setIsOptionOpen(false);
		router.navigate("/edit");
	}
}
