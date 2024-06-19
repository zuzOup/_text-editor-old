const onLoadLocalStorage = {
  titleLS: function () {
    const storage = JSON.parse(localStorage.getItem("all"));

    if (storage?.header?.title) {
      title.value = `Den ${
        -(new Date("2022-10-19") - new Date(date.value)) / (1000 * 60 * 60 * 24)
      } - ${storage.header.title}`;
      title.dataset.title = storage.header.title;
    }
  },
  dateLS: function () {
    const storage = JSON.parse(localStorage.getItem("all"));

    if (storage?.header?.date) {
      date.value = storage.header.date;
      date.dataset.date = storage.header.date;
    }
  },
  placeLS: function () {
    const storage = JSON.parse(localStorage.getItem("all"));

    if (storage?.header?.place?.place) {
      place.value = storage.header.place.place;
    }
    if (storage?.header?.place?.longitude) {
      longitude.innerHTML = storage.header.place.longitude;
      latitude.innerHTML = storage.header.place.latitude;
    }
  },

  articleLS: function () {
    const storage = JSON.parse(localStorage.getItem("all"));

    if (!storage.article_order) {
      storage.article_order = [];

      localStorage.setItem("all", JSON.stringify(storage));

      storage.divs = {};
    } else {
      const articles = storage.article_order;

      articles.forEach((id) => {
        onLoadLocalStorage[`article_${storage.articles[`${id}`].article_type}`](
          id
        );
      });
    }
  },
  article_text: function (id) {
    bubblesFunction.addText(id);

    const text = document.getElementById(`text_${id}`);

    const storage = JSON.parse(localStorage.getItem("all"));

    if (storage.articles[`${id}`]?.text) {
      text.innerHTML = storage.articles[`${id}`].text;
    }
  },
  article_textImg: function (id) {
    bubblesFunction.addTextImg(id);

    const text = document.getElementById(`text_textImg_${id}`);
    const img = document.getElementById(`img_textImg_${id}`);

    const storage = JSON.parse(localStorage.getItem("all"));

    if (storage.articles[`${id}`]?.text) {
      text.innerHTML = storage.articles[`${id}`].text;
    }

    if (storage.articles[`${id}`]?.img) {
      img.dataset.url = storage.articles[`${id}`].img.url;
      img.dataset.alt = storage.articles[`${id}`].img.alt;
      img.dataset.float = storage.articles[`${id}`].img.float;
    }

    if (storage.articles[`${id}`].img.float === `left`) {
      img.classList.add(`img_textImgLeft`);
    } else {
      img.classList.add(`img_textImgRight`);
    }

    imgModifier(img, 150);
  },

  article_img: function (id) {
    bubblesFunction.addImg(id);

    const img = document.getElementById(`img_${id}`);

    const storage = JSON.parse(localStorage.getItem(`all`));
    img.dataset.url = storage.articles[`${id}`].img.url;
    img.dataset.alt = storage.articles[`${id}`].img.alt;

    imgModifier(img, 1000);
  },
  article_grid: function (id) {
    bubblesFunction.addGrid(id);
    const storage = JSON.parse(localStorage.getItem("all"));

    const grid = document.getElementById(`grid_${id}`);
    grid.click();

    const container = document.getElementById(`modalGrid_${id}`);
    const numberOfRows = document.getElementById(`numberOfRows_${id}`);
    const spanRight = document.getElementById(`gridSpanRight_${id}`);

    if (!storage.articles[`${id}`].rows) {
      const buttonHotovo = document.getElementById(`button_Hotovo_${id}`);
      buttonHotovo.click();
      return;
    }

    numberOfRows.value = storage.articles[`${id}`].rows;
    numberOfRows.dataset.lastvalue = `${storage.articles[`${id}`].rows - 1}`;

    for (let i = 2; i <= storage.articles[`${id}`].rows; i++) {
      container.append(appendRow(i, id));
    }

    for (let i in storage.articles[`${id}`].divs) {
      const cellStart = document.getElementById(
        `gridCell_${
          parseFloat(storage.articles[`${id}`].divs[i].rowStart - 1) * 6 +
          parseFloat(storage.articles[`${id}`].divs[i].columnStart)
        }_${id}`
      );

      cellStart.innerHTML = i;
      cellStart.dataset.span = i;

      const cellEnd = document.getElementById(
        `gridCell_${
          (parseFloat(storage.articles[`${id}`].divs[i].rowEnd) - 2) * 6 +
          (parseFloat(storage.articles[`${id}`].divs[i].columnEnd) - 1)
        }_${id}`
      );

      cellEnd.innerHTML = i;
      cellEnd.dataset.span = i;

      gridAddButtonFunction(id, spanRight, grid);

      const url = document.getElementById(`urlImg_grid${i}_${id}`);
      url.value = storage.articles[`${id}`].divs[i].url;
      const alt = document.getElementById(`altImg_grid${i}_${id}`);
      alt.value = storage.articles[`${id}`].divs[i].alt;
    }

    const buttonHotovo = document.getElementById(`button_Hotovo_${id}`);
    buttonHotovo.click();
  },
  article_link: function (id) {
    bubblesFunction.addLink(id);
    const storage = JSON.parse(localStorage.getItem("all"));

    const link = document.getElementById(`link_${id}`);

    link.dataset.linkurl = storage.articles[`${id}`].link.url;
    link.dataset.linktext = storage.articles[`${id}`].link.text;

    if (storage.articles[`${id}`].link.text !== ``) {
      link.innerHTML = storage.articles[`${id}`].link.text;
    }
  },
  article_yt: function (id) {
    bubblesFunction.addYT(id);
    const storage = JSON.parse(localStorage.getItem("all"));

    const ytParent = document.getElementById(`article_${id}`);
    ytParent.classList.add(`ytActive`);

    const yt = Array.from(ytParent.childNodes)[0];
    yt.classList.add(`ytActive`);

    yt.setAttribute(`data-urlID`, storage.articles[`${id}`].yt.urlID);
    yt.setAttribute(
      `data-urlEmbed`,
      urlToYT(storage.articles[`${id}`].yt.urlID)
    );
    yt.setAttribute(
      `data-urlImg`,
      urlToYTImg(storage.articles[`${id}`].yt.urlID)
    );
    yt.setAttribute(
      `data-urlyt`,
      `https://www.youtube.com/watch?v=${storage.articles[`${id}`].yt.urlID}`
    );

    yt.style.backgroundImage = `url('${yt.dataset.urlimg}')`;
  },

  lightMode: function () {
    const darkMode = JSON.parse(localStorage.getItem("darkMode"));

    //const systemSettingDark = window.matchMedia( "(prefers-color-scheme: dark)" );         bugged on Chrome https://bugs.chromium.org/p/chromium/issues/detail?id=998903

    if (darkMode /*|| systemSettingDark.matches*/) {
      navBubble2.click();
    }
  },
  preview: function () {
    const storage = JSON.parse(localStorage.getItem(`all`));
    const preview = document.getElementById("previewImg");

    if (storage?.header?.preview) {
      preview.dataset.url = storage.header.preview.url;
      preview.dataset.alt = storage.header.preview.alt;

      imgModifier(preview, 100);
    }
  },
  dateToggle: function () {
    const storage = JSON.parse(localStorage.getItem(`all`));

    if (storage.dateInTitle !== false) {
      storage.dateInTitle = true;
      localStorage.setItem("all", JSON.stringify(storage));
    } else {
      const button = document.getElementById("dateOnOffButton");
      button.title = "Enable Date in Title ";
      button.classList.add("dateOnOffActive");
      removeDate();
    }
  },
};

onLoadLocalStorage.lightMode();
onLoadLocalStorage.dateLS();
onLoadLocalStorage.titleLS();
onLoadLocalStorage.placeLS();
onLoadLocalStorage.articleLS();
onLoadLocalStorage.dateToggle();
