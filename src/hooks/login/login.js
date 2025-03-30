import { BASE_URL } from '../../config.json';

const login = await fetch(`${BASE_URL}/user/login`)
    .then(res => res.json())
    .catch(err => console.error(err));

