import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { GlobalContext } from "@/GlobalContext";
const card = ({ entry, select }) => {
	const { setSelected, setIsOptionOpen, setSelectedForOption } = useContext(GlobalContext);
	const router = useRouter();
	const date = {
		year: new Date(entry.value.date).getFullYear(),
		date: new Date(entry.value.date).getDate(),
		month: new Date(entry.value.date).toLocaleString("default", {
			month: "long",
		}),
	};
	const title =
		entry.value.title.length > 18
			? entry.value.title.slice(0, 18) + "..."
			: entry.value.title;
	const content =
		entry.value.content.length > 140
			? entry.value.content.slice(0, 140) + "..."
			: entry.value.content;
	return (
		<>
			<TouchableOpacity
				style={styles.card}
				onPress={() => {
					setSelected(entry.key);
					router.navigate("/edit");
				}}
				onLongPress={() => {
					setSelectedForOption(entry.key);
					setTimeout(600);
					setIsOptionOpen(true);
				}}
				activeOpacity={0.8}
			>
				<View style={styles.date}>
					<Text style={styles.text.xs}>{date.year}</Text>
					<Text style={styles.text.xxl}>{date.date}</Text>
					<Text style={styles.text.xs}>{date.month}</Text>
				</View>
				<View style={styles.cardRight}>
					<Text style={styles.text.xl}>{title}</Text>
					<Text style={styles.text.normal}>{content}</Text>
				</View>
			</TouchableOpacity>
		</>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#FD20D465",
		borderRadius: 4,
		display: "inline-flex",
		flexDirection: "row",
		width: "100%",
		padding: 8,
		gap: 10,
		marginVertical: 7,
	},
	date: {
		backgroundColor: "#ffffff20",
		padding: 8,
		borderRadius: 4,
		alignText: "center",
		width: "28%",
	},
	text: {
		xs: {
			fontSize: 12,
			color: "#ffffff",
			textAlign: "center",
		},
		xxl: {
			fontSize: 54,
			color: "#ffffff",
			textAlign: "center",
			fontWeight: "bold",
		},
		xl: {
			fontSize: 20,
			color: "#ffffff",
			fontWeight: "bold",
			marginBottom: 2,
		},
		normal: {
			fontSize: 14,
			color: "#ffffff",
			textWrap: "wrap",
			lineHeight: 16,
			textAlign: "justify",
		},
	},
	cardRight: {
		flex: 1,
		display: "flex",
	},
});
export default card;
