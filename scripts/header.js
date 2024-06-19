date.value = new Date().toISOString().slice(0, 10);

let day;

const dateToggleButton = document.getElementById("dateOnOffButton");

dateToggleButton.addEventListener("click", (e) => {
  e.target.classList.toggle("dateOnOffActive");

  if (e.target.classList.contains("dateOnOffActive")) {
    e.target.title = "Enable Date in Title ";

    const storage = JSON.parse(localStorage.getItem("all"));
    storage.dateInTitle = false;
    localStorage.setItem("all", JSON.stringify(storage));

    removeDate();
  } else {
    e.target.title = "Disable Date in Title ";

    const storage = JSON.parse(localStorage.getItem("all"));
    storage.dateInTitle = true;
    localStorage.setItem("all", JSON.stringify(storage));
    addDateBack();
  }
});

function headerToLocalStorage(header) {
  const storage = JSON.parse(localStorage.getItem("all"));

  if (storage.header) {
    storage.header[`${header.id}`] = header.dataset[header.id];
  } else {
    storage.header = {};
    storage.header[`${header.id}`] = header.dataset[header.id];
  }

  localStorage.setItem("all", JSON.stringify(storage));
}

function titleChange() {
  let newDay =
    -(new Date("2022-10-19") - new Date(date.value)) / (1000 * 60 * 60 * 24);

  //const storage = ;
  if (JSON.parse(localStorage.getItem("all")).dateInTitle === false) {
    return;
  }

  if (day !== newDay && title.value.includes(" - ")) {
    day = newDay;
    title.dataset.title = `${title.value.split("- ")[1]}`;

    title.value = `Den ${day} - ${title.value.split("- ")[1]}`;
  } else if (day !== newDay && title.value !== "") {
    day = newDay;
    title.dataset.title = `${title.value}`;

    title.value = `Den ${day} - ${title.value}`;
  }
}

function removeDate() {
  if (title.value.includes(" - ")) {
    title.value = title.value.split(" - ")[1];
  }
}

function addDateBack() {
  day = -10000000;
  titleChange();
}

date.addEventListener("input", (e) => {
  titleChange();
  date.dataset.date = date.value;
  headerToLocalStorage(date);
});

date.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkBox.focus();
  }
});

title.addEventListener("focus", removeDate);

title.addEventListener("focusout", addDateBack);
title.addEventListener("keyup", (event) => {
  title.dataset.title = title.value;
  headerToLocalStorage(title);

  if (event.key === "Enter") {
    addDateBack();

    setTimeout(() => {
      date.focus();
    }, 0);
  }
});

const checkBox = document.getElementById(`lineCheckbox`);

checkBox.addEventListener("focus", () => {
  lineMouseOver();
});

checkBox.addEventListener("focusout", (e) => {
  innerLine.classList.remove("buttonLineActive");
  buttons.style.visibility = "none";
});
