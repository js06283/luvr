import React, { useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	RefreshControl,
	StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormData } from "./forms/FormContext";

// New color palette from the design
const colors = {
	background: "#FFFBF8", // A warm off-white
	text: "#1E1E1E", // Dark charcoal
	primary: "#D8D1E9", // Light Lavender
	secondary: "#F5A895", // Coral/Salmon Pink
	accent: "#8E9AAF", // Slate Blue/Gray
	white: "#ffffff",
	textSecondary: "#8E9AAF", // Using accent for secondary text
	textMuted: "#B0B8C4", // A lighter gray for placeholders
	border: "#EAEAEA", // A light gray for borders
};

// Typography scale (consistent with other screens)
const typography = {
	h1: { fontSize: 32, fontWeight: "700" as const },
	h2: { fontSize: 28, fontWeight: "600" as const },
	h3: { fontSize: 22, fontWeight: "600" as const },
	body: { fontSize: 16, fontWeight: "400" as const },
	bodyBold: { fontSize: 16, fontWeight: "600" as const },
	caption: { fontSize: 12, fontWeight: "400" as const },
};

// Spacing scale
const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
};

// Border radius
const borderRadius = {
	sm: 6,
	md: 12,
	lg: 16,
	xl: 24,
	full: 9999,
};

export default function DatesPage() {
	const router = useRouter();
	const { formData, loadDates } = useFormData();

	// Load dates when component mounts
	useEffect(() => {
		loadDates();
	}, []);

	const handleRefresh = async () => {
		try {
			await loadDates();
		} catch (error) {
			console.error("Error refreshing dates:", error);
		}
	};

	const handleAddDate = () => {
		router.push("/forms/date/select-person");
	};

	const handleBack = () => {
		router.back();
	};

	const formatDate = (date: any) => {
		if (!date) return "Unknown";
		const dateObj = date.toDate ? date.toDate() : new Date(date);
		return dateObj.toLocaleDateString();
	};

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl
					refreshing={formData.loading}
					onRefresh={handleRefresh}
					tintColor={colors.primary}
					colors={[colors.primary]}
				/>
			}
		>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleBack}>
					<Text style={styles.backButtonText}>← Back</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Dates</Text>
				<TouchableOpacity style={styles.addButton} onPress={handleAddDate}>
					<Text style={styles.addButtonText}>+ Add</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				{formData.loading ? (
					<View style={styles.emptyState}>
						<Text style={styles.emptyStateText}>Loading dates...</Text>
					</View>
				) : formData.dates.length === 0 ? (
					<View style={styles.emptyState}>
						<Text style={styles.emptyStateTitle}>No dates yet!</Text>
						<Text style={styles.emptyStateText}>
							Record your first date to see it here.
						</Text>
						<TouchableOpacity
							onPress={handleAddDate}
							style={styles.primaryButton}
						>
							<Text style={styles.primaryButtonText}>Add a Date</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.datesList}>
						{formData.dates.map((date) => (
							<View key={date.id} style={styles.dateCard}>
								<View style={styles.dateHeader}>
									<Text style={styles.personName}>{date.personName}</Text>
									<Text style={styles.dateText}>
										{new Date(date.date).toLocaleDateString()}
									</Text>
								</View>
								<View style={styles.dateDetails}>
									{date.activity && (
										<View style={styles.tag}>
											<Text style={styles.tagText}>🎯 {date.activity}</Text>
										</View>
									)}
									{date.location && (
										<View style={styles.tag}>
											<Text style={styles.tagText}>📍 {date.location}</Text>
										</View>
									)}
									{date.time_of_day && (
										<View style={styles.tag}>
											<Text style={styles.tagText}>🕐 {date.time_of_day}</Text>
										</View>
									)}
									{date.rating && (
										<View style={styles.tag}>
											<Text style={styles.tagText}>⭐ {date.rating}/5</Text>
										</View>
									)}
									{date.emoji && (
										<View style={styles.tag}>
											<Text style={styles.tagText}>{date.emoji}</Text>
										</View>
									)}
									{date.how_we_met && (
										<View style={styles.tag}>
											<Text style={styles.tagText}>👋 {date.how_we_met}</Text>
										</View>
									)}
								</View>
								{(date.liked || date.icks) && (
									<View style={styles.notesSection}>
										{date.liked && (
											<Text style={styles.noteText}>❤️ {date.liked}</Text>
										)}
										{date.icks && (
											<Text style={styles.noteText}>😬 {date.icks}</Text>
										)}
									</View>
								)}
								<Text style={styles.dateAdded}>
									Added on {formatDate(date.createdAt)}
								</Text>
							</View>
						))}
					</View>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.xl,
		paddingBottom: spacing.lg,
		backgroundColor: colors.white,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	backButton: {
		padding: spacing.sm,
	},
	backButtonText: {
		...typography.bodyBold,
		color: colors.accent,
	},
	title: {
		...typography.h2,
		color: colors.text,
		flex: 1,
		textAlign: "center",
	},
	addButton: {
		padding: spacing.sm,
	},
	addButtonText: {
		...typography.bodyBold,
		color: colors.secondary,
		fontSize: 18,
	},
	content: {
		padding: spacing.lg,
	},
	emptyState: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.xxl,
		marginTop: spacing.xxl,
	},
	emptyStateTitle: {
		...typography.h3,
		color: colors.text,
		marginBottom: spacing.md,
	},
	emptyStateText: {
		...typography.body,
		color: colors.textSecondary,
		textAlign: "center",
		marginBottom: spacing.xl,
		lineHeight: 24,
		maxWidth: 300,
	},
	primaryButton: {
		backgroundColor: colors.primary,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.md,
		alignItems: "center",
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	primaryButtonText: {
		color: colors.white,
		...typography.bodyBold,
		letterSpacing: 0.5,
	},
	datesList: {
		gap: spacing.lg,
	},
	dateCard: {
		backgroundColor: colors.white,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		borderWidth: 1,
		borderColor: colors.border,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 4,
	},
	dateHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: spacing.md,
		paddingBottom: spacing.md,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	personName: {
		...typography.h3,
		color: colors.text,
		flex: 1,
	},
	dateText: {
		...typography.caption,
		color: colors.textSecondary,
		fontWeight: "600",
	},
	dateDetails: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
		marginBottom: spacing.md,
	},
	tag: {
		backgroundColor: colors.background,
		borderRadius: borderRadius.full,
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.md,
		borderWidth: 1,
		borderColor: colors.border,
	},
	tagText: {
		...typography.caption,
		color: colors.textSecondary,
		fontWeight: "500",
	},
	notesSection: {
		marginTop: spacing.sm,
		paddingTop: spacing.md,
		borderTopWidth: 1,
		borderTopColor: colors.border,
		gap: spacing.sm,
	},
	noteText: {
		...typography.body,
		color: colors.text,
		lineHeight: 22,
	},
	dateAdded: {
		...typography.caption,
		color: colors.textMuted,
		marginTop: spacing.lg,
		textAlign: "right",
	},
});
