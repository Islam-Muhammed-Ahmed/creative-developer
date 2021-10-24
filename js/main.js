// check if there is local storage Color option
let mainColors = localStorage.getItem("color-option");
// console.log(mainColors); == null
if (mainColors !== null) {
    // console.log("local storage is not empty");
    // console.log(localStorage.getItem("color-option"));
    document.documentElement.style.setProperty("--main-color", mainColors);

    // remove active class from all list items elements
    let removeActive = document.querySelectorAll(".colors-list li");
    removeActive.forEach((element) => {
        element.classList.remove("active");
        // add active class on the element with data color=== localstorage item
        if (element.dataset.color === mainColors) {
            // add ative class
            element.classList.add("active");
        }
    });
}
// random background option
let backgroundOption = true;
// varaiable to control the interval
let backgroundInterval;
// check if image for backgound stored in local storage or not
let backgroundItem = localStorage.getItem("background_option");
// check if random background not empty in local storage
if (backgroundItem !== null) {
    if (backgroundItem === "true") {
        backgroundItem = true;
    } else {
        backgroundItem = false;
    }
    // remove active class from button
    let activeBtn = document.querySelectorAll(".randm-backgrounds button");
    activeBtn.forEach((el) => {
        el.classList.remove("active");
    });
    if (backgroundItem === "true") {
        backgroundOption = true;
        document.querySelector(".randm-backgrounds .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".randm-backgrounds .no").classList.add("active");
    }
}
//open settings box onclick the gear
let gear = document.querySelector(".rotation-text");
let settingBox = document.querySelector(".settings-box");
// let allContent = document.getElementById("main");

gear.addEventListener("click", () => {
    // toggle class rotate from css file on click
    gear.classList.toggle("rotate");
    // toggle class opened from css file on click
    settingBox.classList.toggle("opened");
    //I stoped it 'cause  on pushing content left it crash the responsive
    // if (settingBox.classList.contains("opened")) {
    //     allContent.style.marginLeft = "250px";
    // } else {
    //     allContent.style.marginLeft = "0";
    // }
});
// dark mode
// set theme toggler from html page
let tGr = document.querySelector(".theme-toggler");
tGr.addEventListener("click", () => {
    // adding active class to theme toggler
    tGr.classList.toggle("active");
    // if theme toggler contains active class add it or else remove it
    if (tGr.classList.contains("active")) {
        document.body.classList.add("active");
    } else {
        document.body.classList.remove("active");
    }
    // and adding dark mode to body
    document.body.classList.toggle("dark-theme");
});
// switching colors
let colorLi = document.querySelectorAll(".colors-list li");
// console.log(colorLi)
// looping on every li i have in html file and using event click
colorLi.forEach((allLi) => {
    allLi.addEventListener("click", (eventS) => {
        // console.log(eventS.target.dataset.color);
        // set color on root
        document.documentElement.style.setProperty(
            "--main-color",
            eventS.target.dataset.color
        );
        // set color on local storage
        localStorage.setItem("color-option", eventS.target.dataset.color);
        // function from line 228
        handleActive(eventS);
    });
});
// switching Random Background
let btns = document.querySelectorAll(".randm-backgrounds button");
// console.log(btns)
// looping on all buttons i have in html file and using event click
btns.forEach((btn) => {
    // click on every button
    btn.addEventListener("click", (eo) => {
        // function from line 228
        handleActive(eo);

        if (eo.target.dataset.bg === "yes") {
            backgroundOption = true;
            randomImages();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = ["bg-sec-1.jpg", "0.2.jpg", "0.3.jpg", "0.4.jpg"];

function randomImages() {
    if (backgroundOption == true) {
        // background image will change every x seconds
        backgroundInterval = setInterval(function() {
            // Get Random Number
            let randomIndex = Math.floor(Math.random() * imgsArray.length);
            //change background image url
            landingPage.style.backgroundImage = `url("images/${imgsArray[randomIndex]}")`;
        }, 5000);
    }
}
randomImages();

//select skills selector
let ourSkill = document.querySelector(".skills");

window.onscroll = function() {
    // skills offset top
    let skillOffsetTop = ourSkill.offsetTop;

    // skills outer hight
    let skillouterHeight = ourSkill.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scroll top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillouterHeight + skillOffsetTop - windowHeight) {
        let allSkills = document.querySelectorAll(
            ".skills-box .skill-progress span"
        );
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
    // scroll to up button
    let buttonScrollTop = document.getElementById("goup");
    if (window.pageYOffset >= 105) {
        buttonScrollTop.style.display = "block";
    } else {
        buttonScrollTop.style.display = "none";
    }
    buttonScrollTop.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });
};

//create pop uo with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
    // console.log(img); looping on every we have
    img.addEventListener("click", (eo) => {
        // create overlay element div
        let overlay = document.createElement("div");
        // adding class to overlay
        overlay.className = "popup-overlay";
        // appened over lay to body
        document.body.appendChild(overlay);
        // create popup
        let popupBox = document.createElement("div");
        // add class to popup box
        popupBox.className = "popup-box";
        // create the image for popoup
        let popupImage = document.createElement("img");
        // set image source
        popupImage.src = img.src;
        // add image to popup box
        popupBox.appendChild(popupImage);
        // appened popup box to the body
        document.body.appendChild(popupBox);

        // add ing heading to the images if alt vontain text

        if (img.alt !== null) {
            // creating heading
            let imgHeading = document.createElement("h3");
            // adding class to the heading
            imgHeading.className = "img-popup-head";
            // creating text to heading
            let altText = document.createTextNode(img.alt);
            // appened text to the heading
            imgHeading.appendChild(altText);
            // append the heading to the popup box
            popupBox.prepend(imgHeading);

            // create close span
            let closeSpan = document.createElement("span");
            // add class toclose span
            closeSpan.className = "close-span"; // create the close span text
            let closeSpanText = document.createTextNode("X");
            // append text to closeSpan
            closeSpan.appendChild(closeSpanText);
            // add close button to popup box
            popupBox.appendChild(closeSpan);
        }
    });
});

//close popup
document.addEventListener("click", (eo) => {
    if (eo.target.className == "close-span") {
        // remove the popup
        eo.target.parentNode.remove();
        // and remove the popup overlay class
        document.querySelector(".popup-overlay").remove();
    }
});

//select all links & bullets from html
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollForLinks_Bullets(eo) {
    eo.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            let scrolling = document.querySelector(e.target.dataset.section);
            // web api scrool in to view helps you to scroll smoothly with no libraries
            scrolling.scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}
scrollForLinks_Bullets(allBullets);
scrollForLinks_Bullets(allLinks);

//handling active classes status
function handleActive(eo) {
    // remove active from all li elements
    let removeClass = eo.target.parentElement.querySelectorAll(".active");
    removeClass.forEach((element) => {
        element.classList.remove("active");
    });
    // add active class on the element we clicked on it
    eo.target.classList.add("active");
}

//accessing bullet section from html

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContain = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === "block") {
        bulletsContain.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContain.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach((span) => {
    span.addEventListener("click", (eo) => {
        if (span.dataset.display === "show") {
            bulletsContain.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            bulletsContain.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(eo);
    });
});

// reset button

let resetButton = document.querySelector(".reset-options");
resetButton.addEventListener("click", function() {
    // localStorage.clear();
    localStorage.removeItem("backgroundOption");
    localStorage.removeItem("color-option");
    localStorage.removeItem("bullets_option");
    // reloading window
    window.location.reload();
});

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {
    /* Stop Propagation this will stop bubbling 
        and turns captutre: from default value false to true 
        and showing the only class u click on it
        not the all parents classes
        */
    // e.stopPropagation();
    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");
    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        // Check If Menu Is Open
        if (tLinks.classList.contains("open")) {
            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");
            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");
        }
    }
});

// Stop Propagation On Menu
tLinks.onclick = function(e) {
    // e.stopPropagation();
};

//preloader

function loader() {
    let preloader = document.querySelector(".loader-container");
    preloader.classList.add("fade-out");
}

function M_M() {
    setInterval(loader, 3000);
}

window.onload = M_M;