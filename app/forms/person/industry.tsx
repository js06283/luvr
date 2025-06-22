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

export default function PersonIndustryPage() {
	const router = useRouter();
	const { formData, updatePersonData } = useFormData();
	const [industry, setIndustry] = useState(
		formData.currentPerson.industry || ""
	);

	const handleNext = () => {
		if (industry.trim()) {
			updatePersonData("industry", industry.trim());
			router.push("/forms/person/home");
		}
	};

	const handleBack = () => {
		router.push("/forms/person/height");
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
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>4</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>5</Text>
				</View>
			</View>

			<Text style={formStyles.header}>What industry do they work in?</Text>
			<Text style={formStyles.subtitle}>
				Enter their profession or industry
			</Text>

			<TextInput
				style={formStyles.input}
				placeholder="e.g., Software Engineer, Marketing, Healthcare"
				placeholderTextColor="#64748b"
				value={industry}
				onChangeText={setIndustry}
				autoFocus
				autoCapitalize="words"
				autoCorrect={false}
			/>

			<TouchableOpacity
				style={[formStyles.nextButton, !industry.trim() && { opacity: 0.5 }]}
				onPress={handleNext}
				disabled={!industry.trim()}
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
