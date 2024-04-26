import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function postRequestJSON(path: string, body: object) {
    const response = await fetch(PUBLIC_BACKEND_URL + path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    return json
}