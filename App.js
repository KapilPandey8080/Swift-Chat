import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from './UserContext'; // Your working provider
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <UserContext>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserContext>
  );
}
