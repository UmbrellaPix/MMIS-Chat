export const method = "POST";
export const server = "http://192.168.0.10:2800/";

// Парсинг ключей и значений заголовков из строки в лист
export function headerHandler(headers) {
    const arr = headers.trim().split(/[\r\n]+/);
    var headerMap = {};
    arr.forEach((line) => {
      const parts = line.split(': ');
      const header = parts.shift();
      const value = parts.join(': ');
      headerMap[header] = value;
    });
    return headerMap;
  }

//Отправка запроса на сервер
//Возвращает промис
export function sendRequest(method, url, headers = {}) {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        for(const [key, value] of Object.entries(headers)){
            xhr.setRequestHeader(key, value);
        }

        xhr.onload = () => {
        if (xhr.status >= 400) {
            reject(xhr.getAllResponseHeaders());
        } else {
            resolve(xhr.getAllResponseHeaders());
        }
        };

        xhr.oneerror = () => {
        reject(xhr.getAllResponseHeaders());
        };

        xhr.send();
    });
}