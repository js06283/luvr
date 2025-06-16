import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "./FormContext";
import { formStyles } from "./FormStyles";

export default function MutualsPage() {
	const router = useRouter();
	const { formData, updateFormData } = useFormData();
	const [showOptionPicker, setShowOptionPicker] = useState(false);

	const mutualsOptions = ["Yes", "No", "Maybe"];

	const handleNext = () => {
		if (formData.mutuals.trim()) {
			router.push("/forms/review");
		}
	};

	const handleBack = () => {
		router.back();
	};

	const handleReturnToHome = () => {
		router.push("/(tabs)");
	};

	const selectOption = (option: string) => {
		updateFormData("mutuals", option);
		setShowOptionPicker(false);
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
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>14</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>15</Text>
				</View>
			</View>

			<Text style={formStyles.header}>Do you have mutual friends?</Text>

			<TouchableOpacity
				style={formStyles.input}
				onPress={() => setShowOptionPicker(true)}
			>
				<Text style={{ color: formData.mutuals ? "#000" : "#666" }}>
					{formData.mutuals || "Select Option"}
				</Text>
			</TouchableOpacity>

			{showOptionPicker && (
				<View style={formStyles.pickerContainer}>
					{mutualsOptions.map((option) => (
						<TouchableOpacity
							key={option}
							style={[
								formStyles.colorOption,
								formData.mutuals === option && formStyles.selectedOption,
							]}
							onPress={() => selectOption(option)}
						>
							<Text
								style={[
									formStyles.colorOptionText,
									formData.mutuals === option && formStyles.selectedOptionText,
								]}
							>
								{option}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					!formData.mutuals.trim() && { backgroundColor: "#ccc" },
				]}
				onPress={handleNext}
				disabled={!formData.mutuals.trim()}
			>
				<Text style={formStyles.nextButtonText}>Review & Submit</Text>
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
