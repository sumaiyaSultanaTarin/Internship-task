const songs = [
    { title: "Song 1", url: "audio/song1.mp3", category: "Pop" },
    { title: "Song 2", url: "audio/song2.mp3", category: "Rock" },
    { title: "Song 3", url: "audio/song3.mp3", category: "Jazz" },
  ];
  
  let currentSongIndex = 0;
  let audio = new Audio(songs[currentSongIndex].url);
  
  // Elements
  const playlist = document.getElementById("playlist");
  const searchBar = document.getElementById("search-bar");
  const categoryFilter = document.getElementById("category-filter");
  
  // Populate the category dropdown with unique categories
  function populateCategories() {
    const categories = ["All", ...new Set(songs.map(song => song.category))];
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Render playlist based on search input and selected category
  function renderPlaylist(filter = "", selectedCategory = "All") {
    playlist.innerHTML = "";
    songs
      .filter(song => 
        (selectedCategory === "All" || song.category === selectedCategory) &&
        (song.title.toLowerCase().includes(filter.toLowerCase()) || 
         song.category.toLowerCase().includes(filter.toLowerCase()))
      )
      .forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.category}`;
        li.onclick = () => playSong(index);
        playlist.appendChild(li);
      });
  }
  
  // Play selected song
  function playSong(index) {
    currentSongIndex = index;
    audio.src = songs[currentSongIndex].url;
    audio.play();
  }
  
  // Player controls
  document.getElementById("play").onclick = () => audio.play();
  document.getElementById("pause").onclick = () => audio.pause();
  document.getElementById("next").onclick = () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
  };
  document.getElementById("prev").onclick = () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
  };
  document.getElementById("volume").oninput = (e) => {
    audio.volume = e.target.value;
  };
  
  // Update playlist based on search input and category selection
  searchBar.oninput = () => renderPlaylist(searchBar.value, categoryFilter.value);
  categoryFilter.onchange = () => renderPlaylist(searchBar.value, categoryFilter.value);
  
  // Initial setup
  populateCategories();
  renderPlaylist();
  