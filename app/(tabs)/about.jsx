import { View, Text } from "react-native";
import React from "react";
import Layout from "@/components/diary/layout";
const about = () => {
	const twClass = {
		text: "text-center font-medium text-base text-white capitalize",
	};
	return (
		<Layout>
			<View className="flex-1 justify-center items-center mb-24" >
				<View className="bg-primary/60 py-10 px-8 w-[80%] rounded-xl gap-3">
					<Text className="font-normal text-center text-base text-white capitalize">
						Submitted by:
					</Text>
					<Text className={twClass.text}>Nico Bernard B. Firmanes</Text>
					<Text className={twClass.text}>Irish S. Ofalsa</Text>
					<Text className={twClass.text}>Danielle Marie F. Villarta</Text>
					<Text className={twClass.text}>Lance Arvin Gealone</Text>
				</View>
			</View>
		</Layout>
	);
};

export default about;
