import React from "react";

import {
	Image,
	StyleSheet,
	Platform,
	Text,
	ImageBackground,
	View,
	SafeAreaView,
} from "react-native";

import background from "@/assets/images/diary/background.png";

const layout = ({ children }) => {
	return (
		<>
			<ImageBackground
				source={background}
				resizeMode="cover"
				style={{
					alignItems: "center",
					justifyContent: "center",
					flex: 1,
					backgroundPosition: "center",
					height: "100%",
					width: "100%",
				}}
				className="w-full h-full"
			>
				<SafeAreaView
					className="flex-1 bg-red-700"
					style={{
						marginTop: 100,
						paddingHorizontal: 1,
						height: "100%",
						width: "100%",
					}}
				>
					{children}
				</SafeAreaView>
			</ImageBackground>
		</>
	);
};

export default layout;
