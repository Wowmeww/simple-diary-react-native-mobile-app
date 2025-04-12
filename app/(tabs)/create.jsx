import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import Layout from "@/components/diary/layout";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";

const create = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [processing, setProcessing] = useState(false);
	const router = useRouter();
	const date = {
		year: new Date().getFullYear(),
		date: new Date().getDate(),
		month: new Date().toLocaleString("default", {
			month: "long",
		}),
	};
	return (
		<Layout>
			<View className="p-2 flex-1 justify-center items-center mb-20 overflow-hidden">
				<View className="w-full max-w-xl mx-auto rounded-lg overflow-hidden min-h-max">
					<View className="bg-primary/60 p-2">
						<Text className="text-white leading-none text-center font-semibold mb-2">
							{date.month}
						</Text>
						<Text className="text-white leading-none text-center font-semibold text-7xl">
							{date.date}
						</Text>
						<Text className="text-white leading-none text-center font-semibold">
							{date.year}
						</Text>
					</View>
					{/* Input fields */}
					<View className="bg-primary/30 p-2 h-fit ">
						<View className="border-b border-white flex-row items-center gap-2 mb-2">
							<View>
								<FontAwesome6
									name="heading"
									size={30}
									color={title === "" ? "#fff" : "#fff"}
								/>
							</View>
							<View>
								<TextInput
									placeholder="Title..."
									className="focus:outline-0 w-full placeholder:text-white/80 p-0 relative justify-start text-xl text-white font-bold"
									onChangeText={(value) => setTitle(value)} // Update state with input
									value={title} // Bind state to TextInput
								/>
							</View>
						</View>
						<View className="h-60">
							<TextInput
								placeholder="Content..."
								multiline={true}
								numberOfLines={8}
								className="focus:outline-0 placeholder:text-white/80 relative justify-start text-base  text-white font-medium "
								onChangeText={(value) => setContent(value)} // Update state with input
								value={content} // Bind state to TextInput
							/>
						</View>
					</View>
					<TouchableOpacity
						className="bg-primary/60 p-2"
						activeOpacity={0.2}
						onPress={() => store(title, content)} // Call store function with title and content
					>
						<Text className="text-3xl font-bold text-center text-white">
							Save
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Overlay */}
			<View className="absolute inset-0 bg-white/10" style={{ display: processing ? "flex" : "none" }}>
				<FontAwesome6
					name="spinner"
					size={40}
					color="#FD20D4"
					className="absolute animate-spin left-1/2 top-1/2"
				/>
			</View>
		</Layout>
	);
	async function store(title, content) {
		setProcessing(true);
		try {
			const newKey = await AsyncStorage.getAllKeys().then((keys) => {
				return keys.length ? Math.max(...keys.map(Number)) + 1 : 1;
			});
			const newEntry = {
				title,
				content,
				date: new Date().toISOString(),
			};

			await AsyncStorage.setItem(newKey.toString(), JSON.stringify(newEntry));

			setTitle("");
			setContent("");
			setProcessing(false);
			router.navigate("/(tabs)");
		} catch (error) {
			console.error("Error saving data", error);
		}
	}
};

export default create;
