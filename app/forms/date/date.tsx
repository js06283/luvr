import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";

export default function DatePage() {
	const router = useRouter();
	const { formData, updateDateData, addDate } = useFormData();
	const [date, setDate] = useState(formData.currentDate.date || "");
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = async () => {
		if (date.trim() && !isSaving) {
			setIsSaving(true);
			try {
				updateDateData("date", date.trim());
				updateDateData("date_num", new Date().getTime().toString());

				// Save the date to Firebase
				const dateData = {
					...formData.currentDate,
					date: date.trim(),
					date_num: new Date().getTime().toString(),
				};

				await addDate(dateData);

				// Show success and go back to home
				Alert.alert("Success", "Date added successfully!");
				router.push("/(tabs)");
			} catch (error) {
				console.error("Error saving date:", error);
				Alert.alert("Error", "Failed to save date. Please try again.");
			} finally {
				setIsSaving(false);
			}
		}
	};

	const handleBack = () => {
		router.push("/forms/date/select-person");
	};

	const handleReturnToHome = () => {
		router.push("/(tabs)");
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
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>2</Text>
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
			</View>

			<Text style={formStyles.header}>When did you go on the date?</Text>
			<Text style={formStyles.subtitle}>
				Enter the date of your date with {formData.currentDate.personName}
			</Text>

			<TextInput
				style={formStyles.input}
				placeholder="e.g., January 15, 2024"
				placeholderTextColor="#64748b"
				value={date}
				onChangeText={setDate}
				autoFocus
				autoCapitalize="words"
				autoCorrect={false}
			/>

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					(!date.trim() || isSaving) && { opacity: 0.5 },
				]}
				onPress={handleSave}
				disabled={!date.trim() || isSaving}
			>
				<Text style={formStyles.nextButtonText}>
					{isSaving ? "Saving..." : "Save Date"}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={formStyles.backButton} onPress={handleBack}>
				<Text style={formStyles.backButtonText}>Back</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={formStyles.homeButton}
				onPress={handleReturnToHome}
			>
				<Text style={formStyles.homeButtonText}>Return to Home</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
