import { createMainHtml } from './main/main';
import { loginBar } from './main/footer';
import {
	uploadFromLocalStorage,
} from './database/database';
import './css/mainStyleMassager.css';

uploadFromLocalStorage();
if (!document.getElementById('full')) {
	createMainHtml();
}
const current_user = localStorage.getItem('current_user');
if (current_user == 'null' || current_user == null) {
	loginBar();
}
