import axios from 'axios';

const AMDB_URL = 'http://www.omdbapi.com/'
const API_KEY = 'dff5ae43';

export async function getMoviesBySearch(term, page, type){   
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        let search = `&s=${term.replace(' ', '+')}`

        if(page)
            search += `&page=${page}`
        
        if(type)
            search += `&type=${type}`

        const res = await  axios.get(`${AMDB_URL}?apikey=${API_KEY}${search}`, {headers})
        return res.data
    }catch(err){
        throw err
    }
}

export async function getMoviesById(id){   
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const res = await  axios.get(`${AMDB_URL}?apikey=${API_KEY}&i=${id}`, {headers})
        return res.data
    }catch(err){
        throw err
    }
}
