import { AppRegistry } from 'react-native';
import App from '../App.js';
import { name as appName } from './app.json';

AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('root'),
});
