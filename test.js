import { jwtDecode } from "jwt-decode";

import{UserType} from "./UserContext";

const { userId, setUserId } = useContext(UserType);


useEffect(() => {
    const fetchUsers = async () => {
        const token = await AsyncStorage.getItem("authToken");

        if (!token || !userId) {
            console.log("Missing token or userId");
            return;
        }

        axios
            .get(`http://192.168.140.91:8000/users/${userId}`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log("error retrieving users", error);
            });
    };

    fetchUsers();
}, [userId]);

const handleLogin = async () => {
    try {
        const user = { email, password };
        const response = await axios.post("http://192.168.140.91:8000/login", user);

        const token = response.data.token;
        await AsyncStorage.setItem("authToken", token);

        const decoded = jwtDecode(token);
        console.log("✅ Decoded token:", decoded);

        if (!decoded.userId) {
            Alert.alert("Login Failed", "Invalid token received");
            return;
        }

        setUserId(decoded.userId);

        setTimeout(() => {
            navigation.replace("Home");
        }, 100); // give time for context update
    } catch (error) {
        console.log("Login Error:", error?.response?.data || error.message);
        Alert.alert("Login Error", "Invalid email or password");
    }
};