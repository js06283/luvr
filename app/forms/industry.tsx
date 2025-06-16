import React from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "./FormContext";
import { formStyles } from "./FormStyles";

export default function IndustryPage() {
	const router = useRouter();
	const { formData, updateFormData } = useFormData();

	const handleNext = () => {
		if (formData.industry.trim()) {
			router.push("/forms/home");
		}
	};

	const handleBack = () => {
		router.back();
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
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>15</Text>
				</View>
			</View>

			<Text style={formStyles.header}>What industry do they work in?</Text>

			<TextInput
				style={formStyles.input}
				placeholder="e.g., Tech, Healthcare, Finance, etc."
				value={formData.industry}
				onChangeText={(text: string) => updateFormData("industry", text)}
				placeholderTextColor="#666"
				autoFocus
			/>

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					!formData.industry.trim() && { backgroundColor: "#ccc" },
				]}
				onPress={handleNext}
				disabled={!formData.industry.trim()}
			>
				<Text style={formStyles.nextButtonText}>Next</Text>
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
