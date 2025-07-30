function applyTheme() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
} // i used local storage to update the currentTheme whether it's light mode or not.

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    if(isLight) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
} // this is used to when the button is pressed, changing the page from light to dark and vice versa.

document.addEventListener("DOMContentLoaded", function () {
   
    applyTheme(); // update the current theme to what it was before.

  
    fetch('header.html') // header fetched from header.html
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data; // get injected header html data

                const toggleBtn = document.querySelector(".dark-mode-btn"); // get button from header
                if (toggleBtn) {
                    toggleBtn.addEventListener("click", toggleTheme);
                } // if the toggle button exists (the moon looking dark/light button, add a click event listener to it so it functions).

                 const links = document.querySelectorAll(".webpage-link");
                 const currentPage = window.location.pathname.split("/").pop() || "index.html"; // retrieve any link or index.html (for logo)

                links.forEach(link => {
                if (link.getAttribute("href") === currentPage.split("/").pop()) {
                    link.classList.add("active");
                } // if each href link has / then add the active state
            });

            const logoImg = document.querySelector(".logo"); 
                if (logoImg) {
                    if (currentPage === "index.html") {
                        logoImg.src = "activeBrandLogo.png";
                        logoImg.classList.add("active-logo", "active");
                    } else {
                        logoImg.src = "BrandLogo.png";
                        logoImg.classList.remove("active-logo", "active");
                    }
                }
            }); // set logo to new logo when on index.html otherwise keep it regular.

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data; // get injected footer html data
        });

    // Load blog posts if on news.html
    const blogList = document.getElementById('news-grid');
    if (blogList) {
        fetch('posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'news-post';

                    postElement.innerHTML = `
                        <img src="${post.image}" alt="${post.title}">
                        <h3>${post.title}</h3>
                        <p class="date">${post.date}</p>
                        <p>${post.content}</p>
                    `;

                    blogList.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error loading blog posts:', error));
    }
});
