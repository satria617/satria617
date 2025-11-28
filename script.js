let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTheme = localStorage.getItem("theme") || "light";
let currentWallpaper = localStorage.getItem("wallpaper") || "";

// ------------------------------
// Render tugas
// ------------------------------
function renderTasks() {
    let ul = document.getElementById("taskList");
    ul.innerHTML = "";

    taskList.forEach((task, index) => {
        ul.innerHTML += `
            <li>
                <div>
                    <strong>${task.name}</strong><br>
                    Deadline: ${task.deadline}
                </div>
                <button onclick="deleteTask(${index})">Hapus</button>
            </li>
        `;
    });
}

// ------------------------------
// Tambah tugas
// ------------------------------
function addTask() {
    let name = document.getElementById("taskInput").value;
    let deadline = document.getElementById("deadlineInput").value;

    if (name === "" || deadline === "") return alert("Isi semua kolom!");

    taskList.push({ name, deadline });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTasks();
}

// ------------------------------
// Hapus tugas
// ------------------------------
function deleteTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTasks();
}

// ------------------------------
// Ganti Tema (Light/Dark)
// ------------------------------
function toggleTheme() {
    document.body.classList.toggle("dark");

    currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
}

// ------------------------------
// Ganti wallpaper bawaan
// ------------------------------
function changeWallpaper() {
    let select = document.getElementById("wallpaperSelect");
    let file = select.value;

    if (file) {
        document.body.style.backgroundImage = `url(${file})`;
        localStorage.setItem("wallpaper", file);
    }
}

// ------------------------------
// Upload wallpaper sendiri
// ------------------------------
function uploadWallpaper() {
    let fileInput = document.getElementById("uploadBg");
    let file = fileInput.files[0];

    if (!file) return;

    let reader = new FileReader();
    reader.onload = function (e) {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        localStorage.setItem("wallpaper", e.target.result);
    };
    reader.readAsDataURL(file);
}

// ------------------------------
// Load tema & wallpaper saat halaman dibuka
// ------------------------------
function loadSettings() {
    // Tema
    if (currentTheme === "dark") {
        document.body.classList.add("dark");
    }

    // Wallpaper
    if (currentWallpaper) {
        document.body.style.backgroundImage = `url(${currentWallpaper})`;
    }
}

// ------------------------------
// Inisialisasi
// ------------------------------
loadSettings();
renderTasks();
