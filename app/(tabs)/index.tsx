// import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import Post from "../../components/Post";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { Link } from "expo-router";
// import { app } from "../../firebaseConfig.js";
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet,
} from "react-native";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { router } from "expo-router";

export default function Home() {
	const handleSignOut = async () => {
		try {
			await getAuth(app).signOut();
			router.replace("/login");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const handleViewAllPosts = () => {
		router.push("/posts");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Welcome Home!</Text>

			<TouchableOpacity
				style={[styles.button, styles.viewPostsButton]}
				onPress={handleViewAllPosts}
			>
				<Text style={styles.buttonText}>View All Posts</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.button, styles.signOutButton]}
				onPress={handleSignOut}
			>
				<Text style={styles.buttonText}>Sign Out</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	text: {
		fontSize: 24,
		marginBottom: 30,
		fontWeight: "bold",
	},
	button: {
		padding: 15,
		borderRadius: 8,
		marginVertical: 10,
		width: 200,
		alignItems: "center",
	},
	viewPostsButton: {
		backgroundColor: "#4CAF50",
	},
	signOutButton: {
		backgroundColor: "#f44336",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});

// function signUp() {
// 	const auth = getAuth(app);

// 	createUserWithEmailAndPassword(
// 		auth,
// 		"jane.doe@example.com",
// 		"SuperSecretPassword!"
// 	)
// 		.then((res) => console.log(res))
// 		.catch((err) => console.log(err));
// }

// return (
// 	<View style={styles.container}>
// 		<Text style={styles.text}>Hello, World</Text>
// 		<Text style={styles.text}>Check For Firebase Integration!</Text>

// 		<TouchableOpacity style={styles.button_container} onPress={signUp}>
// 			<Text style={styles.button_text}>SignUp</Text>
// 		</TouchableOpacity>

// 		<Post
// 			title="Second Post"
// 			content="This is another example of the Post component. It is reusable and flexible!"
// 			timestamp="Jan 19, 2025"
// 		/>

// 		<Link href="/about" style={styles.button}>
// 			Go to About screen
// 		</Link>
// 	</View>
// );
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#25292e",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	text: {
// 		color: "#fff",
// 	},
// 	button: {
// 		fontSize: 20,
// 		textDecorationLine: "underline",
// 		color: "#fff",
// 	},
// 	button_text: {
// 		textAlign: "center",
// 		fontSize: 24,
// 		color: "#1976d2",
// 	},
// 	button_container: {
// 		borderRadius: 15,
// 		flexDirection: "row",
// 		margin: 16,
// 		padding: 24,
// 		justifyContent: "center",
// 		backgroundColor: "#e6e6e6",
// 	},
// });
