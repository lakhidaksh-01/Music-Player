let audioElement = new Audio('songs/1.mp3');
let myProgressBar=document.getElementById('myProgressBar');
let masterPlay = document.getElementById('masterPlay');
let gif=document.querySelector('.songInfo img');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName');


let songIndex=0;
let songs = [
{songName: "Despacito", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
{songName: "See You Again", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
{songName: "Uptown Funk", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
{songName: "Sugar", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
{songName: "Counting Stars", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
{songName: "Sorry (Justin Bieber)", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
{songName: "Roar", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
{songName: "Warriyo", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
{songName: "Cielo", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
{songName: "DEAF KEV", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
];
masterSongName.innerText=songs[songIndex].songName;



songItems.forEach((element,i) => {
element.getElementsByTagName("img")[0].src=songs[i].coverPath;
element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
element.addEventListener('click', (e) => { 
makeAllPlays(); // Reset all play buttons

songIndex = parseInt(e.target.id)-1;
if (isNaN(songIndex)) return; // Prevent errors if the ID is not valid

if (audioElement.src !== songs[songIndex].filePath || audioElement.paused) {
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-repeat');

    // Set the correct audio file and play it
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // Sync master play button
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = "1";
    masterSongName.innerText = songs[songIndex].songName;
} else {
    // Pause if the same song is clicked again
    makeAllPlays(); // Reset all play buttons
    songIndex = clickedIndex;

    audioElement.pause();
    e.target.classList.remove('fa-repeat');
    e.target.classList.add('fa-play-circle');

    // Sync master play button
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = "0";
}
});
});


// Function to reset all play buttons
function makeAllPlays() {
document.querySelectorAll('.songItemPlay').forEach((btn) => {
btn.classList.add('fa-play-circle');
btn.classList.remove('fa-repeat');
});
}


function next() {
songIndex = (songIndex + 1) % songs.length;
updateSong();
makeAllPlays();
}

function previous() {
songIndex = (songIndex - 1 + songs.length) % songs.length;
updateSong();
makeAllPlays();
}



masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity="1";
        
let currentSongButton = document.getElementById(songIndex);
if (currentSongButton) {
    currentSongButton.classList.remove('fa-play-circle');
    currentSongButton.classList.add('fa-repeat');
}

    }else {
    audioElement.pause(); 
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity="0";
    makeAllPlays();
}
});


// 🔹 Moved `timeupdate` event listener to `audioElement`
audioElement.addEventListener('timeupdate', () => {
let progress = (audioElement.currentTime / audioElement.duration) * 100;
myProgressBar.value = progress;
if(progress>=100){next();}
});

// 🔹 Added progress bar seeking functionality
myProgressBar.addEventListener('input', () => {
audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

function updateSong() {
audioElement.src = songs[songIndex].filePath;
audioElement.currentTime = 0;
audioElement.play();

gif.style.opacity = 1;
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
masterSongName.innerText=songs[songIndex].songName;
}
