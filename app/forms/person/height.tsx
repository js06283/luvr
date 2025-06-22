import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";

export default function PersonHeightPage() {
	const router = useRouter();
	const { formData, updatePersonData } = useFormData();
	const [height, setHeight] = useState(formData.currentPerson.height || "");

	const handleNext = () => {
		if (height.trim()) {
			updatePersonData("height", height.trim());
			router.push("/forms/person/industry");
		}
	};

	const handleBack = () => {
		router.push("/forms/person/name");
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

			<Text style={formStyles.header}>How tall are they?</Text>
			<Text style={formStyles.subtitle}>
				Enter their height (e.g., 5'8", 170cm, etc.)
			</Text>

			<TextInput
				style={formStyles.input}
				placeholder="Enter their height"
				placeholderTextColor="#64748b"
				value={height}
				onChangeText={setHeight}
				autoFocus
				autoCapitalize="none"
				autoCorrect={false}
			/>

			<TouchableOpacity
				style={[formStyles.nextButton, !height.trim() && { opacity: 0.5 }]}
				onPress={handleNext}
				disabled={!height.trim()}
			>
				<Text style={formStyles.nextButtonText}>Next</Text>
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
