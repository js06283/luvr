import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Platform,
	Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "./FormContext";
import { formStyles } from "./FormStyles";

export default function DatePage() {
	const router = useRouter();
	const { formData, updateFormData } = useFormData();
	const [showDatePicker, setShowDatePicker] = useState(false);

	const showDatePickerModal = () => {
		setShowDatePicker(true);
	};

	const hideDatePickerModal = () => {
		setShowDatePicker(false);
	};

	const selectDate = (daysAgo: number) => {
		const newDate = new Date();
		newDate.setDate(newDate.getDate() - daysAgo);
		updateFormData("date", newDate.toLocaleDateString());
		updateFormData("date_num", newDate.getTime().toString());
		setShowDatePicker(false);
	};

	const selectCustomDate = () => {
		if (Platform.OS === "web") {
			const input = document.createElement("input");
			input.type = "date";
			input.onchange = (e: any) => {
				if (e.target.value) {
					const selectedDate = new Date(e.target.value);
					updateFormData("date", selectedDate.toLocaleDateString());
					updateFormData("date_num", selectedDate.getTime().toString());
				}
				setShowDatePicker(false);
			};
			input.click();
		} else {
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			updateFormData("date", yesterday.toLocaleDateString());
			updateFormData("date_num", yesterday.getTime().toString());
			setShowDatePicker(false);
		}
	};

	const handleNext = () => {
		if (formData.date) {
			router.push("/forms/name");
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

			<Text style={formStyles.header}>When did you meet?</Text>

			<TouchableOpacity style={formStyles.input} onPress={showDatePickerModal}>
				<Text style={{ color: formData.date ? "#000" : "#666" }}>
					{formData.date || "Select Date"}
				</Text>
			</TouchableOpacity>

			{showDatePicker && (
				<Modal
					visible={showDatePicker}
					animationType="slide"
					transparent={true}
					onRequestClose={hideDatePickerModal}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View
							style={{
								backgroundColor: "#fff",
								padding: 20,
								borderRadius: 8,
								width: "80%",
								maxWidth: 400,
							}}
						>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "bold",
									color: "#25292e",
									marginBottom: 20,
								}}
							>
								Select Date
							</Text>

							{[1, 2, 3, 4, 5, 6, 7].map((days) => (
								<TouchableOpacity
									key={days}
									style={{
										padding: 10,
										borderRadius: 4,
										marginVertical: 2,
									}}
									onPress={() => selectDate(days)}
								>
									<Text
										style={{
											fontSize: 16,
											color: "#25292e",
										}}
									>
										{days === 1 ? "Yesterday" : `${days} days ago`}
									</Text>
								</TouchableOpacity>
							))}

							<TouchableOpacity
								style={{
									padding: 10,
									borderRadius: 4,
									marginVertical: 2,
								}}
								onPress={selectCustomDate}
							>
								<Text
									style={{
										fontSize: 16,
										color: "#25292e",
									}}
								>
									Custom Date
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									padding: 10,
									borderRadius: 4,
									backgroundColor: "#ffd33d",
									alignItems: "center",
									marginTop: 10,
								}}
								onPress={hideDatePickerModal}
							>
								<Text
									style={{
										fontSize: 16,
										fontWeight: "bold",
										color: "#25292e",
									}}
								>
									Close
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}

			<TouchableOpacity
				style={[
					formStyles.nextButton,
					!formData.date && { backgroundColor: "#ccc" },
				]}
				onPress={handleNext}
				disabled={!formData.date}
			>
				<Text style={formStyles.nextButtonText}>Next</Text>
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
