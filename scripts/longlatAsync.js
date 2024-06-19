const places = [
  {
    place: "New York",
    latitude: 40.7127837,
    longitude: -74.0059413,
  },
  {
    place: "Vídeň",
    latitude: 48.2085,
    longitude: 16.3721,
  },
  {
    place: "Toronto",
    latitude: 43.7001,
    longitude: -79.4163,
  },
  {
    place: "Praha",
    latitude: 50.088,
    longitude: 14.4208,
  },
  {
    place: "Niagáry",
    latitude: 43.1001,
    longitude: 79.0663,
  },
  {
    place: "Lisabon",
    latitude: 38.708042,
    longitude: -9.139016,
  },
  {
    place: "Island",
    latitude: 63.529722,
    longitude: -19.513889,
  },
  {
    place: "Reyjkjavik",
    latitude: 64.1475,
    longitude: -21.935,
  },
];

const placeMiddle = place.getBoundingClientRect().height / 2;
const placeTop = place.getBoundingClientRect().top;
const whispererStartingTop = whisperer.getBoundingClientRect().top;

const whispererFunctions = {
  findMatch: function (word, places) {
    return new Promise((resolve) => {
      resolve(
        places.filter((x) => {
          const normalized = x.place
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

          const regex = new RegExp(word, "gi");

          if (normalized.match(regex)) {
            return x.place;
          }

          return x.place.match(regex);
        })
      );
    });
  },
  whispererPosition: function () {
    const whispererMiddle = whisperer.getBoundingClientRect().height / 2;
    whisperer.style.top = `${
      placeTop - whispererStartingTop + 5 + placeMiddle - whispererMiddle
    }px`;
  },
  destroyWhisperer: function () {
    whisperer.style.visibility = "hidden";
    whisperer.innerHTML = "";
  },
  clickClickable: function () {
    place.value = this.innerText;
    whisperer.innerHTML = "";
    whispererFunctions.longlat();
  },
  preview: function () {
    places.forEach((x) => {
      if (this.innerText === x.place) {
        longitude.classList.add("longlatPreview");
        latitude.classList.add("longlatPreview");
        longitude.innerHTML = x.longitude;
        latitude.innerHTML = x.latitude;

        longitude.dataset.longitude = longitude.innerHTML;
        latitude.dataset.latitude = latitude.innerHTML;
      }
    });
  },
  antiPreview: function () {
    places.forEach((x) => {
      if (this.innerText === x.place) {
        longitude.classList.remove("longlatPreview");
        latitude.classList.remove("longlatPreview");

        longitude.innerHTML = "---";
        latitude.innerHTML = "---";

        longitude.dataset.longitude = ``;
        latitude.dataset.latitude = ``;
      }
    });
  },
  longlat: async function () {
    longitude.classList.remove("longlatPreview");
    latitude.classList.remove("longlatPreview");

    let match = await whispererFunctions.findMatch(place.value, places);

    if (match.length === 1) {
      place.addEventListener(
        "keypress",
        (event) => {
          if (event.key === "Enter" && place.dataset.url === "false") {
            place.value = match[0].place;
            whispererFunctions.destroyWhisperer();
          }
        },
        { once: true }
      );
    }

    const storage = JSON.parse(localStorage.getItem(`all`));

    if (match.length === 1 && match[0].place.length === place.value.length) {
      longitude.innerHTML = match[0].longitude;
      latitude.innerHTML = match[0].latitude;

      longitude.dataset.longitude = longitude.innerHTML;
      latitude.dataset.latitude = latitude.innerHTML;

      if (!storage.header) {
        storage.header = {};
      }

      storage.header.place = {
        latitude: latitude.dataset.latitude,
        longitude: longitude.dataset.longitude,
        place: place.value,
      };

      localStorage.setItem("all", JSON.stringify(storage));

      whispererFunctions.destroyWhisperer();
    } else if (place.dataset.url === "false") {
      longitude.innerHTML = "---";
      latitude.innerHTML = "---";

      longitude.dataset.longitude = ``;
      latitude.dataset.latitude = ``;

      if (storage?.header?.place) {
        delete storage.header.place;
      }

      localStorage.setItem("all", JSON.stringify(storage));
    }
  },

  whisper: async function (target) {
    let arr = await whispererFunctions.findMatch(target, places);

    function whisp1() {
      return new Promise((res) => {
        arr = arr
          .map((x) => {
            const spot = `<li><span class='whisperName' id='placeName_${x.place}'>${x.place}</span></li>`;
            return spot;
          })
          .join("");

        if (target === "") {
          whispererFunctions.destroyWhisperer();
        } else if (arr === "") {
          whisperer.style.visibility = "visible";
          whisperer.innerHTML = "---";
        } else {
          whisperer.style.visibility = "visible";
          whisperer.innerHTML = arr;
        }

        res();
      });
    }
    await whisp1();

    whispererFunctions.whispererPosition();

    const clickable = Array.from(whisperer.children);

    if (clickable.length > 0) {
      clickable.forEach((x) =>
        x.addEventListener("click", whispererFunctions.clickClickable)
      );
      clickable.forEach((x) =>
        x.addEventListener("mouseover", whispererFunctions.preview)
      );
      clickable.forEach((x) =>
        x.addEventListener("mouseleave", whispererFunctions.antiPreview)
      );
    }

    whispererFunctions.longlat();
  },
};

place.addEventListener("keyup", (e) => {
  if (
    ((e.key.length === 1 &&
      e.key.match(/^[a-zA-ZáčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ]/)) ||
      e.key === "Backspace" ||
      e.key === "Enter") &&
    !e.target.value.includes("https://") &&
    !(e.key === "Enter" && place.dataset.url === "true")
  ) {
    place.dataset.url = "false";
    whispererFunctions.whisper(e.target.value);

    /*google copy paste*/
  } else if (e.target.value.includes("https://") && e.key === "Control") {
    place.dataset.url = "true";

    whispererFunctions.destroyWhisperer();

    latitude.innerHTML = parseFloat(e.target.value.split("@")[1].split(",")[0]);
    longitude.innerHTML = parseFloat(
      e.target.value.split("@")[1].split(",")[1]
    );

    longitude.dataset.longitude = longitude.innerHTML;
    latitude.dataset.latitude = latitude.innerHTML;

    const storage = JSON.parse(localStorage.getItem("all"));

    if (!storage.header) {
      storage.header = {};
    }
    if (!storage.header.place) {
      storage.header.place = {};
    }

    storage.header.place.latitude = latitude.dataset.latitude;
    storage.header.place.longitude = longitude.dataset.longitude;

    for (let i = 0; i < e.target.value.split("place/")[1].length; i++) {
      if (
        e.target.value.split("place/")[1][i] === "," ||
        e.target.value.split("place/")[1][i] === "/"
      ) {
        e.target.value = decodeURIComponent(
          e.target.value.split("place/")[1].slice(0, i)
        );

        e.target.value = e.target.value.replaceAll("+", ` `);

        storage.header.place.place = e.target.value;

        break;
      }
    }

    localStorage.setItem("all", JSON.stringify(storage));

    e.target.addEventListener(
      `keydown`,
      (e) => {
        if (e.key === "Enter") {
          place.dataset.url = "false";

          setTimeout(() => {
            title.focus();
          }, 0);
        }
      },
      { once: true }
    );
  }
});
