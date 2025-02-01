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
import { app } from "../firebaseConfig";
import { router } from "expo-router";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);

	const handleAuth = async () => {
		const auth = getAuth(app);

		try {
			if (isSignUp) {
				await createUserWithEmailAndPassword(auth, email, password);
				Alert.alert("Success", "Account created successfully!");
			} else {
				await signInWithEmailAndPassword(auth, email, password);
				Alert.alert("Success", "Logged in successfully!");
			}
			router.replace("/(tabs)");
		} catch (error) {
			Alert.alert("Error", error.message);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{isSignUp ? "Sign Up" : "Login"}</Text>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
				keyboardType="email-address"
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={styles.input}
			/>
			<TouchableOpacity onPress={handleAuth} style={styles.button}>
				<Text style={styles.buttonText}>{isSignUp ? "Sign Up" : "Login"}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
				<Text style={styles.switchText}>
					{isSignUp
						? "Already have an account? Login"
						: "Don't have an account? Sign Up"}
				</Text>
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
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		width: 300,
		height: 40,
		borderBottomWidth: 1,
		marginBottom: 20,
		padding: 10,
	},
	button: {
		backgroundColor: "blue",
		padding: 10,
		width: 200,
		alignItems: "center",
		marginBottom: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
	},
	switchText: {
		color: "blue",
	},
});
