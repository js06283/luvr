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

export default function PersonHomePage() {
	const router = useRouter();
	const { formData, updatePersonData } = useFormData();
	const [home, setHome] = useState(formData.currentPerson.home || "");

	const handleNext = () => {
		if (home.trim()) {
			updatePersonData("home", home.trim());
			router.push("/forms/person/eye-color");
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
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>1</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>2</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>3</Text>
				</View>
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>4</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>5</Text>
				</View>
			</View>

			<Text style={formStyles.header}>Where are they from?</Text>
			<Text style={formStyles.subtitle}>
				Enter their hometown or where they're from
			</Text>

			<TextInput
				style={formStyles.input}
				placeholder="e.g., New York, London, Toronto"
				placeholderTextColor="#64748b"
				value={home}
				onChangeText={setHome}
				autoFocus
				autoCapitalize="words"
				autoCorrect={false}
			/>

			<TouchableOpacity
				style={[formStyles.nextButton, !home.trim() && { opacity: 0.5 }]}
				onPress={handleNext}
				disabled={!home.trim()}
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
