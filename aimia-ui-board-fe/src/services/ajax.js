import fetch from 'isomorphic-fetch';

class Ajax {
    get(request) {
        return fetch(request.url, {
            headers: request.headers
        }).then(response => {
            let result;

            switch (response.status) {
            case 401:
                result = {
                    authorized: false
                };
                break;
            default:
                result = response.json();
                break;
            }

            return result;
        });
    }

    post(request) {
        const data = {
            json: JSON.stringify(request.body)
        };

        return fetch(request.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'json=' + encodeURI(JSON.stringify(data))
        }).then((response) => {
            return response.json();
        });
    }
}

export default new Ajax();
