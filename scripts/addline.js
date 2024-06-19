function lineMouseOver() {
  innerLine.classList.add(`buttonLineActive`);
  buttons.style.visibility = "visible";
}

function lineMouseLeave() {
  innerLine.classList.remove("buttonLineActive");
  buttons.style.visibility = "hidden";
}

line.addEventListener("mouseover", lineMouseOver);
line.addEventListener("mouseleave", lineMouseLeave);

function uniqueId() {
  const timestamp = new Date().getTime();
  return timestamp;
}

const attSettings = {
  text: {
    contenteditable: "true",
    class: "textInput",
    "data-placeHolder": "...Sem piš!",
    spellcheck: "true",
    autocorrect: "on",
  },
  text_textImg: {
    contenteditable: "true",
    class: "textImgInput",
    "data-placeHolder": "...Sem piš!",
    spellcheck: "true",
    autocorrect: "on",
  },
  img_textImg: { class: "img_textImg" },
  img: { class: "img" },
  link: { class: "link" },
  yt: { class: `yt` },
  grid: { class: `grid` },
};

function setAttributes(element, attributes) {
  //let i=0 ; i<Object (attributes)  .keys.lenght ; i++    key=> `attributes.keys[i]`
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function addDiv(id, type) {
  const div = document.createElement("div");

  setAttributes(div, {
    id: `article_${id}`,
    class: `articleClass article_${type}`,
    "data-article": type,
  });

  return div;
}

function orderButton(id) {
  const span = document.createElement("span");

  span.classList.add("orderButton_span");

  const buttonSpan = document.createElement("span");

  const buttonUp = document.createElement("button");
  setAttributes(buttonUp, { id: `buttonUp_${id}`, class: `upButton` });

  const buttonDown = document.createElement("button");
  setAttributes(buttonDown, { id: `buttonDown_${id}`, class: `downButton` });

  buttonUp.addEventListener("click", () => {
    const article = document.getElementById(`article_${id}`);
    const storage = JSON.parse(localStorage.getItem("all"));

    if (storage.article_order.indexOf(id) !== 0) {
      const fromIndex = storage.article_order.indexOf(id);
      const toIndex = storage.article_order.indexOf(id) - 1;

      const siblingArticle = document.getElementById(
        `article_${storage.article_order[toIndex]}`
      );

      /*switch local storage*/
      storage.article_order.splice(fromIndex, 1);
      storage.article_order.splice(toIndex, 0, id);
      localStorage.setItem("all", JSON.stringify(storage));

      /*DOM*/

      siblingArticle.parentNode.insertBefore(article, siblingArticle);
    }
  });
  buttonDown.addEventListener("click", (e) => {
    const article = document.getElementById(`article_${id}`);
    const storage = JSON.parse(localStorage.getItem("all"));

    if (
      storage.article_order.indexOf(id) !==
      storage.article_order.length - 1
    ) {
      const fromIndex = storage.article_order.indexOf(id);
      const toIndex = storage.article_order.indexOf(id) + 1;

      const siblingArticle = document.getElementById(
        `article_${storage.article_order[toIndex]}`
      );

      /*switch local storage*/
      storage.article_order.splice(fromIndex, 1);
      storage.article_order.splice(toIndex, 0, id);
      localStorage.setItem("all", JSON.stringify(storage));

      /*DOM*/

      siblingArticle.parentNode.insertBefore(siblingArticle, article);
    }
  });

  buttonSpan.append(buttonUp);
  buttonSpan.append(buttonDown);

  span.append(buttonSpan);
  return span;
}

function removeButton(id) {
  const span = document.createElement("span");
  span.id = `removeButton_span_${id}`;
  span.classList.add("removeButton_span");

  const button = document.createElement("button");

  setAttributes(button, { id: `bin_${id}`, class: `removeButton` });

  button.addEventListener("click", () => {
    const storage = JSON.parse(localStorage.getItem("all"));

    storage.article_order.splice(storage.article_order.indexOf(id), 1);

    delete storage.articles[`${id}`];

    localStorage.setItem(`all`, JSON.stringify(storage));

    const elToRemove = document.getElementById(`article_${id}`);
    elToRemove.remove();
  });

  span.append(button);
  return span;
}

/*❀✿❀✿❀✿❀✿❀✿❀✿❀✿     Modal settings     ❀✿❀✿❀✿❀✿❀✿❀✿❀✿*/

const modalSpan = {
  urlAltTxt: function (parent, id, type, text, img = `Img`) {
    let newId = id;

    if (parent.classList.contains(`gridImg`)) {
      newId = `grid_` + id;
    }

    const span = document.createElement("span");

    const label = document.createElement("label");
    label.setAttribute("for", `${type}${img}_${newId}`);
    label.innerHTML = `${text}:`;

    const input = document.createElement("input");

    setAttributes(input, {
      type: `text`,
      id: `${type}${img}_${newId}`,
      name: `${type}${img}_${newId}`,
      placeholder: "...",
    });

    if (parent.dataset[type.toLowerCase()]) {
      input.value = parent.dataset[type.toLowerCase()];
    }

    span.append(label);
    span.append(input);

    return span;
  },

  modalButtonRow: function (parent, id) {
    const div = document.createElement("div");
    div.classList.add("buttonRow");
    div.innerHTML = `
    <div class="gridRow1" id="gridRow1_${id}"></div>
    <div class="gridRow2" id="gridRow2_${id}"></div>
    <div class="gridRow3" id="gridRow3_${id}"></div>
    <div class="gridRow4" id="gridRow4_${id}"></div>
    <div class="gridRow5" id="gridRow5_${id}"></div>
    <div class="gridRow6" id="gridRow6_${id}"></div>
`;

    Array.from(div.children).forEach((x, i) => {
      x.addEventListener("click", () => {
        const spanRight = document.getElementById(`gridSpanRight_${id}`);

        if (spanRight.lastChild.children.length === 0) {
          const container = document.getElementById(`modalGrid_${id}`);
          const input = document.getElementById(`numberOfRows_${id}`);
          buttonRow[i + 1](id, spanRight, parent, container, input);
        } else {
          console.log("already changed");
        }
      });
    });

    return div;
  },
  leftRightSwitch: function (parent, id) {
    const span = document.createElement("span");
    span.classList.add(`switchSpan`);

    const text1 = document.createElement("p");
    text1.innerHTML = `Float left`;

    const text2 = document.createElement("p");
    text2.innerHTML = `Float right`;

    const toggleSwitch = document.createElement("label");
    toggleSwitch.innerHTML = `<span class="slider"></span>`;
    setAttributes(toggleSwitch, {
      id: `switch_${id}`,
      class: "toggleSwitch",
    });

    toggleSwitch.dataset.float =
      parent.dataset.float === `left` ? `left` : `right`;

    if (parent.dataset.float === "left") {
      toggleSwitch.children[0].classList.add(`sliderLeft`);
      text1.classList.add(`switchActive`);
      parent.dataset.float = `left`;
      parent.classList.add(`img_textImgLeft`);
    } else {
      parent.dataset.float = `right`;
      text2.classList.add(`switchActive`);
      toggleSwitch.children[0].classList.add(`sliderRight`);
      parent.classList.add(`img_textImgRight`);
    }

    toggleSwitch.addEventListener(`click`, () => {
      if (parent.dataset.float === "left") {
        parent.classList.remove(`img_textImgLeft`);
        parent.classList.add(`img_textImgRight`);

        text1.classList.remove(`switchActive`);
        text2.classList.add(`switchActive`);

        parent.dataset.float = `right`;
        toggleSwitch.children[0].classList.remove(`sliderLeft`);
        toggleSwitch.children[0].classList.add(`sliderRight`);

        const storage = JSON.parse(localStorage.getItem("all"));

        storage.articles[`${id}`].img.float = `right`;
        localStorage.setItem("all", JSON.stringify(storage));
      } else {
        parent.classList.remove(`img_textImgRight`);
        parent.classList.add(`img_textImgLeft`);

        text2.classList.remove(`switchActive`);
        text1.classList.add(`switchActive`);

        parent.dataset.float = `left`;
        toggleSwitch.children[0].classList.remove(`sliderRight`);
        toggleSwitch.children[0].classList.add(`sliderLeft`);

        const storage = JSON.parse(localStorage.getItem("all"));
        storage.articles[`${id}`].img.float = `left`;
        localStorage.setItem("all", JSON.stringify(storage));
      }
    });

    //toggleSwitch.prepend(input);

    span.append(text1);
    span.append(toggleSwitch);
    span.append(text2);

    return span;
  },
  gridMaker: function (parent, id) {
    const div = document.createElement("div");
    div.id = `gridMaker_${id}`;
    div.classList.add("gridMaker");

    const spanLeft = document.createElement("span");

    /*Number of Rows control*/
    const divInput = document.createElement("div");
    const inputLabel = document.createElement("label");
    inputLabel.innerHTML = `Number of rows: `;

    const inputInput = document.createElement("input");
    inputInput.dataset.lastvalue = 1;
    setAttributes(inputInput, {
      type: "number",
      id: `numberOfRows_${id}`,
      min: "1",
      max: "50",
      value: "1",
      class: `gridRowNumberInput`,
    });

    inputInput.addEventListener("change", (event) => {
      const lastValue = parseFloat(inputInput.dataset.lastvalue);
      const currentValue = parseFloat(event.target.value);
      inputInput.dataset.lastvalue = `${currentValue}`;

      if (lastValue < currentValue) {
        container.append(appendRow(currentValue, id));
      } else {
        container.removeChild(container.lastChild);
      }
    });

    divInput.append(inputLabel);
    divInput.append(inputInput);

    /*gridMaker buttons*/

    const container = document.createElement("div");
    container.classList.add("modalGridContainer");
    container.id = `modalGrid_${id}`;

    container.append(appendRow(1, id));
    /**/

    spanLeft.append(divInput);
    spanLeft.append(container);

    /**/
    const spanRight = document.createElement("span");
    spanRight.classList.add(`gridSpanRight`);
    spanRight.id = `gridSpanRight_${id}`;

    /*add Img Controls*/

    const spanButtons = document.createElement("span");
    spanButtons.classList.add("gridImgButtons");

    const gridRemoveButton = document.createElement("button");
    gridRemoveButton.id = `gridImgRemoveButton_${id}`;
    gridRemoveButton.innerHTML = `-`;

    gridRemoveButton.addEventListener("click", () => {
      if (spanRight.lastChild.children) {
        spanRight.lastChild.removeChild(spanRight.lastChild.lastChild);
      }
    });

    const gridAddButton = document.createElement("button");
    gridAddButton.id = `gridImgAddButton_${id}`;
    gridAddButton.innerHTML = `+`;

    gridAddButton.addEventListener("click", () => {
      gridAddButtonFunction(id, spanRight, parent);
    });

    const addRemoveText = document.createElement("p");
    addRemoveText.innerHTML = `add Image`;

    spanButtons.append(gridRemoveButton);
    spanButtons.append(addRemoveText);
    spanButtons.append(gridAddButton);

    /**/

    const gridImg = document.createElement("div");

    /**/
    spanRight.append(spanButtons);
    spanRight.append(gridImg);
    /**/

    div.append(spanLeft);
    div.append(spanRight);

    return div;
  },
  button: function (id) {
    const button = document.createElement("button");
    button.setAttribute(`type`, `button`);
    button.innerHTML = `Hotovo`;

    button.id = `button_Hotovo_${id}`;
    return button;
  },

  buttonGrid: function (id, position) {
    const button = document.createElement("button");
    button.setAttribute(`type`, `button`);
    button.innerHTML = `Hotovo`;

    button.id = `button_Hotovo_${position}_${id}`;
    return button;
  },
};

function addModal(parent, id) {
  const modal = document.createElement("div");
  modal.classList.add(`modal`);

  if (parent.classList.contains("grid")) {
    modal.classList.add(`modalGrid`);
  }

  if (parent.classList.contains("gridImg")) {
    modal.id = `modal_gridImg_${id}`;
  } else {
    modal.id = `modal_${id}`;
  }

  const innerModal = document.createElement("div");
  innerModal.classList.add("innerModal");

  const div = document.createElement("div");

  if (parent.classList[0] === "img" || parent.classList.contains("gridImg")) {
    div.append(modalSpan.urlAltTxt(parent, id, `url`, `URL`));
    div.append(modalSpan.urlAltTxt(parent, id, `alt`, `alt`));
    /**/
  } else if (parent.classList[0] === "img_textImg") {
    modal.classList.add("modal_img_textImg");

    div.append(modalSpan.urlAltTxt(parent, id, `url`, `URL`));
    div.append(modalSpan.urlAltTxt(parent, id, `alt`, `alt`));
    div.append(modalSpan.leftRightSwitch(parent, id));
    /**/
  } else if (parent.classList[0] === "link") {
    div.append(modalSpan.urlAltTxt(parent, id, `linkUrl`, `URL`, ``));
    div.append(modalSpan.urlAltTxt(parent, id, `linkText`, `Text`, ``));

    /**/
  } else if (parent.classList[0] === `yt`) {
    div.append(modalSpan.urlAltTxt(parent, id, `urlYT`, `URL`, ``));
    /**/
  } else if (parent.classList[0] === `grid`) {
    div.append(modalSpan.modalButtonRow(parent, id));
    div.append(modalSpan.gridMaker(parent, id));
  }

  if (parent.classList.contains("gridImg")) {
    div.append(modalSpan.buttonGrid(id, parent.dataset.position));
  } else {
    div.append(modalSpan.button(id));
  }

  innerModal.append(div);
  modal.append(innerModal);

  const clearButton = document.createElement(`button`);
  clearButton.classList.add(`clearButton`);

  if (parent.classList.contains("grid")) {
    clearButton.classList.add(`clearButtonGrid`);
    clearButton.id = `clearButton_grid_${id}`;
  } else if (modal.id.includes(`gridImg`)) {
    clearButton.id = `clearButton_gridImg_${id}`;
  } else {
    clearButton.id = `clearButton_${id}`;
  }

  modal.append(clearButton);

  return modal;
}

function clearButtonPosition(id, clearButton) {
  const innerModal = Array.from(
    document.getElementById(`modal_${id}`).children
  )[0];

  clearButton.style.top = `${innerModal.getBoundingClientRect().top + 8}px`;
  clearButton.style.left = `${
    innerModal.getBoundingClientRect().right - 16 - 8
  }px`;
}

function clearButtonGrid(id, container) {
  const rowInput = document.getElementById(`numberOfRows_${id}`);
  const imgs = Array.from(
    document.getElementById(`gridSpanRight_${id}`).children
  )[1];

  container.innerHTML = "";
  container.append(appendRow(1, id));

  rowInput.value = 1;
  rowInput.dataset.lastvalue = 1;

  imgs.innerHTML = "";
}

function clearButtonFunction(id, firstInput, secondInput) {
  const input1 = document.getElementById(`${firstInput}_${id}`);
  const input2 = document.getElementById(`${secondInput}_${id}`);

  if (input1) {
    input1.value = ``;
  }
  if (input2) {
    input2.value = ``;
  }
}

/*-----------------🖼️-🖼️-🖼️-🖼️----Img-  (incl. Img_Txt--🖼️-🖼️-🖼️-🖼️------------------*/

function urlToPicture(url) {
  if (url.includes("file/d/")) {
    const modifiedLink =
      "https://lh3.google.com/u/5/d/" +
      url.split("file/d/")[1].split("/view")[0];
    return modifiedLink;
  } else return url;
}

async function imgModifier(img, size = 1) {
  if (
    !img.dataset.url.includes(`https://`) &&
    !img.dataset.url.includes(`file://`)
  ) {
    img.style.backgroundImage = `none`;
    img.classList.remove(`imgActive`);

    if (size > 1) {
      img.style.height = null;
      img.parentNode.style.minHeight = null;
    }

    if (img.classList.contains(`img_textImg`)) {
      img.nextElementSibling.style.minHeight = null;
    }
    errorMessage();
    return;
  }

  const bckImg = document.createElement("img");
  bckImg.setAttribute("referrerpolicy", "no-referrer");

  bckImg.src = img.dataset.url;

  bckImg
    .decode()
    .then(() => {
      img.style.backgroundImage = `url('${img.dataset.url}')`;
      img.classList.add(`imgActive`);

      const height = (bckImg.naturalHeight / bckImg.naturalWidth) * size;

      if (size > 1 && img.id !== "previewImg") {
        img.style.height = `${height}px`;
        img.parentNode.style.minHeight = `${height}px`;
      }

      if (img.classList.contains(`img_textImg`)) {
        img.nextElementSibling.style.minHeight = `${height + 20}px`;
      }

      setTimeout(() => {
        bckImg.remove();
      }, 1000);
    })
    .catch(() => {
      img.style.backgroundImage = `none`;
      img.classList.remove(`imgActive`);

      if (size > 1) {
        img.style.height = null;
        img.parentNode.style.minHeight = null;
      }

      if (img.classList.contains(`img_textImg`)) {
        img.nextElementSibling.style.minHeight = null;
      }

      errorMessage();
      /*
      alert(`
                          Jáj holka, toho jsem se bála...
        
                           ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ 
                           ✿                                       ✿
                           ❀       URL máš blbě...        ❀ 
                           ✿                                       ✿
                           ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀  
     `);*/
    });
}

function modalImgListener(id, img, size) {
  const url = document.getElementById(`urlImg_${id}`);
  const alt = document.getElementById(`altImg_${id}`);

  img.setAttribute(`data-url`, urlToPicture(url.value));
  img.setAttribute(`data-alt`, alt.value);

  imgModifier(img, size);
  img.parentNode.removeChild(img.parentNode.lastChild);

  if (img.id === "previewImg") {
    localStorageListeners.previewListener(img);
    return;
  }
  localStorageListeners.imgListener(img, id);
}

function addImg(id, size, setting) {
  const img = document.createElement("div");
  setAttributes(img, setting);
  img.innerHTML = `<span>...add img</span>`;

  img.addEventListener(`click`, () => {
    img.parentNode.append(addModal(img, id));

    const button = document.getElementById(`button_Hotovo_${id}`);

    button.addEventListener(
      `click`,
      () => {
        modalImgListener(id, img, size);
      },
      { once: true }
    );

    const clearButton = document.getElementById(`clearButton_${id}`);
    clearButtonPosition(id, clearButton);
    clearButton.addEventListener("click", () => {
      clearButtonFunction(id, `urlImg`, `altImg`);
    });
  });

  return img;
}

/*-----------------🖼️-🖼️-🖼️-🖼️----Youtube---🖼️-🖼️-🖼️-🖼️------------------*/

function urlToYT(urlID) {
  return (
    `<iframe width="1000" height="450" src="https://www.youtube.com/embed/` +
    urlID +
    `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  );
}

function urlToYTImg(urlID) {
  const url = `https://img.youtube.com/vi/` + urlID + `/maxresdefault.jpg`;

  const bckImg = document.createElement("img");
  bckImg.setAttribute("referrerpolicy", "no-referrer");

  bckImg.src = url;

  bckImg
    .decode()
    .then(() => {
      if (bckImg.naturalHeight < `100`) {
        errorMessage();
      }
      setTimeout(() => {
        bckImg.remove();
      }, 1000);
    })
    .catch(() => {
      errorMessage();
    });

  return url;
}

function urlID(url) {
  if (url.includes(`watch?v=`)) {
    return url.split(`watch?v=`)[1].substring(0, 11);
  } else if (url.includes(`youtu.be/`)) {
    return url.split(`youtu.be/`)[1].substring(0, 11);
  } else return "";
}

function modalYTListener(id, yt) {
  const url = document.getElementById(`urlYT_${id}`).value;

  yt.setAttribute(`data-urlYT`, url);
  yt.setAttribute(`data-urlID`, urlID(url));
  yt.setAttribute(`data-urlEmbed`, urlToYT(urlID(url)));
  yt.setAttribute(`data-urlImg`, urlToYTImg(urlID(url)));

  yt.style.backgroundImage = `url('${yt.dataset.urlimg}')`;
  yt.classList.add(`ytActive`);
  yt.parentNode.classList.add(`ytActive`);

  const storage = JSON.parse(localStorage.getItem("all"));
  storage.articles[`${id}`].yt.urlID = urlID(url);
  localStorage.setItem("all", JSON.stringify(storage));

  yt.parentNode.removeChild(yt.parentNode.lastChild);
}

function addYT(id, setting) {
  const yt = document.createElement("div");

  setAttributes(yt, setting);
  yt.innerHTML = `<span>...add YouTube video</span>`;

  yt.addEventListener(`click`, (event) => {
    if (!event.shiftKey) {
      yt.parentNode.append(addModal(yt, id));

      const button = document.getElementById(`button_Hotovo_${id}`);

      button.addEventListener(
        `click`,
        () => {
          modalYTListener(id, yt);
        },
        { once: true }
      );

      const clearButton = document.getElementById(`clearButton_${id}`);
      clearButtonPosition(id, clearButton);
      clearButton.addEventListener("click", () => {
        clearButtonFunction(id, `urlYT`);
      });
    } else if (yt.dataset.urlid) {
      window
        .open(`https://www.youtube.com/watch?v=${yt.dataset.urlid}`, `_blank`)
        .focus();
    }
  });

  return yt;
}

/*-----------------🖼️-🖼️-🖼️-🖼️----Link---🖼️-🖼️-🖼️-🖼️------------------*/

function modalLinkListener(id, link) {
  const text = document.getElementById(`linkText_${id}`);
  const url = document.getElementById(`linkUrl_${id}`);

  link.setAttribute(`data-linktext`, text.value);
  link.setAttribute(`data-linkurl`, url.value);

  const storage = JSON.parse(localStorage.getItem("all"));

  storage.articles[`${id}`].link.url = url.value;
  storage.articles[`${id}`].link.text = text.value;
  localStorage.setItem("all", JSON.stringify(storage));

  if (text.value !== ``) {
    link.innerHTML = text.value;
  } else {
    link.innerHTML = `...ADD LINK...`;
  }

  link.parentNode.removeChild(link.parentNode.lastChild);

  try {
    new URL(url.value);
  } catch (err) {
    errorMessage();
    return;
  }
}

function addLink(id, setting) {
  const link = document.createElement("div");
  setAttributes(link, setting);
  link.innerHTML = `...ADD LINK...`;

  link.addEventListener(`click`, (event) => {
    if (!event.shiftKey) {
      link.parentNode.append(addModal(link, id));
      const button = document.getElementById(`button_Hotovo_${id}`);

      button.addEventListener(
        `click`,
        () => {
          modalLinkListener(id, link);
        },

        { once: true }
      );

      const clearButton = document.getElementById(`clearButton_${id}`);
      clearButtonPosition(id, clearButton);
      clearButton.addEventListener("click", () => {
        clearButtonFunction(id, `linkText`, `linkUrl`);
      });
    } else {
      if (link.dataset.linkurl) {
        window.open(link.dataset.linkurl, "_blank").focus();
      }
    }
  });

  return link;
}

/*-----------------🖼️-🖼️-🖼️-🖼️----Grid---🖼️-🖼️-🖼️-🖼️------------------*/

function addGrid(id, setting) {
  const grid = document.createElement("div");
  setAttributes(grid, setting);
  grid.innerHTML = `<span>...add grid</span>`;
  grid.id = `grid_${id}`;

  grid.addEventListener(
    `click`,
    () => {
      grid.parentNode.append(addModal(grid, id));

      const button = document.getElementById(`button_Hotovo_${id}`);
      const outerModal = document.getElementById(`modal_${id}`);
      const container = document.getElementById(`modalGrid_${id}`);

      button.addEventListener(`click`, () => {
        if (grid.children.length > 0) {
          grid.innerHTML = `<span>...add grid</span>`;
          grid.classList.remove(`gridActive`);
          grid.style.gridTemplateRows = `none`;
          grid.style.height = `auto`;
        }

        modalGridListener(grid, container, id);
        //grid.parentNode.removeChild(grid.parentNode.lastChild);
        outerModal.style.visibility = "hidden";

        grid.addEventListener("click", (event) => {
          if (event.shiftKey) {
            outerModal.style.visibility = "visible";
          }
        });
      });

      const clearButton = document.getElementById(`clearButton_grid_${id}`);
      clearButtonPosition(id, clearButton);
      clearButton.addEventListener("click", () => {
        const storage = JSON.parse(localStorage.getItem("all"));
        delete storage.articles[`${id}`].divs;
        delete storage.articles[`${id}`].rows;
        localStorage.setItem("all", JSON.stringify(storage));
        clearButtonGrid(id, container);
      });
    },
    { once: true }
  );

  return grid;
}

function appendRow(value, id) {
  const row = document.createElement("div");
  row.id = `gridRow${value}_${id}`;

  row.classList.add("gridRow");

  for (let i = 5; i >= 0; i--) {
    const div = document.createElement("div");
    div.classList.add("gridCell");
    div.id = `gridCell_${6 * value - i}_${id}`;
    div.dataset.row = `${value}`;
    div.dataset.column = `${6 - i}`;

    div.addEventListener("mousedown", (event) => {
      if (!event.shiftKey /* && imgButtonsDiv.children.length > 0*/) {
        event.target.dataset.span = `${
          Array.from(document.getElementsByClassName(`buttonActive_${id}`))[0]
            .dataset.num
        }`;
        event.target.innerHTML = event.target.dataset.span;
      } else {
        event.target.innerHTML = ``;
        event.target.dataset.span = ``;
      }
    });

    row.append(div);
  }
  return row;
}

function modalGridListener(grid, container, id) {
  const storage = JSON.parse(localStorage.getItem("all"));
  const rows = Array.from(container.children);
  const div = rows
    .map((x) => {
      const children = Array.from(x.children);
      return children;
    })
    .flat();

  let gridObject = {};

  div.forEach((x) => {
    if (x.dataset.span && !gridObject[x.dataset.span]) {
      let imgObject = { rowStart: 0, columnStart: 0, rowEnd: 0, columnEnd: 0 };

      imgObject.rowStart = parseFloat(x.dataset.row);
      imgObject.columnStart = parseFloat(x.dataset.column);

      imgObject.rowEnd = parseFloat(x.dataset.row) + 1;
      imgObject.columnEnd = parseFloat(x.dataset.column) + 1;

      gridObject[x.dataset.span] = imgObject;
    } else if (x.dataset.span && gridObject[x.dataset.span]) {
      let imgObject = gridObject[x.dataset.span];
      imgObject.rowEnd = parseFloat(x.dataset.row) + 1;
      imgObject.columnEnd = parseFloat(x.dataset.column) + 1;
    }
  });

  if (Object.keys(gridObject).length === 0) {
    grid.addEventListener(
      `click`,
      () => {
        const modal = document.getElementById(`modal_${id}`);
        modal.style.visibility = `visible`;
      },
      { once: true }
    );
    return;
  }

  storage.articles[`${id}`].divs = gridObject;

  for (let i = Object.keys(gridObject).length; i >= 1; i--) {
    const div = document.createElement("div");
    div.style.gridArea = `${gridObject[i].rowStart}/${gridObject[i].columnStart}/${gridObject[i].rowEnd}/${gridObject[i].columnEnd}`;
    div.id = `gridImg_${i}_${id}`;

    div.dataset.url = urlToPicture(
      document.getElementById(`urlImg_grid${i}_${id}`).value
    );
    div.dataset.alt = document.getElementById(`altImg_grid${i}_${id}`).value;
    div.dataset.position = i;

    storage.articles[`${id}`].divs[`${i}`].url = div.dataset.url;
    storage.articles[`${id}`].divs[`${i}`].alt = div.dataset.alt;

    imgModifier(div);

    div.classList.add(`gridImg`);

    div.addEventListener("click", (event) => {
      if (!event.shiftKey) {
        div.parentNode.parentNode.append(addModal(div, id));
        const button = document.getElementById(`button_Hotovo_${i}_${id}`);

        button.addEventListener(
          `click`,
          () => {
            modalGridImgListener(id, div, i);
          },
          { once: true }
        );

        const clearButton = document.getElementById(
          `clearButton_gridImg_${id}`
        );
        clearButtonPosition(`gridImg_${id}`, clearButton);
        clearButton.addEventListener("click", () => {
          clearButtonFunction(`${id}`, `urlImg_grid`, `altImg_grid`);
        });
      }
    });

    grid.prepend(div);
  }

  grid.style.gridTemplateRows = `repeat(${
    gridObject[Object.keys(gridObject).length].rowEnd - 1
  }, 150px)`;

  storage.articles[`${id}`].rows = `${
    gridObject[Object.keys(gridObject).length].rowEnd - 1
  }`;
  localStorage.setItem("all", JSON.stringify(storage));

  grid.classList.add(`gridActive`);

  if (gridObject[Object.keys(gridObject).length].rowEnd - 1 > 1) {
    grid.style.height = `${
      (gridObject[Object.keys(gridObject).length].rowEnd - 1) * 150 +
      (gridObject[Object.keys(gridObject).length].rowEnd - 2) * 20
    }px`;
  } else if (gridObject[Object.keys(gridObject).length].rowEnd - 1 === 1) {
    grid.style.height = `${
      (gridObject[Object.keys(gridObject).length].rowEnd - 1) * 150
    }px`;
  }
}

function modalGridImgListener(id, div, i) {
  const storage = JSON.parse(localStorage.getItem("all"));

  const url = document.getElementById(`urlImg_grid_${id}`);
  const alt = document.getElementById(`altImg_grid_${id}`);

  div.dataset.url = urlToPicture(url.value);
  div.dataset.alt = alt.value;

  const newUrl = document.getElementById(`urlImg_grid${i}_${id}`);
  const newAlt = document.getElementById(`altImg_grid${i}_${id}`);

  newUrl.dataset.url = urlToPicture(url.value);
  newUrl.value = urlToPicture(url.value);
  newAlt.dataset.alt = alt.value;
  newAlt.value = alt.value;

  imgModifier(div);

  storage.articles[`${id}`].divs[`${i}`].url = div.dataset.url;
  storage.articles[`${id}`].divs[`${i}`].alt = div.dataset.alt;

  localStorage.setItem("all", JSON.stringify(storage));

  div.parentNode.parentNode.removeChild(div.parentNode.parentNode.lastChild);
}

function gridAddButtonFunction(id, spanRight, parent) {
  const span = document.createElement("span");
  const button = document.createElement("button");

  button.innerHTML = spanRight.lastChild.childNodes.length + 1;
  span.dataset.num = spanRight.lastChild.childNodes.length + 1;

  span.id = `grid_ImgSpan_${spanRight.lastChild.childNodes.length + 1}_${id}`;

  button.addEventListener("click", () => {
    if (spanRight.lastChild.children) {
      Array.from(spanRight.lastChild.children).forEach((x) => {
        if (x.classList.contains("buttonActive")) {
          x.classList.remove("buttonActive");
          x.classList.remove(`buttonActive_${id}`);
        }
      });
    }
    button.parentNode.classList.add("buttonActive");
    button.parentNode.classList.add(`buttonActive_${id}`);
  });

  span.append(button);

  span.append(
    modalSpan.urlAltTxt(
      parent,
      `grid${spanRight.lastChild.childNodes.length + 1}_${id}`,
      `url`,
      `URL`
    )
  );
  span.append(
    modalSpan.urlAltTxt(
      parent,
      `grid${spanRight.lastChild.childNodes.length + 1}_${id}`,
      "alt",
      `alt`
    )
  );

  spanRight.lastChild.append(span);
}

function spanButtonRowSetting(spanSettings, container) {
  const div = Array.from(container.children)
    .map((x) => {
      const children = Array.from(x.children);
      return children;
    })
    .flat();

  div.forEach((div) => {
    const numId = parseFloat(div.id.split("_")[1]);

    for (let i = 1; i <= Object.keys(spanSettings).length; i++) {
      spanSettings[i].forEach((x) => {
        if (x === numId) {
          div.dataset.span = i;
          div.innerHTML = i;
        }
      });
    }
  });
}

const buttonRow = {
  1: function (id, spanRight, parent, container, input) {
    gridAddButtonFunction(id, spanRight, parent);
    gridAddButtonFunction(id, spanRight, parent);

    container.append(appendRow(2, id));

    input.value++;

    input.dataset.lastvalue = `2`;

    const spanSettings = {
      1: [1, 2, 3, 7, 8, 9],
      2: [4, 5, 6, 10, 11, 12],
    };

    spanButtonRowSetting(spanSettings, container);
  },
  2: function (id, spanRight, parent, container, input) {
    gridAddButtonFunction(id, spanRight, parent);
    gridAddButtonFunction(id, spanRight, parent);
    gridAddButtonFunction(id, spanRight, parent);

    container.append(appendRow(2, id));
    container.append(appendRow(3, id));

    input.value++;
    input.value++;

    input.dataset.lastvalue = `3`;

    const spanSettings = {
      1: [1, 2, 7, 8, 13, 14],
      2: [3, 4, 9, 10, 15, 16],
      3: [5, 6, 11, 12, 17, 18],
    };

    spanButtonRowSetting(spanSettings, container);
  },
  3: function (id, spanRight, parent, container, input) {
    gridAddButtonFunction(id, spanRight, parent);
    gridAddButtonFunction(id, spanRight, parent);

    container.append(appendRow(2, id));
    container.append(appendRow(3, id));

    input.value++;
    input.value++;

    input.dataset.lastvalue = `3`;

    const spanSettings = {
      1: [1, 2, 3, 4, 7, 8, 9, 10, 13, 14, 15, 16],
      2: [5, 6, 11, 12, 17, 18],
    };

    spanButtonRowSetting(spanSettings, container);
  },
  4: function (id, spanRight, parent, container, input) {
    gridAddButtonFunction(id, spanRight, parent);
    gridAddButtonFunction(id, spanRight, parent);

    container.append(appendRow(2, id));
    container.append(appendRow(3, id));

    input.value++;
    input.value++;

    input.dataset.lastvalue = `3`;

    const spanSettings = {
      1: [1, 2, 7, 8, 13, 14],
      2: [3, 4, 5, 6, 9, 10, 11, 12, 15, 16, 17, 18],
    };

    spanButtonRowSetting(spanSettings, container);
  },
  5: function (id, spanRight, parent, container, input) {
    gridAddButtonFunction(id, spanRight, parent);
    gridAddButtonFunction(id, spanRight, parent);

    container.append(appendRow(2, id));
    container.append(appendRow(3, id));
    container.append(appendRow(4, id));

    input.value++;
    input.value++;
    input.value++;

    input.dataset.lastvalue = `4`;

    const spanSettings = {
      1: [1, 2, 3, 7, 8, 9, 13, 14, 15, 19, 20, 21],
      2: [4, 5, 6, 10, 11, 12, 16, 17, 18, 22, 23, 24],
    };

    spanButtonRowSetting(spanSettings, container);
  },
  6: function (id, spanRight, parent, container, input) {
    gridAddButtonFunction(id, spanRight, parent);
    gridAddButtonFunction(id, spanRight, parent);

    container.append(appendRow(2, id));
    container.append(appendRow(3, id));

    input.value++;
    input.value++;

    input.dataset.lastvalue = `3`;

    const spanSettings = {
      1: [2, 3, 8, 9, 14, 15],
      2: [4, 5, 10, 11, 16, 17],
    };

    spanButtonRowSetting(spanSettings, container);
  },
};

/*

🌸🌺🌸🌺🌸🌺🌸🌺🌸🌺🌸🌺🌸🌺🌸🌺💮   Funkce    💮🌺🌸🌺🌸🌺🌸🌺🌸🌺🌸🌺🌸🌺🌸

*/
const bubblesFunction = {
  /*----------------≽^•⩊•^≼ ₊˚⊹♡---------------------------ᨐᵐᵉᵒʷ-------
  ---------≽ܫ≼---------------------🆃🅴🆇🆃---------------------/ᐠ - ˕ -マ
  --ᨐฅ------------------------------------------≽^- ˕ -^≼---------------*/
  addText: function (id) {
    const div = addDiv(id, "text");

    const text = document.createElement("p");
    setAttributes(text, attSettings.text);
    text.id = `text_${id}`;

    localStorageListeners.textListener(text, id);

    const bin = removeButton(id);

    const order = orderButton(id);

    div.append(text);
    div.append(bin);

    div.append(order);

    div.append(order);
    article.append(div);
  },
  /*----------------------------------------------₊˚✧𑁍.ೃ࿔*:･-----------
  --------------(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ---🆃🅴🆇🆃 + 🅸🅼🅶------------------------------
  ------------------------------------------❀.(*´◡`*)❀---------------*/
  addTextImg: function (id) {
    const div = addDiv(id, "textImg");

    const textImgWrap = document.createElement("div");
    textImgWrap.classList.add("textImg_wrap");

    const img = addImg(id, 150, attSettings.img_textImg);
    img.id = `img_textImg_${id}`;

    localStorageListeners.img_imgTextListener(id);

    const text = document.createElement("p");
    setAttributes(text, attSettings.text_textImg);
    text.id = `text_textImg_${id}`;

    localStorageListeners.textListener(text, id);

    textImgWrap.append(img);
    textImgWrap.append(text);

    const bin = removeButton(id);

    const order = orderButton(id);

    div.append(textImgWrap);
    div.append(bin);

    div.append(order);

    article.append(div);
  },
  /* 
  .                    ¯`*•.¸,¤°´✿.｡.:* 🅸🅼🅶 *.:｡.✿`°¤,¸.•*´¯ 
  .     
  */
  addImg: function (id) {
    const div = addDiv(id, `img`);

    const img = addImg(id, 1000, attSettings.img);
    img.id = `img_${id}`;

    localStorageListeners.imgDivListener(id);

    const bin = removeButton(id);

    const order = orderButton(id);

    div.append(img);
    div.append(bin);

    div.append(order);

    article.append(div);
  },
  /*                                𓅼                            𓅯     
  .                𓅮
  .                           ◦•●◉✿ 🅶🆁🅸🅳 ✿◉●•◦                         𓅩
  .         𓅆                                                      
  .                                                       𓅰                      
  */
  addGrid: function (id) {
    const div = addDiv(id, `grid`);

    const grid = addGrid(id, attSettings.grid);

    const bin = removeButton(id);

    const order = orderButton(id);

    div.append(grid);
    div.append(bin);

    div.append(order);

    article.append(div);
  },
  /*                            ⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆                
  .               ✧₊⁺⋆☾⋆.˚₊✩   ˙⋆✮ 🆈🆃 ✮⋆˙   ✩₊˚.⋆☽⋆⁺₊✧
  .                            ⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆
 */
  addYT: function (id) {
    const div = addDiv(id, `yt`);

    const yt = addYT(id, attSettings.yt);
    localStorageListeners.ytListener(id);

    const bin = removeButton(id);

    const order = orderButton(id);

    div.append(yt);
    div.append(bin);

    div.append(order);

    article.append(div);
  },

  /* 
  .          ღ(¯`◕‿◕´¯(¯`*•.¸,¤°´✿.｡.:* 🅻🅸🅽🅺 *.:｡.✿`°¤,¸.• *´¯ (¯`◕‿◕´¯)ღ
  .
  */
  addLink: function (id) {
    const div = addDiv(id, `link`);

    const link = addLink(id, attSettings.link);
    link.id = `link_${id}`;

    localStorageListeners.linkListener(id);

    const bin = removeButton(id);

    const order = orderButton(id);

    div.append(link);
    div.append(bin);

    div.append(order);

    article.append(div);
  },
};

function errorMessage() {
  console.error(` 😑 Špatná URL! 😑`);

  if (checkbox_navBubble1.checked) {
    const error = document.getElementById(`errorMessage`);
    error.classList.add(`errorMessageActive`);

    error.addEventListener("transitionend", () => {
      error.classList.remove(`errorMessageActive`);
    });
  } else {
    const error = document.getElementById(`errorMessageNormal`);
    error.classList.add(`errorMessageNormalActive`);

    setTimeout(() => {
      error.classList.remove(`errorMessageNormalActive`);
    }, 5000);
  }
}

bubbles.forEach((x) => {
  x.addEventListener("mousedown", (event) => {
    const id = uniqueId();

    const storage = JSON.parse(localStorage.getItem("all"));
    storage.article_order.push(id);
    storage.articles[`${id}`] = {
      article_type: `${event.target.dataset.type}`,
    };

    localStorage.setItem(`all`, JSON.stringify(storage));

    bubblesFunction[event.target.id](id);
  });
});

const localStorageListeners = {
  /* ----------------------- TEXT -----------------------------*/
  textListener: function (text, id) {
    text.addEventListener("input", () => {
      const storage = JSON.parse(localStorage.getItem("all"));

      storage.articles[`${id}`].text = text.innerHTML;
      localStorage.setItem("all", JSON.stringify(storage));
    });
  },
  imgListener: function (img, id) {
    const storage = JSON.parse(localStorage.getItem("all"));

    storage.articles[`${id}`].img.url = img.dataset.url;
    storage.articles[`${id}`].img.alt = img.dataset.alt;

    localStorage.setItem("all", JSON.stringify(storage));
  },
  img_imgTextListener: function (id) {
    const storage = JSON.parse(localStorage.getItem("all"));

    if (!storage?.articles[`${id}`].img) {
      storage.articles[`${id}`].img = {
        url: ``,
        alt: ``,
        float: `right`,
      };
    }

    localStorage.setItem("all", JSON.stringify(storage));
  },
  imgDivListener: function (id) {
    const storage = JSON.parse(localStorage.getItem("all"));

    if (!storage?.articles[`${id}`].img) {
      storage.articles[`${id}`].img = {
        url: ``,
        alt: ``,
      };
    }

    localStorage.setItem("all", JSON.stringify(storage));
  },
  ytListener: function (id) {
    const storage = JSON.parse(localStorage.getItem("all"));

    if (!storage.articles[`${id}`].yt) {
      storage.articles[`${id}`].yt = {
        urlID: ``,
      };
    }
    localStorage.setItem("all", JSON.stringify(storage));
  },
  linkListener: function (id) {
    const storage = JSON.parse(localStorage.getItem("all"));

    if (!storage.articles[`${id}`].link) {
      storage.articles[`${id}`].link = {
        url: ``,
        text: ``,
      };
    }
    localStorage.setItem("all", JSON.stringify(storage));
  },
  previewListener: function (preview) {
    const storage = JSON.parse(localStorage.getItem(`all`));

    if (!storage.header) {
      storage.header = {};
    }

    if (!storage.header.preview) {
      storage.header.preview = {};
    }

    storage.header.preview.url = preview.dataset.url;
    storage.header.preview.alt = preview.dataset.alt;

    localStorage.setItem("all", JSON.stringify(storage));
  },
};

/*-
-
-                   Preview
-
-*/
function previewImg() {
  const preview = document.getElementById("previewImg");

  const storage = JSON.parse(localStorage.getItem("all"));

  if (storage?.header?.preview) {
    preview.dataset.url = storage.header.preview.url;
    preview.dataset.alt = storage.header.preview.alt;

    imgModifier(preview, 100);
  }

  preview.addEventListener(`click`, () => {
    preview.parentNode.append(addModal(preview, "previewImg"));

    const button = document.getElementById(`button_Hotovo_previewImg`);

    button.addEventListener(
      `click`,
      () => {
        modalImgListener("previewImg", preview, 100);
      },
      { once: true }
    );

    const clearButton = document.getElementById(`clearButton_previewImg`);
    clearButtonPosition("previewImg", clearButton);
    clearButton.addEventListener("click", () => {
      clearButtonFunction("previewImg", `urlImg`, `altImg`);
    });
  });
}

previewImg();
