import React from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app, db } from "../../firebaseConfig";
import { useFormData } from "./FormContext";
import { formStyles } from "./FormStyles";

export default function ReviewPage() {
	const router = useRouter();
	const { formData, clearFormData } = useFormData();

	const handleSubmit = async () => {
		const auth = getAuth(app);
		console.log("Current user:", auth.currentUser);
		console.log("Form data:", formData);

		if (!formData.date || !formData.name) {
			Alert.alert("Error", "Please fill in all required fields");
			return;
		}

		if (!auth.currentUser) {
			Alert.alert("Error", "You must be logged in to create a post");
			return;
		}

		try {
			console.log("Firestore instance:", db);

			const postData = {
				date: formData.date,
				date_num: formData.date_num,
				name: formData.name,
				height: formData.height,
				industry: formData.industry,
				home: formData.home,
				hair_color: formData.hair_color,
				eye_color: formData.eye_color,
				how_we_met: formData.how_we_met,
				activity: formData.activity,
				rating: formData.rating,
				emoji: formData.emoji,
				icks: formData.icks,
				liked: formData.liked,
				mutuals: formData.mutuals,
				createdAt: serverTimestamp(),
				authorId: auth.currentUser.uid,
				authorEmail: auth.currentUser.email,
			};

			console.log("Attempting to add document with data:", postData);

			const docRef = await addDoc(collection(db, "posts"), postData);
			console.log("Document written with ID: ", docRef.id);

			// Clear form data immediately
			clearFormData();

			// Navigate to home immediately
			router.push("/(tabs)");

			// Show success alert
			Alert.alert("Success", "Post created successfully!");
		} catch (error) {
			console.error("Error creating post:", error);
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			Alert.alert("Error", `Failed to create post: ${errorMessage}`);
		}
	};

	const handleBack = () => {
		router.back();
	};

	const handleReturnToHome = () => {
		router.push("/(tabs)");
	};

	const renderField = (label: string, value: string) => {
		if (!value) return null;
		return (
			<View style={{ marginBottom: 15 }}>
				<Text style={{ color: "#ccc", fontSize: 14, marginBottom: 5 }}>
					{label}
				</Text>
				<Text style={{ color: "#fff", fontSize: 16 }}>{value}</Text>
			</View>
		);
	};

	return (
		<ScrollView
			style={formStyles.container}
			contentContainerStyle={formStyles.contentContainer}
		>
			<View style={formStyles.progressContainer}>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>1</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>2</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>3</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>4</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>5</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>6</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>7</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>8</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>9</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>10</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>11</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>12</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>13</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>14</Text>
				</View>
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>15</Text>
				</View>
			</View>

			<Text style={formStyles.header}>Review Your Post</Text>

			<View
				style={{
					backgroundColor: "#333",
					padding: 20,
					borderRadius: 8,
					marginBottom: 20,
				}}
			>
				{renderField("Date Met", formData.date)}
				{renderField("Name", formData.name)}
				{renderField("Height", formData.height)}
				{renderField("Industry", formData.industry)}
				{renderField("Home", formData.home)}
				{renderField("Hair Color", formData.hair_color)}
				{renderField("Eye Color", formData.eye_color)}
				{renderField("How We Met", formData.how_we_met)}
				{renderField("Activity", formData.activity)}
				{renderField("Rating", formData.rating)}
				{renderField("Emoji", formData.emoji)}
				{renderField("Icks", formData.icks)}
				{renderField("Liked", formData.liked)}
				{renderField("Mutuals", formData.mutuals)}
			</View>

			<TouchableOpacity style={formStyles.button} onPress={handleSubmit}>
				<Text style={formStyles.buttonText}>Create Post</Text>
			</TouchableOpacity>

			<TouchableOpacity style={formStyles.backButton} onPress={handleBack}>
				<Text style={formStyles.backButtonText}>Back</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[formStyles.backButton, { backgroundColor: "#ff6b6b" }]}
				onPress={handleReturnToHome}
			>
				<Text style={formStyles.backButtonText}>Return to Home</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
