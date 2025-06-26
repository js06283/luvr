import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Dimensions,
} from "react-native";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";
import FormButtons from "../FormButtons";

const { width: screenWidth } = Dimensions.get("window");
const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 120;
const CENTER_OFFSET = (screenWidth - ITEM_WIDTH) / 2;

export default function AgeScreen() {
	const { formData, updatePersonData } = useFormData();
	const [age, setAge] = useState(parseInt(formData.currentPerson.age) || 25);
	const scrollViewRef = useRef<ScrollView>(null);

	useEffect(() => {
		updatePersonData("age", age.toString());
	}, [age]);

	useEffect(() => {
		// Scroll to the selected age when component mounts or age changes
		const scrollToAge = () => {
			const targetOffset = (age - 18) * ITEM_WIDTH;
			scrollViewRef.current?.scrollTo({
				x: targetOffset,
				animated: true,
			});
		};

		// Delay to ensure the component is rendered
		const timer = setTimeout(scrollToAge, 100);
		return () => clearTimeout(timer);
	}, [age]);

	const handleAgeChange = (newAge: number) => {
		setAge(newAge);
	};

	const handleScroll = (event: any) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const selectedIndex = Math.round(offsetX / ITEM_WIDTH);
		const newAge = selectedIndex + 18;
		if (newAge >= 18 && newAge <= 75 && newAge !== age) {
			setAge(newAge);
		}
	};

	const ages = Array.from({ length: 58 }, (_, i) => i + 18); // Ages 18-75

	return (
		<ScrollView
			style={formStyles.container}
			contentContainerStyle={formStyles.contentContainer}
		>
			<View style={formStyles.progressContainer}>
				<View
					style={[formStyles.progressStep, formStyles.progressStepCompleted]}
				>
					<Text style={formStyles.progressStepText}>1</Text>
				</View>
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>2</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>3</Text>
				</View>
			</View>

			<Text style={formStyles.question}>How old are they?</Text>

			{/* Age Display */}
			<View style={styles.ageDisplay}>
				<Text style={styles.ageNumber}>{age}</Text>
				<Text style={styles.ageLabel}>years old</Text>
			</View>

			{/* Horizontal Age Picker */}
			<View style={styles.pickerContainer}>
				{/* Center indicator */}
				<View style={styles.centerIndicator} />

				<ScrollView
					ref={scrollViewRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					contentContainerStyle={styles.scrollContent}
					snapToInterval={ITEM_WIDTH}
					decelerationRate="fast"
					style={styles.scrollView}
				>
					{/* Left padding to center first item */}
					<View style={styles.leftPadding} />

					{ages.map((ageValue) => (
						<View key={ageValue} style={styles.ageItem}>
							<Text
								style={[
									styles.ageItemText,
									ageValue === age && styles.ageItemTextSelected,
								]}
							>
								{ageValue}
							</Text>
						</View>
					))}

					{/* Right padding to center last item */}
					<View style={styles.rightPadding} />
				</ScrollView>
			</View>

			{/* Quick Age Buttons */}
			<View style={styles.quickAgeContainer}>
				{[20, 25, 30, 35, 40, 45, 50].map((quickAge) => (
					<TouchableOpacity
						key={quickAge}
						style={[
							styles.quickAgeButton,
							age === quickAge && styles.quickAgeButtonActive,
						]}
						onPress={() => handleAgeChange(quickAge)}
					>
						<Text
							style={[
								styles.quickAgeText,
								age === quickAge && styles.quickAgeTextActive,
							]}
						>
							{quickAge}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			<FormButtons
				nextScreen="person/industry"
				backScreen="person/name"
				canProceed={age > 0}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	ageDisplay: {
		alignItems: "center",
		marginBottom: 40,
		paddingVertical: 20,
	},
	ageNumber: {
		fontSize: 72,
		fontWeight: "bold",
		color: "#D8D1E9",
		marginBottom: 8,
	},
	ageLabel: {
		fontSize: 18,
		color: "#8E9AAF",
		marginBottom: 4,
	},
	ageCategory: {
		fontSize: 16,
		color: "#D8D1E9",
		fontWeight: "600",
	},
	pickerContainer: {
		height: ITEM_HEIGHT,
		marginBottom: 40,
		position: "relative",
	},
	centerIndicator: {
		position: "absolute",
		top: 0,
		left: CENTER_OFFSET,
		right: CENTER_OFFSET,
		height: ITEM_HEIGHT,
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderColor: "#D8D1E9",
		backgroundColor: "rgba(216, 209, 233, 0.1)",
		zIndex: 1,
		pointerEvents: "none",
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		alignItems: "center",
	},
	leftPadding: {
		width: CENTER_OFFSET,
	},
	rightPadding: {
		width: CENTER_OFFSET,
	},
	ageItem: {
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT,
		justifyContent: "center",
		alignItems: "center",
	},
	ageItemText: {
		fontSize: 24,
		color: "#B0B8C4",
		fontWeight: "500",
		opacity: 0.6,
	},
	ageItemTextSelected: {
		fontSize: 32,
		color: "#D8D1E9",
		fontWeight: "bold",
		opacity: 1,
	},
	quickAgeContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
	},
	quickAgeButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#F8F5F2",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 4,
		marginBottom: 8,
	},
	quickAgeButtonActive: {
		backgroundColor: "#D8D1E9",
	},
	quickAgeText: {
		fontSize: 16,
		color: "#8E9AAF",
		fontWeight: "600",
	},
	quickAgeTextActive: {
		color: "#ffffff",
	},
	sliderTrack: {
		height: 8,
		backgroundColor: "#EAEAEA",
		borderRadius: 4,
		position: "relative",
		marginBottom: 30,
	},
	sliderFill: {
		height: "100%",
		backgroundColor: "#D8D1E9",
		borderRadius: 4,
		position: "absolute",
	},
	sliderThumb: {
		width: 24,
		height: 24,
		backgroundColor: "#D8D1E9",
		borderRadius: 12,
		position: "absolute",
		top: -8,
		marginLeft: -12,
		borderWidth: 3,
		borderColor: "#ffffff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	ageRangesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	ageRangeButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: "#F8F5F2",
		marginBottom: 8,
		minWidth: 60,
		alignItems: "center",
	},
	ageRangeButtonActive: {
		backgroundColor: "#D8D1E9",
	},
	ageRangeText: {
		fontSize: 14,
		color: "#8E9AAF",
		fontWeight: "500",
	},
	ageRangeTextActive: {
		color: "#ffffff",
	},
});
