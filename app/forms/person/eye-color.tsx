import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";

const eyeColors = ["Brown", "Blue", "Green", "Hazel", "Gray", "Amber", "Other"];

export default function PersonEyeColorPage() {
	const router = useRouter();
	const { formData, updatePersonData, addPerson } = useFormData();
	const [selectedColor, setSelectedColor] = useState(
		formData.currentPerson.eye_color || ""
	);
	const [isSaving, setIsSaving] = useState(false);

	const handleColorSelect = (color: string) => {
		setSelectedColor(color);
	};

	const handleSave = async () => {
		if (selectedColor && !isSaving) {
			setIsSaving(true);
			try {
				updatePersonData("eye_color", selectedColor);

				// Save the person to Firebase
				const personData = {
					...formData.currentPerson,
					eye_color: selectedColor,
				};

				await addPerson(personData);

				// Show success and go back to home
				Alert.alert("Success", "Person added successfully!");
				router.push("/(tabs)");
			} catch (error) {
				console.error("Error saving person:", error);
				Alert.alert("Error", "Failed to save person. Please try again.");
			} finally {
				setIsSaving(false);
			}
		}
	};

	const handleBack = () => {
		router.push("/forms/person/home");
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
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>2</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>3</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>4</Text>
				</View>
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>5</Text>
				</View>
			</View>

			<Text style={formStyles.header}>What color are their eyes?</Text>
			<Text style={formStyles.subtitle}>Select their eye color</Text>

			<View style={formStyles.colorContainer}>
				{eyeColors.map((color) => (
					<TouchableOpacity
						key={color}
						style={[
							formStyles.colorOption,
							selectedColor === color && formStyles.selectedOption,
						]}
						onPress={() => handleColorSelect(color)}
					>
						<Text
							style={[
								formStyles.colorOptionText,
								selectedColor === color && formStyles.selectedOptionText,
							]}
						>
							{color}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					(!selectedColor || isSaving) && { opacity: 0.5 },
				]}
				onPress={handleSave}
				disabled={!selectedColor || isSaving}
			>
				<Text style={formStyles.nextButtonText}>
					{isSaving ? "Saving..." : "Save Person"}
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
