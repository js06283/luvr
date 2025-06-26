import React from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";
import FormButtons from "../FormButtons";

export default function PersonNamePage() {
	const { formData, updatePersonData } = useFormData();

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
			</View>

			<Text style={formStyles.question}>What's their name?</Text>

			<TextInput
				style={formStyles.input}
				placeholder="Enter their name"
				placeholderTextColor={formStyles.inputPlaceholder.color}
				value={formData.currentPerson.name}
				onChangeText={(text) => updatePersonData("name", text)}
				autoFocus
				autoCapitalize="words"
			/>

			<FormButtons
				nextScreen="person/age"
				backScreen="(tabs)/about"
				canProceed={formData.currentPerson.name.trim().length > 0}
			/>
		</ScrollView>
	);
}
