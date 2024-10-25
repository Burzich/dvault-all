import axios from 'axios';
import CryptoJS from 'crypto-js';
// api.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
var ROOT_TOKEN = '';
export let IS_INIT = false;
export let FIRST_INIT = false;

// serg
export const initializeVault = async () => {
    if (!IS_INIT) {
        try {
            const initResponse = await axios.post(`${API_BASE_URL}/sys/init`);
            // status по /v1/sys/seal-status
            const { root_token, keys } = initResponse.data;

            ROOT_TOKEN = root_token;
            IS_INIT = true;
            FIRST_INIT = true
            
            const firstKey = keys[0];
            const secondKey = keys[1];
            
            console.log(`ROOT_TOKEN: ${ROOT_TOKEN}`);
            console.log(`First Key: ${firstKey}`);
            console.log(`Second Key: ${secondKey}`);
            
            await axios.post(`${API_BASE_URL}/sys/unseal`, { key: firstKey });
            await axios.post(`${API_BASE_URL}/sys/unseal`, { key: secondKey });
            
            console.log('Vault init success');
        } 
        catch (error) {
            if (error.response) {
                // Сервер вернул ответ с ошибкой
                if (error.response.status === 500) {
                    console.error('Server error (500):', error.response.data);
                    if (error.response.data.errors && error.response.data.errors.includes('already initialized')) {
                        console.log('Vault already initialized. Not first.');
                        IS_INIT = true;
                    }
                } 
                else {
                    console.error('Error from server:', error.response.data);
                }
            } 
            else if (error.request) {
                // Запрос был сделан, но ответа не было получено
                console.error('No response received:', error.request);
            } 
            else {
                // Другая ошибка
                console.error('Error setting up request:', error.message);
            }
        }
    } else {
        console.log('Vault was init');
    }
};

//initializeVault();

// serg end

// Получение списка секретов
export const fetchSecrets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/sys/mounts`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'X-Vault-Token': ROOT_TOKEN
            }
        });
        const data = await response.json();

        // Преобразуем объект в массив секретов с названием и описанием
        const secretsArray = Object.keys(data.data).map(key => ({
            title: key,
            description: data.data[key].description
        }));

        return secretsArray;
    } 
    catch (error) {
        console.error('Ошибка при получении списка секретов:', error);
        throw error;
    }
};

// Создание нового секрета
export const createSecret = async (newSecret) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sys/mounts`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'X-Vault-Token': ROOT_TOKEN
            },
            body: JSON.stringify(newSecret)
        });
        if (!response.ok) {
            throw new Error('Ошибка при создании секрета');
        }
        return await response.json();
    } 
    catch (error) {
        console.error('Ошибка при создании нового секрета:', error);
        throw error;
    }
};

// Пример запроса на сервер для логина
export const apiLogin = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

// Пример запроса на сервер для проверки токена
export const apiVerifyToken = async (token) => {
    try {
        ROOT_TOKEN = token;
        const response = await fetch(`${API_BASE_URL}/sys/mounts`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'X-Vault-Token': ROOT_TOKEN
            }
        });
        return true;
    }
    catch (error) {
        if (error.response) {
            // Сервер вернул ответ с ошибкой
            if (error.response.status === 401) {
                console.error('Server error (403):');
            } 
            else {
                console.error('Error from server:');
            }
        } 
        else if (error.request) {
            // Запрос был сделан, но ответа не было получено
            console.error('No response received:');
        } 
        else {
            // Другая ошибка
            console.error('HZ');
        }
    }
  
};

// Для хеша
export const hashText = async (algorithm, format, inputText) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/hash`, {
            algorithm: algorithm,
            format: format,
            input: inputText
        });
        return response.data.sum;
    } catch (error) {
        console.error('Ошибка при хешировании:', error);
        throw new Error('Error generating hash.');
    }
};

export const hashTextLocal = async (algorithm, format, inputText) => {
    try {
        let hash;
        
        // Локальные алгоритмы через crypto-js
        switch (algorithm) {
            case 'sha2-256':
                hash = CryptoJS.SHA256(inputText);
                break;
            case 'sha2-512':
                hash = CryptoJS.SHA512(inputText);
                break;
            case 'md5':
                hash = CryptoJS.MD5(inputText);
                break;
            default:
                throw new Error('Unsupported algorithm');
        }

        // Форматы вывода
        if (format === 'hex') {
            return hash.toString(CryptoJS.enc.Hex);
        } else if (format === 'base64') {
            return hash.toString(CryptoJS.enc.Base64);
        } else {
            throw new Error('Unsupported output format');
        }
    } catch (error) {
        console.error('Ошибка в хешировании:', error);
        throw new Error('Error generating hash L.');
    }
};
