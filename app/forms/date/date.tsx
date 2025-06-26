import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Alert,
	StyleSheet,
	Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "../FormContext";
import { formStyles } from "../FormStyles";

const { width: screenWidth } = Dimensions.get("window");

export default function DatePage() {
	const router = useRouter();
	const { formData, updateDateData, addDate } = useFormData();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [isSaving, setIsSaving] = useState(false);

	// Initialize with existing date if available
	useEffect(() => {
		if (formData.currentDate.date) {
			const parsedDate = new Date(formData.currentDate.date);
			if (!isNaN(parsedDate.getTime())) {
				setSelectedDate(parsedDate);
				setCurrentMonth(parsedDate);
			}
		}
	}, []);

	const handleDateSelect = (date: Date) => {
		setSelectedDate(date);
	};

	const handleQuickDateSelect = (daysAgo: number) => {
		const date = new Date();
		date.setDate(date.getDate() - daysAgo);
		setSelectedDate(date);

		// Navigate calendar to the selected date's month
		setCurrentMonth(date);
	};

	const handleNext = () => {
		if (selectedDate) {
			const dateString = selectedDate.toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});

			updateDateData("date", dateString);
			updateDateData("date_num", selectedDate.getTime().toString());

			// Navigate to the next step
			router.push("/forms/date/activity-location-time");
		}
	};

	const handleBack = () => {
		router.push("/forms/date/select-person");
	};

	const handleReturnToHome = () => {
		router.push("/(tabs)");
	};

	const navigateMonth = (direction: "prev" | "next") => {
		const newMonth = new Date(currentMonth);
		if (direction === "prev") {
			newMonth.setMonth(newMonth.getMonth() - 1);
		} else {
			newMonth.setMonth(newMonth.getMonth() + 1);
		}
		setCurrentMonth(newMonth);
	};

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const firstDayOfMonth = new Date(year, month, 1).getDay();

		const days = [];

		// Add empty days for padding
		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(null);
		}

		// Add days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	};

	const isSameDay = (date1: Date, date2: Date) => {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	};

	const isToday = (date: Date) => {
		return isSameDay(date, new Date());
	};

	const isPastDate = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	const isQuickDateSelected = (daysAgo: number) => {
		if (!selectedDate) return false;

		const targetDate = new Date();
		targetDate.setDate(targetDate.getDate() - daysAgo);
		return isSameDay(selectedDate, targetDate);
	};

	const days = getDaysInMonth(currentMonth);
	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return (
		<ScrollView
			style={formStyles.container}
			contentContainerStyle={formStyles.contentContainer}
		>
			<View style={formStyles.progressContainer}>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>1</Text>
				</View>
				<View style={[formStyles.progressStep, formStyles.progressStepActive]}>
					<Text style={formStyles.progressStepText}>2</Text>
				</View>
				<View style={formStyles.progressStep}>
					<Text style={formStyles.progressStepTextInactive}>3</Text>
				</View>
			</View>

			<Text style={formStyles.header}>When did you go on the date?</Text>
			<Text style={formStyles.subtitle}>
				Select the date of your date with {formData.currentDate.personName}
			</Text>

			{/* Quick Date Selection */}
			<View style={styles.quickDateContainer}>
				<Text style={styles.quickDateTitle}>Quick Select</Text>
				<View style={styles.quickDateButtons}>
					{[
						{ label: "Today", days: 0 },
						{ label: "Yesterday", days: 1 },
						{ label: "2 days ago", days: 2 },
						{ label: "Last week", days: 7 },
					].map((option) => (
						<TouchableOpacity
							key={option.days}
							style={[
								styles.quickDateButton,
								isQuickDateSelected(option.days) &&
									styles.quickDateButtonActive,
							]}
							onPress={() => handleQuickDateSelect(option.days)}
						>
							<Text
								style={[
									styles.quickDateButtonText,
									isQuickDateSelected(option.days) &&
										styles.quickDateButtonTextActive,
								]}
							>
								{option.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Calendar */}
			<View style={styles.calendarContainer}>
				<View style={styles.calendarHeader}>
					<TouchableOpacity
						style={styles.monthNavButton}
						onPress={() => navigateMonth("prev")}
					>
						<Text style={styles.monthNavButtonText}>‹</Text>
					</TouchableOpacity>
					<Text style={styles.monthTitle}>
						{currentMonth.toLocaleDateString("en-US", {
							month: "long",
							year: "numeric",
						})}
					</Text>
					<TouchableOpacity
						style={styles.monthNavButton}
						onPress={() => navigateMonth("next")}
					>
						<Text style={styles.monthNavButtonText}>›</Text>
					</TouchableOpacity>
				</View>

				{/* Week day headers */}
				<View style={styles.weekDaysContainer}>
					{weekDays.map((day) => (
						<Text key={day} style={styles.weekDayText}>
							{day}
						</Text>
					))}
				</View>

				{/* Calendar grid */}
				<View style={styles.calendarGrid}>
					{days.map((day, index) => (
						<View key={index} style={styles.dayCell}>
							{day ? (
								<TouchableOpacity
									style={[
										styles.dayButton,
										selectedDate &&
											isSameDay(day, selectedDate) &&
											styles.selectedDay,
									]}
									onPress={() => handleDateSelect(day)}
									disabled={!isPastDate(day)}
								>
									<Text
										style={[
											styles.dayText,
											selectedDate &&
												isSameDay(day, selectedDate) &&
												styles.selectedDayText,
											!selectedDate || !isSameDay(day, selectedDate)
												? styles.pastDayText
												: null,
										]}
									>
										{day.getDate()}
									</Text>
								</TouchableOpacity>
							) : (
								<View style={styles.emptyDay} />
							)}
						</View>
					))}
				</View>
			</View>

			{/* Selected Date Display */}
			{selectedDate && (
				<View style={styles.selectedDateContainer}>
					<Text style={styles.selectedDateLabel}>Selected Date:</Text>
					<Text style={styles.selectedDateText}>
						{selectedDate.toLocaleDateString("en-US", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</Text>
				</View>
			)}

			<TouchableOpacity
				style={[formStyles.nextButton, !selectedDate && { opacity: 0.5 }]}
				onPress={handleNext}
				disabled={!selectedDate}
			>
				<Text style={formStyles.nextButtonText}>Next</Text>
			</TouchableOpacity>

			<TouchableOpacity style={formStyles.backButton} onPress={handleBack}>
				<Text style={formStyles.backButtonText}>Back</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={formStyles.homeButton}
				onPress={handleReturnToHome}
			>
				<Text style={formStyles.homeButtonText}>Return to Home</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	quickDateContainer: {
		marginBottom: 24,
	},
	quickDateTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#8E9AAF",
		marginBottom: 12,
	},
	quickDateButtons: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	quickDateButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "#F8F5F2",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#EAEAEA",
	},
	quickDateButtonActive: {
		backgroundColor: "#D8D1E9",
		borderColor: "#D8D1E9",
	},
	quickDateButtonText: {
		fontSize: 14,
		color: "#8E9AAF",
		fontWeight: "500",
	},
	quickDateButtonTextActive: {
		color: "#ffffff",
	},
	calendarContainer: {
		backgroundColor: "#ffffff",
		borderRadius: 16,
		padding: 20,
		marginBottom: 24,
		borderWidth: 1,
		borderColor: "#EAEAEA",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 4,
	},
	calendarHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	monthNavButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#F8F5F2",
		justifyContent: "center",
		alignItems: "center",
	},
	monthNavButtonText: {
		fontSize: 20,
		color: "#8E9AAF",
		fontWeight: "600",
	},
	monthTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1E1E1E",
	},
	weekDaysContainer: {
		flexDirection: "row",
		marginBottom: 12,
	},
	weekDayText: {
		flex: 1,
		textAlign: "center",
		fontSize: 12,
		fontWeight: "600",
		color: "#8E9AAF",
	},
	calendarGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	dayCell: {
		width: `${100 / 7}%`,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	dayButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	selectedDay: {
		backgroundColor: "#F5A895", // Pink circle for selected date
	},
	dayText: {
		fontSize: 14,
		color: "#B0B8C4",
		fontWeight: "500",
	},
	selectedDayText: {
		color: "#ffffff",
		fontWeight: "600",
	},
	pastDayText: {
		color: "#1E1E1E",
	},
	emptyDay: {
		width: 32,
		height: 32,
	},
	selectedDateContainer: {
		backgroundColor: "#F8F5F2",
		borderRadius: 12,
		padding: 16,
		marginBottom: 24,
		alignItems: "center",
	},
	selectedDateLabel: {
		fontSize: 14,
		color: "#8E9AAF",
		fontWeight: "600",
		marginBottom: 4,
	},
	selectedDateText: {
		fontSize: 16,
		color: "#1E1E1E",
		fontWeight: "600",
		textAlign: "center",
	},
});
