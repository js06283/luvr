import { Text, View } from "react-native";
import Post from "../components/Post";
export default function Index() {
	return (
		<View>
			<Text>Hello, World!</Text>
			<Post
				title="Second Post"
				content="This is another example of the Post component. It is reusable and flexible!"
				timestamp="Jan 19, 2025"
			/>
		</View>
	);
}
