import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";

export default function SelectPersonPage() {
	const router = useRouter();
	const { formData, updateDateData, loadPeople } = useFormData();
	const [selectedPerson, setSelectedPerson] = useState(
		formData.currentDate.personId || ""
	);

	// Load people when component mounts
	useEffect(() => {
		loadPeople();
	}, []);

	const handlePersonSelect = (person: any) => {
		setSelectedPerson(person.id);
		updateDateData("personId", person.id);
		updateDateData("personName", person.name);
	};

	const handleNext = () => {
		if (selectedPerson) {
			router.push("/forms/date/date");
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
			</View>

			<Text style={formStyles.header}>Who did you go on a date with?</Text>
			<Text style={formStyles.subtitle}>Select the person from your list</Text>

			{formData.loading ? (
				<View style={formStyles.emptyState}>
					<ActivityIndicator size="large" color="#6366f1" />
					<Text style={formStyles.emptyStateText}>Loading people...</Text>
				</View>
			) : formData.people.length === 0 ? (
				<View style={formStyles.emptyState}>
					<Text style={formStyles.emptyStateText}>
						No people added yet. Add a person first!
					</Text>
					<TouchableOpacity
						style={formStyles.nextButton}
						onPress={() => router.push("/forms/person/name")}
					>
						<Text style={formStyles.nextButtonText}>Add a Person</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={formStyles.colorContainer}>
					{formData.people.map((person) => (
						<TouchableOpacity
							key={person.id}
							style={[
								formStyles.colorOption,
								selectedPerson === person.id && formStyles.selectedOption,
							]}
							onPress={() => handlePersonSelect(person)}
						>
							<Text
								style={[
									formStyles.colorOptionText,
									selectedPerson === person.id && formStyles.selectedOptionText,
								]}
							>
								{person.name} - {person.age} years old, {person.industry}
								{person.how_we_met && ` • Met via ${person.how_we_met}`}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			{formData.people.length > 0 && (
				<TouchableOpacity
					style={[formStyles.nextButton, !selectedPerson && { opacity: 0.5 }]}
					onPress={handleNext}
					disabled={!selectedPerson}
				>
					<Text style={formStyles.nextButtonText}>Next</Text>
				</TouchableOpacity>
			)}

			<TouchableOpacity
				style={formStyles.homeButton}
				onPress={handleReturnToHome}
			>
				<Text style={formStyles.homeButtonText}>Return to Home</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
