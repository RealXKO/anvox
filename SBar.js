const btn = document.getElementById('MTV');
const secret = document.getElementById('SSS');   // Season Input
const secret2 = document.getElementById('SES');  // Episode Input
const input = document.getElementById('movieSearch');
const resultsDiv = document.getElementById('results');
const API_KEY = '19a4f0fe';

let currentId = ''; 
let UUL = '';

// 1. Search Logic
input.addEventListener('input', async (e) => {
    const query = e.target.value;
    if (query.length < 3) return resultsDiv.innerHTML = ''; 
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();
    if (data.Search) {
        resultsDiv.innerHTML = data.Search.slice(0, 3).map(m => `
            <div onclick="openMovie('${m.imdbID}')" style="display:flex; align-items:center; margin-top:5px; cursor:pointer; background:#f0f0f0; padding:5px;">
                <img src="${m.Poster}" width="30" style="margin-right:10px">
                <p style="margin:0">${m.Title} (${m.Year})</p>
            </div>
        `).join('');
    }
});

// 2. Toggle Logic (TV/Movie Switch)
btn.addEventListener('click', () => {
    btn.classList.toggle('state-off');
    btn.classList.toggle('state-on');
    secret.classList.toggle('hidden');
    secret2.classList.toggle('hidden');

    const isTV = btn.classList.contains('state-on');
    btn.textContent = isTV ? 'TV' : 'Movies';

    // If a movie is already selected, update the URL immediately when toggling
    if (currentId) openMovie(currentId);
});

// 3. The Function that actually builds the URL and updates the iframe
function openMovie(id) {
    currentId = id; // Update the global tracker
    const sea = secret.value || "1";
    const epi = secret2.value || "1";

    if (btn.classList.contains('state-on')) {
        UUL = `https://vidsrc-embed.ru/embed/tv?imdb=${currentId}&season=${sea}&episode=${epi}`;
    } else {
        UUL = `https://vidsrc-embed.ru/embed/movie/${currentId}`;
    }

    document.getElementById('myFrame').src = UUL;
    console.log("Loading URL:", UUL);
    resultsDiv.innerHTML = ''; // Optional: clear search results after clicking
}