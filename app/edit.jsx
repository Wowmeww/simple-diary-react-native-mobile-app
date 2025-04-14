import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Layout from "@/components/diary/layout";
import { useRouter, useGlobalSearchParams } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { GlobalContext } from "@/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const edit = () => {
	const [entry, setEntry] = useState(null);
	const { selected, setSelectedForOption, } =
		useContext(GlobalContext);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [processing, setProcessing] = useState(false);
	const router = useRouter();
	const [date, setDate] = useState({});

	useEffect(() => {
		if (selected) {
			AsyncStorage.getItem(selected).then((value) => {
				const entry = JSON.parse(value);
				setEntry(entry);
				setDate({
					year: new Date(entry.date).getFullYear(),
					month: new Date(entry.date).toLocaleString("default", {
						month: "long",
					}),
					date: new Date(entry.date).getDate(),
				});
				setTitle(entry.title);
				setContent(entry.content);
			});
		}
	}, []);

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
						<View
							className={`border-b overflow-hidden ${
								title === "" ? "border-red-500" : "border-white"
							} flex-row items-end gap-2 mb-2 `}
						>
							<View>
								<FontAwesome6
									name="heading"
									size={30}
									color={title === "" ? "#ef4444" : "#ffffff"}
								/>
							</View>
							<View className="flex-1">
								<TextInput
									placeholder="Title..."
									className="focus:outline-0  placeholder:text-white/80 p-0 justify-start text-xl text-white font-bold"
									onChangeText={(value) => setTitle(value)} // Update state with input
									value={title} // Bind state to TextInput
								/>
							</View>
						</View>
						<View className="h-56">
							<TextInput
								placeholder="Content..."
								multiline={true}
								numberOfLines={8}
								className="focus:outline-0 min-w-full  placeholder:text-white/80 relative justify-start text-base  text-white font-medium "
								onChangeText={(value) => setContent(value)} // Update state with input
								value={content} // Bind state to TextInput
							/>
						</View>
					</View>
					<TouchableOpacity
						className="bg-primary/60 p-2"
						activeOpacity={0.2}
						disabled={processing}
						onPress={handleUpdate} // Call store function with title and content
					>
						<Text className="text-3xl font-bold text-center text-white">
							Update
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Overlay */}
			{processing && (
				<View className="absolute inset-0 bg-white/10">
					<FontAwesome6
						name="spinner"
						size={40}
						color="#FD20D4"
						className="absolute animate-spin left-1/2 top-1/2 -translate-x-[-50%] translate-y-[-50%]"
					/>
				</View>
			)}
		</Layout>
	);
	async function handleUpdate() {
		// setProcessing(true);
		try {
			if (title === "" || content === "") {
				setProcessing(false);
				return;
			}

			const updatedEntry = {
				...entry,
				title: title,
				content: content,
			};
			// merge the new entry with object
			await AsyncStorage.setItem(String(entry.key), JSON.stringify(updatedEntry));
			// setProcessing(false);
			setSelectedForOption(null);
			router.navigate("/(tabs)");
		} catch (error) {
			console.error("Error saving data", error);
		}
	}
};

export default edit;
