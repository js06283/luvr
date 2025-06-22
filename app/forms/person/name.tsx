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

export default function PersonNamePage() {
	const router = useRouter();
	const { formData, updatePersonData } = useFormData();
	const [name, setName] = useState(formData.currentPerson.name || "");

	const handleNext = () => {
		if (name.trim()) {
			updatePersonData("name", name.trim());
			router.push("/forms/person/height");
		}
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
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>1</Text>
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
			</View>

			<Text style={formStyles.header}>What's their name?</Text>
			<Text style={formStyles.subtitle}>
				Enter the name of the person you want to add
			</Text>

			<TextInput
				style={formStyles.input}
				placeholder="Enter their name"
				placeholderTextColor="#64748b"
				value={name}
				onChangeText={setName}
				autoFocus
				autoCapitalize="words"
				autoCorrect={false}
			/>

			<TouchableOpacity
				style={[formStyles.nextButton, !name.trim() && { opacity: 0.5 }]}
				onPress={handleNext}
				disabled={!name.trim()}
			>
				<Text style={formStyles.nextButtonText}>Next</Text>
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
