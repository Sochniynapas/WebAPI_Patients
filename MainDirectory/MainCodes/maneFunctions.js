const token = localStorage.getItem('token')

function parseToken(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        console.error('Ошибка при парсинге токена:', error);
        return null;
    }
}

function isTokenValid() {
    if(token !== undefined) {
        const tokenPayload = parseToken(token);
        if (!tokenPayload) {
            console.log('Ошибка при парсинге токена');
            return false;
        }

        const expirationTime = tokenPayload.exp * 1000; // Преобразовать в миллисекунды
        const expirationLimit = Date.now() + 60 * 60 * 1000; // Текущее время + 60 минут

        return expirationTime < expirationLimit;
    }
    return false;

}
function removeTokenFromLocalStorage() {
    localStorage.removeItem('authToken');
}

function checkUserToken() {
    const drop = document.getElementById('loginController');
    const writePost = document.getElementById('writePost');
    const loginBtn = document.getElementById('loginTop');
    const headers = new Headers({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    });
    if (isTokenValid()) {
        const data = await response.json();
        document.getElementById('dropButton').textContent = data.email;
        loginBtn.style.display = 'none';
    } else {
        drop.style.display = 'none';
        if (writePost != null) {
            writePost.style.display = 'none';
        }
    }
}