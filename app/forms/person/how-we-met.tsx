import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Alert,
	StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";

const MEETING_OPTIONS = [
	{ label: "Hinge", value: "Hinge" },
	{ label: "Tinder", value: "Tinder" },
	{ label: "Bumble", value: "Bumble" },
	{ label: "Through friends", value: "Through friends" },
	{ label: "At a bar", value: "At a bar" },
	{ label: "At work", value: "At work" },
	{ label: "At school/college", value: "At school/college" },
	{ label: "At a party", value: "At a party" },
	{ label: "At a coffee shop", value: "At a coffee shop" },
	{ label: "At the gym", value: "At the gym" },
	{ label: "At a restaurant", value: "At a restaurant" },
	{ label: "At a concert", value: "At a concert" },
	{ label: "At a wedding", value: "At a wedding" },
	{ label: "At a social event", value: "At a social event" },
	{ label: "Other", value: "" },
];

export default function PersonHowWeMetPage() {
	const router = useRouter();
	const { formData, updatePersonData, addPerson } = useFormData();
	const [howWeMet, setHowWeMet] = useState(
		formData.currentPerson.how_we_met || ""
	);
	const [isSaving, setIsSaving] = useState(false);
	const [showCustomInput, setShowCustomInput] = useState(false);

	const handleOptionSelect = (option: { label: string; value: string }) => {
		if (option.label === "Other") {
			setShowCustomInput(true);
			setHowWeMet("");
		} else {
			setShowCustomInput(false);
			setHowWeMet(option.value);
		}
	};

	const handleNext = async () => {
		if (howWeMet.trim()) {
			setIsSaving(true);
			try {
				// Update the current person data with how we met
				updatePersonData("how_we_met", howWeMet.trim());

				// Save the person to the database
				const personId = await addPerson({
					...formData.currentPerson,
					how_we_met: howWeMet.trim(),
				});

				if (personId) {
					// Navigate to review page with the person ID for editing
					router.push(`/forms/person/review?personId=${personId}`);
				} else {
					Alert.alert("Error", "Could not save person. Please try again.");
				}
			} catch (error) {
				console.error("Error saving person:", error);
				Alert.alert("Error", "Could not save person. Please try again.");
			} finally {
				setIsSaving(false);
			}
		}
	};

	const handleBack = () => {
		router.push("/forms/person/industry");
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
				<View
					style={[formStyles.progressStep, formStyles.progressStepCompleted]}
				>
					<Text style={formStyles.progressStepText}>1</Text>
				</View>
				<View
					style={[formStyles.progressStep, formStyles.progressStepCompleted]}
				>
					<Text style={formStyles.progressStepText}>2</Text>
				</View>
				<View
					style={[formStyles.progressStep, formStyles.progressStepCompleted]}
				>
					<Text style={formStyles.progressStepText}>3</Text>
				</View>
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>4</Text>
				</View>
			</View>

			<Text style={formStyles.header}>How did you meet?</Text>
			<Text style={formStyles.subtitle}>
				Tell us how you first encountered {formData.currentPerson.name}
			</Text>

			{/* Predefined Options */}
			<View style={styles.optionsContainer}>
				<Text style={styles.optionsTitle}>Quick Select</Text>
				<View style={styles.optionsGrid}>
					{MEETING_OPTIONS.map((option) => (
						<TouchableOpacity
							key={option.label}
							style={[
								styles.optionButton,
								howWeMet === option.value && styles.selectedOption,
								option.label === "Other" &&
									showCustomInput &&
									styles.selectedOption,
							]}
							onPress={() => handleOptionSelect(option)}
						>
							<Text
								style={[
									styles.optionText,
									howWeMet === option.value && styles.selectedOptionText,
									option.label === "Other" &&
										showCustomInput &&
										styles.selectedOptionText,
								]}
							>
								{option.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Custom Input */}
			{showCustomInput && (
				<View style={styles.customInputContainer}>
					<Text style={styles.customInputLabel}>Tell us more:</Text>
					<TextInput
						style={formStyles.input}
						placeholder="e.g., At a bookstore, Through a mutual hobby, etc."
						placeholderTextColor="#64748b"
						value={howWeMet}
						onChangeText={setHowWeMet}
						autoFocus
						autoCapitalize="words"
						autoCorrect={false}
						multiline
						numberOfLines={3}
					/>
				</View>
			)}

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					(!howWeMet.trim() || isSaving) && { opacity: 0.5 },
				]}
				onPress={handleNext}
				disabled={!howWeMet.trim() || isSaving}
			>
				<Text style={formStyles.nextButtonText}>
					{isSaving ? "Saving..." : "Save & Review"}
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

const styles = StyleSheet.create({
	optionsContainer: {
		marginBottom: 24,
	},
	optionsTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#8E9AAF",
		marginBottom: 12,
	},
	optionsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	optionButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "#F8F5F2",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#EAEAEA",
		marginBottom: 8,
	},
	selectedOption: {
		backgroundColor: "#D8D1E9",
		borderColor: "#D8D1E9",
	},
	optionText: {
		fontSize: 14,
		color: "#8E9AAF",
		fontWeight: "500",
	},
	selectedOptionText: {
		color: "#ffffff",
	},
	customInputContainer: {
		marginBottom: 24,
	},
	customInputLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "#8E9AAF",
		marginBottom: 12,
	},
});
