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

// Elegant color palette
const colors = {
	primary: "#6366f1",
	primaryLight: "#818cf8",
	primaryDark: "#4f46e5",
	secondary: "#f59e0b",
	background: "#0f172a",
	surface: "#1e293b",
	surfaceLight: "#334155",
	text: "#f8fafc",
	textSecondary: "#cbd5e1",
	textMuted: "#64748b",
	success: "#10b981",
	error: "#ef4444",
	border: "#334155",
	white: "#ffffff",
	black: "#000000",
};

// Typography scale
const typography = {
	h1: { fontSize: 32, fontWeight: "700" as const },
	h2: { fontSize: 28, fontWeight: "600" as const },
	h3: { fontSize: 24, fontWeight: "600" as const },
	body: { fontSize: 16, fontWeight: "400" as const },
	bodyBold: { fontSize: 16, fontWeight: "600" as const },
	caption: { fontSize: 14, fontWeight: "400" as const },
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
						<Text style={styles.emptyStateText}>
							No dates added yet. Add your first date!
						</Text>
						<TouchableOpacity
							style={styles.primaryButton}
							onPress={handleAddDate}
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
									<Text style={styles.dateText}>{date.date}</Text>
								</View>
								<View style={styles.dateDetails}>
									{date.activity && (
										<Text style={styles.dateDetail}>
											🎯 Activity: {date.activity}
										</Text>
									)}
									{date.rating && (
										<Text style={styles.dateDetail}>
											⭐ Rating: {date.rating}/5
										</Text>
									)}
									{date.emoji && (
										<Text style={styles.dateDetail}>
											{date.emoji} Overall feeling
										</Text>
									)}
									{date.icks && (
										<Text style={styles.dateDetail}>😬 Icks: {date.icks}</Text>
									)}
									{date.liked && (
										<Text style={styles.dateDetail}>
											❤️ Liked: {date.liked}
										</Text>
									)}
									{date.mutuals && (
										<Text style={styles.dateDetail}>
											🤝 Mutuals: {date.mutuals}
										</Text>
									)}
									{date.how_we_met && (
										<Text style={styles.dateDetail}>
											👋 How we met: {date.how_we_met}
										</Text>
									)}
								</View>
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
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	backButton: {
		padding: spacing.sm,
	},
	backButtonText: {
		...typography.bodyBold,
		color: colors.primary,
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
		color: colors.success,
	},
	content: {
		padding: spacing.lg,
	},
	emptyState: {
		alignItems: "center",
		paddingVertical: spacing.xxl,
	},
	emptyStateText: {
		...typography.body,
		color: colors.textSecondary,
		textAlign: "center",
		marginBottom: spacing.lg,
		lineHeight: 24,
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
		gap: spacing.md,
	},
	dateCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		borderWidth: 1,
		borderColor: colors.border,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	dateHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: spacing.md,
	},
	personName: {
		...typography.h3,
		color: colors.text,
		flex: 1,
	},
	dateText: {
		...typography.bodyBold,
		color: colors.secondary,
	},
	dateDetails: {
		marginBottom: spacing.md,
	},
	dateDetail: {
		...typography.body,
		color: colors.textSecondary,
		marginBottom: spacing.xs,
	},
	dateAdded: {
		...typography.caption,
		color: colors.textMuted,
		fontStyle: "italic",
	},
});
