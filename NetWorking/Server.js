import { ToastAndroid } from 'react-native'
export function sendLoginRequest(username, password){
    fetch('https://delivery-later.herokuapp.com/api/accounts/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: username,
            password: password
        }),
    })
}

function fetchLoginRespond(){
    return fetch('https://delivery-later.herokuapp.com/api/accounts/login')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.loginRespond;
        })
        .catch((error) => {
            console.error(error);
        });
}
