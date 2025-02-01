import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreatePostScreen() {
	const [date, setDate] = useState("");
	const [date_num, setDateNum] = useState("");
	const [name, setName] = useState("");
	const [height, setHeight] = useState("");
	const [industry, setIndustry] = useState("");
	const [home, setHome] = useState("");
	const [hair_color, setHairColor] = useState("");
	const [eye_color, setEyeColor] = useState("");
	const [how_we_met, setHowWeMet] = useState("");
	const [activity, setActivity] = useState("");
	const [rating, setRating] = useState("");
	const [emoji, setEmoji] = useState("");
	const [icks, setIcks] = useState("");
	const [liked, setLiked] = useState("");
	const [mutuals, setMutuals] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showHairColorPicker, setShowHairColorPicker] = useState(false);

	const hairColorOptions = ["Blonde", "Brown", "Black", "White", "Red"];

	const onDateChange = (event, selectedDate) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setDate(selectedDate.toLocaleDateString());
			setDateNum(selectedDate.getTime().toString());
		}
	};

	const handleSubmit = async () => {
		const auth = getAuth(app);
		if (!date || !name) {
			Alert.alert("Error", "Please fill in all required fields");
			return;
		}

		try {
			const db = getFirestore(app);
			const docRef = await addDoc(collection(db, "(default)"), {
				date,
				date_num,
				name,
				height,
				industry,
				home,
				hair_color,
				eye_color,
				how_we_met,
				activity,
				rating,
				emoji,
				icks,
				liked,
				mutuals,
				createdAt: new Date(),
				authorId: auth.currentUser?.uid,
				authorEmail: auth.currentUser?.email,
			});

			Alert.alert("Success", "Post created successfully!");
			// Clear form
			setDate("");
			setDateNum("");
			setName("");
			setHeight("");
			setIndustry("");
			setHome("");
			setHairColor("");
			setEyeColor("");
			setHowWeMet("");
			setActivity("");
			setRating("");
			setEmoji("");
			setIcks("");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<Text style={styles.header}>Create New Post</Text>

			<TouchableOpacity
				style={styles.input}
				onPress={() => setShowDatePicker(true)}
			>
				<Text style={{ color: date ? "#000" : "#666" }}>
					{date || "Select Date"}
				</Text>
			</TouchableOpacity>

			{showDatePicker && (
				<DateTimePicker
					value={date ? new Date(date) : new Date()}
					mode="date"
					onChange={onDateChange}
				/>
			)}

			<TextInput
				style={styles.input}
				placeholder="Name"
				value={name}
				onChangeText={setName}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Height"
				value={height}
				onChangeText={setHeight}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Industry"
				value={industry}
				onChangeText={setIndustry}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Home"
				value={home}
				onChangeText={setHome}
				placeholderTextColor="#666"
			/>

			<View>
				<TouchableOpacity
					style={styles.input}
					onPress={() => setShowHairColorPicker(true)}
				>
					<Text style={{ color: hair_color ? "#000" : "#666" }}>
						{hair_color || "Hair Color"}
					</Text>
				</TouchableOpacity>

				{showHairColorPicker && (
					<View style={styles.pickerContainer}>
						{hairColorOptions.map((color) => (
							<TouchableOpacity
								key={color}
								style={[
									styles.colorOption,
									hair_color === color && styles.selectedOption,
								]}
								onPress={() => {
									setHairColor(color);
									setShowHairColorPicker(false);
								}}
							>
								<Text
									style={[
										styles.colorOptionText,
										hair_color === color && styles.selectedOptionText,
									]}
								>
									{color}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				)}
			</View>

			<TextInput
				style={styles.input}
				placeholder="Eye Color"
				value={eye_color}
				onChangeText={setEyeColor}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="How We Met"
				value={how_we_met}
				onChangeText={setHowWeMet}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Activity"
				value={activity}
				onChangeText={setActivity}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Rating"
				value={rating}
				onChangeText={setRating}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Emoji"
				value={emoji}
				onChangeText={setEmoji}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Icks"
				value={icks}
				onChangeText={setIcks}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Liked"
				value={liked}
				onChangeText={setLiked}
				placeholderTextColor="#666"
			/>

			<TextInput
				style={styles.input}
				placeholder="Mutuals"
				value={mutuals}
				onChangeText={setMutuals}
				placeholderTextColor="#666"
			/>

			<TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.buttonText}>Create Post</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
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
	contentInput: {
		height: 150,
		textAlignVertical: "top",
	},
	button: {
		backgroundColor: "#ffd33d",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "#25292e",
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
});
