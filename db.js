import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to store data
const storeData = async (key, value) => {
    return console.log("storeData");
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		console.error("Error saving data", e);
	}
};

// Function to retrieve data
const getData = async (key) => {
    return console.log("get data");
	try {
		return AsyncStorage.getItem(key).then((data) => JSON.parse(data));
		const result = await AsyncStorage.getItem(key);
		if (result !== null) {
			return JSON.parse(result);
		} else {
			alert("No data found for this key!");
		}
	} catch (e) {
		console.error("Error retrieving data", e);
	}
};

// Function to delete data
const deleteData = async (key) => {
    return console.log("delete", key);
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		console.error("Error deleting data", e);
	}
};

async function seedDataBase() {
    return console.log('seed database');
	// Function to seed the database with initial data
	const initialData = [
		{
			key: "0",
			value: {
				title: "First Diary Entry",
				content: "This is the content of the first diary entry.",
				date: "2023-10-01",
			},
		},
		{
			key: "1",
			value: {
				title: "First Diary Entry",
				content: "This is the content of the first diary entry.",
				date: "2023-10-01",
			},
		},
		{
			key: "2",
			value: {
				title: "First Diary Entry",
				content: "This is the content of the first diary entry.",
				date: "2023-10-01",
			},
		},
		{
			key: "3",
			value: {
				title: "First Diary Entry",
				content: "This is the content of the first diary entry.",
				date: "2023-10-01",
			},
		},
		{
			key: "4",
			value: {
				title: "First Diary Entry",
				content: "This is the content of the first diary entry.",
				date: "2023-10-01",
			},
		},
		{
			key: "5",
			value: {
				title: "First Diary Entry",
				content: "This is the content of the first diary entry.",
				date: "2023-10-01",
			},
		},
	];
	let dataBaseEmpty = (await AsyncStorage.getAllKeys().length) <= 0;
	if (dataBaseEmpty) {
		initialData.forEach(async (item) => {
			try {
				await AsyncStorage.setItem(item.key, JSON.stringify(item.value));
			} catch (e) {
				console.error("Error seeding data", e);
			}
		});
	}
}

export { storeData, getData, deleteData, seedDataBase };
