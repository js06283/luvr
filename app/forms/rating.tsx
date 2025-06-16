import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "./FormContext";
import { formStyles } from "./FormStyles";

export default function RatingPage() {
	const router = useRouter();
	const { formData, updateFormData } = useFormData();
	const [selectedRating, setSelectedRating] = useState(0);

	const handleNext = () => {
		if (formData.rating.trim()) {
			router.push("/forms/emoji");
		}
	};

	const handleBack = () => {
		router.back();
	};

	const handleReturnToHome = () => {
		router.push("/(tabs)");
	};

	const selectRating = (rating: number) => {
		setSelectedRating(rating);
		updateFormData("rating", rating.toString());
	};

	const renderStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<TouchableOpacity
					key={i}
					style={[
						formStyles.starButton,
						selectedRating >= i && formStyles.selectedStar,
					]}
					onPress={() => selectRating(i)}
				>
					<Text
						style={[
							formStyles.starText,
							selectedRating >= i && formStyles.selectedStarText,
						]}
					>
						★
					</Text>
				</TouchableOpacity>
			);
		}
		return stars;
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
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>10</Text>
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

			<Text style={formStyles.header}>Rate your experience (1-5 stars)</Text>

			<View style={formStyles.starContainer}>{renderStars()}</View>

			{selectedRating > 0 && (
				<Text style={formStyles.ratingText}>
					You rated: {selectedRating} star{selectedRating > 1 ? "s" : ""}
				</Text>
			)}

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					!formData.rating.trim() && { backgroundColor: "#ccc" },
				]}
				onPress={handleNext}
				disabled={!formData.rating.trim()}
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
