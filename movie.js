console.log("hello")
const API_KEY = 'api_key=8955d182428d6f31ee9f1a266e23a1d9';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form =  document.getElementById('form');
const search =  document.getElementById('search');
const search_url=BASE_URL+'/search/movie?'+API_KEY;
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


const tagel=document.getElementById('tags');
var selectrd=[];
setgenre()
function setgenre(){
    tagel.innerHTML='';
    genres.forEach(genre=>{
        const t=document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText=genre.name;
        t.addEventListener('click',()=>{
            if(selectrd.length==0){
                selectrd.push(genre.id);
            }
            else{
                if(selectrd.includes(genre.id)){
                    selectrd.forEach((id,idx)=>{
                        if(id==genre.id){
                            selectrd.splice(idx,1);
                        }
                    })
                }else{
                    selectrd.push(genre.id )
                }
            }
            console.log(selectrd);
            getmovies(API_URL+'&with_genres='+encodeURI(selectrd.join(",")));
            highlightblock();
            
        })
        tagel.append(t);
    })
}

function highlightblock(){
    const all=document.querySelectorAll('.tag');
    all.forEach(tag=>{
        tag.classList.remove('highlight');
    })
    if (selectrd.length!=0){
        selectrd.forEach(id=>{
            const highlightag=document.getElementById(id);
            highlightag.classList.add('highlight');
            
        })
    }
    clrbtn();
}



getmovies(API_URL)
function getmovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data);
        if(data.results.length!==0){
            showmovies(data.results);
        }
        else{
            main.innerHTML=`<h1 class="NO">No results found</h>`
        }
    });
}



function showmovies(data){
    main.innerHTML=''
    data.forEach(movie=>{
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieele=document.createElement('div');
        movieele.classList.add("movie");
        movieele.innerHTML=`
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            ${overview}
        </div>
        
        
        `

        main.appendChild(movieele);
    })
}



function getColor(vote){
    if(vote>=8){
        return 'green'
    }
    else if(vote>=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    selectrd=[]
    setgenre()
    const searchh=search.value;
    if(searchh){
        getmovies(search_url+'&query='+searchh);
    }else{
        getmovies(API_URL);
    }
})



function clrbtn(){
    let clc=document.getElementById('clear');
    if(clc){
        clc.classList.add('highlight');
    }
    else{
        let clear=document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id='clear';
        clear.innerText='clear X';
        clear.addEventListener('click',()=>{
            selectrd=[];
            setgenre();
            getmovies(API_URL);
        })
        tagel.append(clear);
    }
   
}