import React from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function CreatePostScreen() {
	const router = useRouter();

	const startForm = () => {
		router.push("/forms/date");
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<Text style={styles.header}>Create New Post</Text>

			<Text style={styles.description}>
				Let's create a new post about someone you met. We'll go through each
				detail step by step.
			</Text>

			<TouchableOpacity style={styles.button} onPress={startForm}>
				<Text style={styles.buttonText}>Start Creating Post</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
	},
	contentContainer: {
		padding: 20,
		paddingBottom: 40,
		justifyContent: "center",
		flex: 1,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 20,
		textAlign: "center",
	},
	description: {
		fontSize: 16,
		color: "#ccc",
		textAlign: "center",
		marginBottom: 40,
		lineHeight: 24,
	},
	button: {
		backgroundColor: "#ffd33d",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "#25292e",
		fontSize: 16,
		fontWeight: "bold",
	},
});
