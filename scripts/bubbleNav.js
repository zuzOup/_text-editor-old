const burgerMenu = document.getElementById("burgerMenu");
const navBubbles = Array.from(document.getElementsByClassName("navBubble"));
const burger = Array.from(document.getElementsByClassName("burger"));
const navBubble1 = document.getElementById("navBubble1");
const checkbox_navBubble1 = document.getElementById("navBubble1_checkbox");

function focusOutNav(event) {
  /*document.addEventListener(
    `click`,
    (e) => {
      if (
        e.target.id !== burgerMenu.id &&
        e.target.id !== navBubble1.id &&
        e.target.id !== navBubble2.id &&
        e.target.id !== navBubble3.id
      ) {
        burger_fce();
        burgerMenu.blur();
      }
    },
    { once: true }
  );*/
}

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("activeBurger");

  navBubbles.forEach((x, i) => x.classList.toggle(`navBubble${i + 1}`));

  burger.forEach((x) => x.classList.toggle("cross"));

  /*Beaver visibility -  navBubble1*/
  if (navBubble1.classList.contains(`navBubble1`) && checkbox_navBubble1.checked) {
    navBubble1.classList.add(`navBubble1Active`);
  } else if (!navBubble1.classList.contains(`navBubble1`)) {
    navBubble1.classList.remove(`navBubble1Active`);
  }
});

burgerMenu.addEventListener("focusout", (event) => focusOutNav(event));

navBubble1.addEventListener("click", () => {
  navBubble1.classList.toggle("navBubble1Active");
  checkbox_navBubble1.checked = !checkbox_navBubble1.checked;
});

const navBubble2 = document.getElementById("navBubble2");
navBubble2.addEventListener("click", (e) => {
  navBubble2.classList.toggle("darkMode");

  if (!localStorage.darkMode) {
    localStorage.setItem("darkMode", `false`);
  }

  let darkMode = JSON.parse(localStorage.getItem("darkMode"));
  const root = document.querySelector(":root");

  if (navBubble2.classList.contains("darkMode")) {
    darkMode = true;

    navBubble2.style.backgroundImage = 'url("./public/day.png")';
    root.style.setProperty("--background", "#2e2d2d");
    root.style.setProperty("--headlineText", "#ee2147");
    root.style.setProperty("--headerOpacity", "20%");
    root.style.setProperty("--placeholderText", "#8a7472");
    root.style.setProperty("--weatherDivBackground", "#312423");
    root.style.setProperty(
      "--filter",
      "invert(74%) sepia(34%) saturate(240%) hue-rotate(314deg) brightness(104%) contrast(104%)"
    );
    root.style.setProperty("--text", "#ffc9c7"); /* #aba5a5*/
    root.style.setProperty("--navBackground", "#522d2b");
    root.style.setProperty("--navBorder", "#312423");
    root.style.setProperty("--navShadow", "#1a1625");
    root.style.setProperty("--previewBck", "#2e2d2d");
    root.style.setProperty("--binColor", "#522d2b");
    root.style.setProperty("--binColorHover", "#67302f");
    root.style.setProperty("--binColorHoverBorder", "#522d2b");
    root.style.setProperty(`--orderButtonBackground`, "#522d2b");
    root.style.setProperty("--orderbuttonHoverBck", "#67302f");
    root.style.setProperty("--orderButtonHoverBorder", "#522d2b");
    root.style.setProperty("--buttonBackground", "#312423");
    root.style.setProperty("--buttonHover", "#522d2b");
    root.style.setProperty("--previewBckInner", "#522d2b");
    root.style.setProperty("--modalBorderInput", "#ee2147");
    root.style.setProperty(`--modalBck`, "rgba(0, 0, 0, 0.3)");
    root.style.setProperty(`--button`, "#522d2b");
    /**/
  } else {
    darkMode = false;
    root.style.removeProperty("--background");
    root.style.removeProperty("--headlineText");
    root.style.removeProperty("--headerOpacity");
    root.style.removeProperty("--placeholderText");
    root.style.removeProperty("--weatherDivBackground");
    root.style.removeProperty("--filter");
    root.style.removeProperty("--text");
    root.style.removeProperty("--navBackground");
    root.style.removeProperty("--navBorder");
    root.style.removeProperty("--navShadow");
    root.style.removeProperty("--previewBck");
    root.style.removeProperty("--binColor");
    root.style.removeProperty("--binColorHover");
    root.style.removeProperty("--binColorHoverBorder");
    root.style.removeProperty("--orderButtonBackground");
    root.style.removeProperty("--orderbuttonHoverBck");
    root.style.removeProperty("--orderButtonHoverBorder");
    root.style.removeProperty("--buttonBackground");
    root.style.removeProperty("--buttonHover");
    root.style.removeProperty("--previewBckInner");
    root.style.removeProperty("--modalBorderInput");
    root.style.removeProperty(`--modalBck`);
    root.style.removeProperty(`--button`);

    navBubble2.style.backgroundImage = 'url("./public/moon.png")';

    /*
    
  */
  }
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
});

const navBubble3 = document.getElementById("navBubble3");
navBubble3.addEventListener("click", (e) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "json";

  input.addEventListener("change", () => {
    const [file] = input.files;
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (file.type === `application/json`) {
          article.innerHTML = "";

          localStorage.setItem("all", reader.result);

          onLoadLocalStorage.dateLS();
          onLoadLocalStorage.titleLS();
          onLoadLocalStorage.placeLS();
          onLoadLocalStorage.articleLS();
          onLoadLocalStorage.preview();
        }

        const storage = JSON.parse(localStorage.getItem("all"));

        console.log(storage.dateInTitle);
        if (storage.dateInTitle === false) {
          const button = document.getElementById("dateOnOffButton");
          button.title = "Enable Date in Title ";
          button.classList.add("dateOnOffActive");

          removeDate();
        }
      },
      false
    );

    if (file) {
      reader.readAsText(file);
    }
  });

  input.click();
});

navBubble4.addEventListener("click", () => {
  const json = localStorage.getItem("all");
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const storage = JSON.parse(localStorage.getItem("all"));

  const a = document.createElement("a");
  a.href = url;

  if (storage?.header?.date || storage?.header?.title) {
    a.download = `${storage?.header?.date}_${storage?.header?.title}.json`;
  } else {
    a.download = `article.json`;
  }

  a.click();
});

const navBubble5 = document.getElementById("navBubble5");
navBubble5.addEventListener("click", () => {
  localStorage.setItem(
    "all",
    JSON.stringify({ article_order: [], articles: {}, dateInTitle: true })
  );

  title.value = ``;
  title.dataset.title = "";

  place.value = ``;

  date.value = `${new Date().toISOString().slice(0, 10)}`;
  date.dataset.date = date.value;

  longitude.innerHTML = "---";
  longitude.dataset.longitude = "---";

  latitude.innerHTML = "---";
  latitude.dataset.latitude = "---";

  article.innerHTML = "";

  const preview = document.getElementById("previewImg");

  preview.dataset.url = "";
  preview.dataset.alt = "";
  preview.style.backgroundImage = null;
  preview.style.height = null;

  const dateInTitleButton = document.getElementById("dateOnOffButton");
  dateInTitleButton.classList.remove("dateOnOffActive");
});
