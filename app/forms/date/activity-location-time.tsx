import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";

const ACTIVITY_OPTIONS = [
	{ label: "Dinner", value: "Dinner" },
	{ label: "Coffee", value: "Coffee" },
	{ label: "Drinks", value: "Drinks" },
	{ label: "Movie", value: "Movie" },
	{ label: "Walk", value: "Walk" },
	{ label: "Concert", value: "Concert" },
	{ label: "Museum", value: "Museum" },
	{ label: "Shopping", value: "Shopping" },
	{ label: "Bowling", value: "Bowling" },
	{ label: "Mini golf", value: "Mini golf" },
	{ label: "Arcade", value: "Arcade" },
	{ label: "Hiking", value: "Hiking" },
	{ label: "Beach", value: "Beach" },
	{ label: "Park", value: "Park" },
	{ label: "Other", value: "" },
];

const TIME_OPTIONS = [
	{ label: "Morning", value: "Morning" },
	{ label: "Afternoon", value: "Afternoon" },
	{ label: "Evening", value: "Evening" },
	{ label: "Night", value: "Night" },
];

export default function ActivityLocationTimePage() {
	const router = useRouter();
	const { formData, updateDateData, addDate } = useFormData();
	const [activity, setActivity] = useState(formData.currentDate.activity || "");
	const [location, setLocation] = useState(formData.currentDate.location || "");
	const [timeOfDay, setTimeOfDay] = useState(
		formData.currentDate.time_of_day || ""
	);
	const [showCustomActivity, setShowCustomActivity] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const handleActivitySelect = (option: { label: string; value: string }) => {
		if (option.label === "Other") {
			setShowCustomActivity(true);
			setActivity("");
		} else {
			setShowCustomActivity(false);
			setActivity(option.value);
		}
	};

	const handleSave = async () => {
		if (activity.trim() && location.trim() && timeOfDay.trim() && !isSaving) {
			setIsSaving(true);
			try {
				// Update the form data
				updateDateData("activity", activity.trim());
				updateDateData("location", location.trim());
				updateDateData("time_of_day", timeOfDay.trim());

				// Save the date to Firebase
				const dateData = {
					...formData.currentDate,
					activity: activity.trim(),
					location: location.trim(),
					time_of_day: timeOfDay.trim(),
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
		router.push("/forms/date/date");
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
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>3</Text>
				</View>
			</View>

			<Text style={formStyles.header}>What did you do?</Text>
			<Text style={formStyles.subtitle}>
				Tell us about your date with {formData.currentDate.personName}
			</Text>

			{/* Activity Selection */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Activity</Text>
				<View style={styles.optionsGrid}>
					{ACTIVITY_OPTIONS.map((option) => (
						<TouchableOpacity
							key={option.label}
							style={[
								styles.optionButton,
								activity === option.value && styles.selectedOption,
								option.label === "Other" &&
									showCustomActivity &&
									styles.selectedOption,
							]}
							onPress={() => handleActivitySelect(option)}
						>
							<Text
								style={[
									styles.optionText,
									activity === option.value && styles.selectedOptionText,
									option.label === "Other" &&
										showCustomActivity &&
										styles.selectedOptionText,
								]}
							>
								{option.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{/* Custom Activity Input */}
				{showCustomActivity && (
					<View style={styles.customInputContainer}>
						<Text style={styles.customInputLabel}>Tell us more:</Text>
						<TextInput
							style={formStyles.input}
							placeholder="e.g., Rock climbing, Cooking class, etc."
							placeholderTextColor="#64748b"
							value={activity}
							onChangeText={setActivity}
							autoFocus
							autoCapitalize="words"
							autoCorrect={false}
						/>
					</View>
				)}
			</View>

			{/* Location Input */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Location</Text>
				<TextInput
					style={formStyles.input}
					placeholder="e.g., Downtown Coffee Shop, Central Park, etc."
					placeholderTextColor="#64748b"
					value={location}
					onChangeText={setLocation}
					autoCapitalize="words"
					autoCorrect={false}
				/>
			</View>

			{/* Time of Day Selection */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Time of Day</Text>
				<View style={styles.optionsGrid}>
					{TIME_OPTIONS.map((option) => (
						<TouchableOpacity
							key={option.label}
							style={[
								styles.optionButton,
								timeOfDay === option.value && styles.selectedOption,
							]}
							onPress={() => setTimeOfDay(option.value)}
						>
							<Text
								style={[
									styles.optionText,
									timeOfDay === option.value && styles.selectedOptionText,
								]}
							>
								{option.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					(!activity.trim() ||
						!location.trim() ||
						!timeOfDay.trim() ||
						isSaving) && {
						opacity: 0.5,
					},
				]}
				onPress={handleSave}
				disabled={
					!activity.trim() || !location.trim() || !timeOfDay.trim() || isSaving
				}
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

const styles = StyleSheet.create({
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
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
		marginTop: 12,
	},
	customInputLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: "#8E9AAF",
		marginBottom: 8,
	},
});
