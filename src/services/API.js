import axios from "axios";
import { getUUID } from "../utils/UUID";

export let backendAPi = axios.create();
export let horizonAPi = axios.create();

horizonAPi.interceptors.request.use(async (config) => {
	config.baseURL = window.env.horizon;
	return config;
});

backendAPi.interceptors.request.use(async (config) => {
	config.baseURL = window.env.base_url;
	config.headers = {
		"Platform-Version": window.env.platform_Version,
		"Device-Id": getUUID(),
		Authorization: 'Baerer '+localStorage.getItem("access_token"),
		"accept-language": localStorage.getItem("language") === "en" ? "en-us" : "fa-ir",
		"publickey": localStorage.getItem("publickey"),
	};
	return config;
});

backendAPi.interceptors.response.use(async (config) => {
	return config;
});
horizonAPi.interceptors.response.use(async (config) => {
	return config;
});

export const HorizonApi = horizonAPi;
export const BackendApi = backendAPi;
