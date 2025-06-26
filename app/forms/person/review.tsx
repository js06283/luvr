import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";
import { useRouter, useLocalSearchParams } from "expo-router";
import EditableField from "../../components/EditableField";

export default function ReviewScreen() {
	const {
		formData,
		updatePerson,
		setCurrentPersonById,
		clearPersonData,
		updatePersonData,
	} = useFormData();
	const router = useRouter();
	const { personId } = useLocalSearchParams();

	useEffect(() => {
		if (typeof personId === "string") {
			setCurrentPersonById(personId);
		}
	}, [personId]);

	const handleSave = async () => {
		try {
			if (typeof personId === "string") {
				// Update the existing person in the database
				await updatePerson(personId, formData.currentPerson);
				Alert.alert("Success", "Person details updated!", [
					{
						text: "OK",
						onPress: () => {
							clearPersonData();
							router.replace("/people");
						},
					},
				]);
			}
		} catch (error) {
			Alert.alert("Error", "Could not update person. Please try again.");
			console.error(error);
		}
	};

	const handleBack = () => {
		router.push("/forms/person/industry");
	};

	const handleReturnToHome = () => {
		clearPersonData();
		router.push("/(tabs)");
	};

	const handleFieldUpdate = (
		field: keyof typeof formData.currentPerson,
		value: string
	) => {
		updatePersonData(field, value);
	};

	return (
		<ScrollView
			style={formStyles.container}
			contentContainerStyle={formStyles.contentContainer}
		>
			<Text style={formStyles.header}>Review & Edit</Text>
			<Text style={formStyles.subtitle}>
				Review the information and make any final edits
			</Text>

			<View style={formStyles.summaryContainer}>
				<EditableField
					label="Name"
					value={formData.currentPerson.name}
					onSave={(value) => handleFieldUpdate("name", value)}
					placeholder="Enter their name"
					autoCapitalize="words"
				/>

				<EditableField
					label="Age"
					value={String(formData.currentPerson.age)}
					onSave={(value) => handleFieldUpdate("age", value)}
					placeholder="Enter their age"
					keyboardType="number-pad"
					autoCapitalize="none"
				/>

				<EditableField
					label="Occupation"
					value={formData.currentPerson.industry}
					onSave={(value) => handleFieldUpdate("industry", value)}
					placeholder="Enter their occupation"
					autoCapitalize="words"
				/>

				<EditableField
					label="How did you meet?"
					value={formData.currentPerson.how_we_met}
					onSave={(value) => handleFieldUpdate("how_we_met", value)}
					placeholder="Enter how you met"
					autoCapitalize="words"
				/>
			</View>

			<TouchableOpacity
				style={[formStyles.button, formStyles.nextButton]}
				onPress={handleSave}
			>
				<Text style={formStyles.buttonText}>Save Changes</Text>
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
