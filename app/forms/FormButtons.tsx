import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter, Href } from "expo-router";
import { formStyles } from "./FormStyles";

interface FormButtonsProps {
	nextScreen: string;
	backScreen: string;
	canProceed: boolean;
	nextButtonText?: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({
	nextScreen,
	backScreen,
	canProceed,
	nextButtonText = "Next",
}) => {
	const router = useRouter();

	return (
		<View style={formStyles.buttonContainer}>
			<TouchableOpacity
				style={[formStyles.button, formStyles.backButton]}
				onPress={() => router.push(`/forms/${backScreen}` as Href)}
			>
				<Text style={formStyles.backButtonText}>Back</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					formStyles.button,
					formStyles.nextButton,
					!canProceed && formStyles.buttonDisabled,
				]}
				onPress={() => router.push(`/forms/${nextScreen}` as Href)}
				disabled={!canProceed}
			>
				<Text style={formStyles.nextButtonText}>{nextButtonText}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default FormButtons;
