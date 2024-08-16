const main_menu = document.querySelector(".main-menu");
const about_us = document.querySelector(".about-us");
const contacts = document.querySelector(".contacts");
const origin = document.querySelector(".origin");
const menu_about_us = document.querySelector(".about-cite");
const grids = document.querySelector(".grids");
const btn_submit = document.querySelector(".btn-submit");
const title_int = document.querySelector(".title");
const grade_int = document.querySelector(".grading");
const picture = document.querySelector(".picture");

// Создаем глобальную переменную image
const image = document.createElement("img");

function saveData() {
    const title = title_int.value;
    const grade = grade_int.value;
    const imageSrc = image.src;

    const data = {
        title: title,
        grade: grade,
        imageSrc: imageSrc
    };

    // Получаем текущие данные из localStorage
    const savedData = localStorage.getItem("formData");
    let dataArray = savedData ? JSON.parse(savedData) : [];

    // Убедимся, что dataArray является массивом
    if (!Array.isArray(dataArray)) {
        dataArray = [];
    }

    // Добавляем новые данные
    dataArray.push(data);

    // Сохраняем все данные в localStorage
    localStorage.setItem("formData", JSON.stringify(dataArray));
}

function loadData() {
    const savedData = localStorage.getItem("formData");
    let dataArray = savedData ? JSON.parse(savedData) : [];

    // Убедимся, что dataArray является массивом
    if (!Array.isArray(dataArray)) {
        dataArray = [];
    }

    // Создаем элементы для каждого элемента данных
    dataArray.forEach(item => {
        const div = document.createElement("div");
        div.setAttribute("class", "grid");

        const loadedImage = document.createElement("img");
        loadedImage.src = item.imageSrc;

        const myH2 = document.createElement("h2");
        myH2.textContent = item.title;

        const mySpan = document.createElement("span");
        mySpan.textContent = item.grade;

        div.appendChild(loadedImage);
        div.appendChild(myH2);
        div.appendChild(mySpan);

        grids.appendChild(div);
    });
}

main_menu.addEventListener("click", () => {
    document.location.reload();
});

about_us.addEventListener("click", () => {
    menu_about_us.style.display = "block";
});

picture.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});

btn_submit.addEventListener("click", function(event) {
    if (title_int.value === "" || grade_int.value === "") {
        alert("Please enter title and grade.");
    } else {
        event.preventDefault();
        
        const div = document.createElement("div");
        div.setAttribute("class", "grid");
        grids.appendChild(div);

        const newImage = document.createElement("img");
        newImage.src = image.src;
        div.appendChild(newImage);

        const myH2 = document.createElement("h2");
        myH2.textContent = title_int.value;
        div.appendChild(myH2);

        const mySpan = document.createElement("span");
        mySpan.textContent = grade_int.value;
        div.appendChild(mySpan);

        saveData();
    }
});

// Загружаем данные при загрузке страницы
window.addEventListener("load", loadData);
