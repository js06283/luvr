import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "./FormContext";
import { formStyles } from "./FormStyles";

export default function HairColorPage() {
	const router = useRouter();
	const { formData, updateFormData } = useFormData();
	const [showColorPicker, setShowColorPicker] = useState(false);

	const hairColorOptions = [
		"Blonde",
		"Brown",
		"Black",
		"White",
		"Red",
		"Other",
	];

	const handleNext = () => {
		if (formData.hair_color.trim()) {
			router.push("/forms/eye-color");
		}
	};

	const handleBack = () => {
		router.back();
	};

	const handleReturnToHome = () => {
		router.push("/(tabs)");
	};

	const selectColor = (color: string) => {
		updateFormData("hair_color", color);
		setShowColorPicker(false);
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
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>6</Text>
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

			<Text style={formStyles.header}>What color is their hair?</Text>

			<TouchableOpacity
				style={formStyles.input}
				onPress={() => setShowColorPicker(true)}
			>
				<Text style={{ color: formData.hair_color ? "#000" : "#666" }}>
					{formData.hair_color || "Select Hair Color"}
				</Text>
			</TouchableOpacity>

			{showColorPicker && (
				<View style={formStyles.pickerContainer}>
					{hairColorOptions.map((color) => (
						<TouchableOpacity
							key={color}
							style={[
								formStyles.colorOption,
								formData.hair_color === color && formStyles.selectedOption,
							]}
							onPress={() => selectColor(color)}
						>
							<Text
								style={[
									formStyles.colorOptionText,
									formData.hair_color === color &&
										formStyles.selectedOptionText,
								]}
							>
								{color}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					!formData.hair_color.trim() && { backgroundColor: "#ccc" },
				]}
				onPress={handleNext}
				disabled={!formData.hair_color.trim()}
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
