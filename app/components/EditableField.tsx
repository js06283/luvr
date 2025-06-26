import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

interface EditableFieldProps {
	label: string;
	value: string;
	onSave: (value: string) => void;
	placeholder?: string;
	keyboardType?: "default" | "number-pad" | "email-address" | "phone-pad";
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	disabled?: boolean;
}

export default function EditableField({
	label,
	value,
	onSave,
	placeholder,
	keyboardType = "default",
	autoCapitalize = "words",
	disabled = false,
}: EditableFieldProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	const handleSave = () => {
		if (editValue.trim() !== value) {
			onSave(editValue.trim());
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditValue(value);
		setIsEditing(false);
	};

	const handleEdit = () => {
		if (!disabled) {
			setEditValue(value);
			setIsEditing(true);
		}
	};

	if (isEditing) {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>{label}</Text>
				<TextInput
					style={styles.input}
					value={editValue}
					onChangeText={setEditValue}
					placeholder={placeholder}
					keyboardType={keyboardType}
					autoCapitalize={autoCapitalize}
					autoFocus
					onSubmitEditing={handleSave}
				/>
				<View style={styles.editButtons}>
					<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
						<Text style={styles.saveButtonText}>Save</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
						<Text style={styles.cancelButtonText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={[styles.displayContainer, disabled && styles.disabled]}
				onPress={handleEdit}
				disabled={disabled}
			>
				<Text style={styles.displayText}>{value || placeholder}</Text>
				{!disabled && <Text style={styles.editIcon}>✏️</Text>}
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: "#8E9AAF",
		marginBottom: 8,
	},
	displayContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "#ffffff",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#EAEAEA",
	},
	disabled: {
		opacity: 0.6,
	},
	displayText: {
		fontSize: 16,
		color: "#1E1E1E",
		flex: 1,
	},
	editIcon: {
		fontSize: 16,
		marginLeft: 8,
	},
	input: {
		fontSize: 16,
		color: "#1E1E1E",
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "#ffffff",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#D8D1E9",
		marginBottom: 8,
	},
	editButtons: {
		flexDirection: "row",
		gap: 8,
	},
	saveButton: {
		flex: 1,
		backgroundColor: "#D8D1E9",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 6,
		alignItems: "center",
	},
	saveButtonText: {
		color: "#ffffff",
		fontWeight: "600",
		fontSize: 14,
	},
	cancelButton: {
		flex: 1,
		backgroundColor: "#F5A895",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 6,
		alignItems: "center",
	},
	cancelButtonText: {
		color: "#ffffff",
		fontWeight: "600",
		fontSize: 14,
	},
});
