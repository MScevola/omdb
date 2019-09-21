import axios from 'axios';

const AMDB_URL = 'http://www.omdbapi.com/'
const API_KEY = 'dff5ae43';

export async function getMoviesBySearch(term, page){   
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const res = await  axios.get(`${AMDB_URL}?apikey=${API_KEY}&s=${term.replace(' ', '+')}&page=${page}`, {headers})
        return res.data
    }catch(err){
        throw err
    }
}
