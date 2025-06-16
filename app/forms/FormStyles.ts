import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
	},
	contentContainer: {
		padding: 20,
		paddingBottom: 40,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 15,
		marginBottom: 15,
		fontSize: 16,
	},
	button: {
		backgroundColor: "#ffd33d",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "#25292e",
		fontSize: 16,
		fontWeight: "bold",
	},
	nextButton: {
		backgroundColor: "#4CAF50",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 20,
	},
	nextButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	backButton: {
		backgroundColor: "#666",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 10,
	},
	backButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	pickerContainer: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 10,
		marginBottom: 15,
	},
	colorOption: {
		padding: 12,
		borderRadius: 4,
		marginVertical: 2,
	},
	selectedOption: {
		backgroundColor: "#ffd33d",
	},
	colorOptionText: {
		fontSize: 16,
		color: "#25292e",
	},
	selectedOptionText: {
		fontWeight: "bold",
	},
	starContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20,
	},
	starButton: {
		padding: 10,
		marginHorizontal: 5,
	},
	selectedStar: {
		backgroundColor: "#ffd33d",
		borderRadius: 20,
	},
	starText: {
		fontSize: 30,
		color: "#666",
	},
	selectedStarText: {
		color: "#25292e",
	},
	ratingText: {
		color: "#fff",
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	emojiContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		marginBottom: 20,
	},
	emojiOption: {
		padding: 15,
		margin: 5,
		borderRadius: 8,
		backgroundColor: "#fff",
	},
	selectedEmoji: {
		backgroundColor: "#ffd33d",
	},
	emojiText: {
		fontSize: 24,
	},
	progressContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		paddingHorizontal: 20,
	},
	progressStep: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: "#666",
		alignItems: "center",
		justifyContent: "center",
	},
	progressStepActive: {
		backgroundColor: "#ffd33d",
	},
	progressStepText: {
		color: "#25292e",
		fontSize: 12,
		fontWeight: "bold",
	},
	progressStepTextInactive: {
		color: "#fff",
	},
});
