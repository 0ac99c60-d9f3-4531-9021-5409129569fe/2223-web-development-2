const HOST = "https://api.themoviedb.org/3";
const TMDB_API_KEY = "19a7019cb94d9af0e9e16e399e57ec8b";

export class TmdbService {
    static async fetchTMDB<APIResponse extends {}>(endpoint: string): Promise<[Response, APIResponse]> {
        const res = await fetch(`${HOST}${endpoint}?api_key=${TMDB_API_KEY}`);
        const data = await res.json() as APIResponse;
        return [res, data];
    }
}