export const submitToLocalStorage = (name) => {
    localStorage.setItem(name + 'Value', document.getElementById(name).value);
    localStorage.setItem(name + 'Checked', document.getElementById(name).checked);
    return false;
};

export const retrieveFromLocalStorage = (name) => {
    document.getElementById(name).value = localStorage.getItem(name + 'Value');
    document.getElementById(name).checked = localStorage.getItem(name + 'Checked') === 'true';
    return false;
};

export const handleLargeNumber = (a, cullZeroes = false) => {
    if (cullZeroes && a == 0) return '';
    if (a < Math.pow(10, 3)) return '' + a.toFixed(0);
    if (a < Math.pow(10, 6)) return (a / Math.pow(10, 3)).toFixed(2) + "k";
    if (a < Math.pow(10, 9)) return (a / Math.pow(10, 6)).toFixed(2) + "m";
    if (a < Math.pow(10, 12)) return (a / Math.pow(10, 9)).toFixed(2) + "b";
    if (a < Math.pow(10, 15)) return (a / Math.pow(10, 12)).toFixed(2) + "t";
    return (a / Math.pow(10, 15)).toFixed(2) + "q";
};

export const timeForHumans = (x) => {
    let seconds = x % 60;
    x /= 60; x = Math.floor(x);
    let minutes = x % 60;
    x /= 60; x = Math.floor(x);
    let hours = x % 24;
    x /= 24; x = Math.floor(x);
    let days = x;
    let y = '';
    function weh(z, text) {
        if (z) y += ((y === '') ? '' : ', ') + z + ' ' + text + ((z > 1) ? 's' : '');
    }
    weh(days, 'day');
    weh(hours, 'hour');
    weh(minutes, 'minute');
    weh(seconds, 'second');
    return y || 'less than a second';
};

export const addArticle = (string) => {
    return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
};

export const formatLargeNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const pullJSON = (filename) => {
    let request = new XMLHttpRequest();
    let url = "/json/" + filename + ".json?v=" + VERSION;
    console.log("Loading JSON from " + url);
    request.responseType = 'json';
    return new Promise((resolve, reject) => {
        request.open('GET', url);
        request.onload = () => {
            resolve(request.response);
            console.log('JSON load complete.');
        };
        request.onerror = () => {
            reject(request.statusText);
            console.log('JSON load failed.');
            console.log(request.statusText);
        };
        request.send();
    });
};