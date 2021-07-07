const headerCityButton = document.querySelector(".header__city-button");

let hash = location.hash.substring(1);

if (localStorage.getItem("lomoda-location")) {
  headerCityButton.textContent = localStorage.getItem("lomoda-location");
}
headerCityButton.addEventListener("click", () => {
  const city = prompt("Укажите Ваш город", "");
  headerCityButton.textContent = city;
  localStorage.setItem("lomoda-location", city);
});

//blocking scroll

const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  document.body.dbScrollY = window.scrollY;
  document.body.style.cssText = `
  position: fixed;
  top : ${-window.scrollY}px;
  left:0;
  width:100%;
  height: 100vh;
  overflow: hidden;
  padding-right: ${widthScroll}px;
  `;
  //document.body.style.overflow = "hidden";// don't use that
};
const enableScroll = () => {
  document.body.style.cssText = "";
  window.scroll({
    top: document.body.dbScrollY,
  });

  //document.body.style.overflow = "";// don't use that
};

//modal window
const subheaderCart = document.querySelector(".subheader__cart");
const cartOverlay = document.querySelector(".cart-overlay");

const cartModalOpen = () => {
  cartOverlay.classList.add("cart-overlay-open");
  disableScroll();
};

const cartModalClose = () => {
  cartOverlay.classList.remove("cart-overlay-open");
  enableScroll();
};

// close Esc

function closeEsc(e) {
  if (e.code === "Escape") {
    cartModalClose(e);
  }
}

// get data from server

const getData = async () => {
  const data = await fetch("db.json");
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(
      `Данные не были получены, ошибка ${data.status} ${data.statusText}`
    );
  }
};
console.log("getData(): ", getData());

// const getData2 = () => {
//   const data = fetch("db.json");
//   if (data.ok) {
//     return data.json();
//   }
// };
// console.log("getData2(): ", getData2());// undefined

const getGoods = (callback, value) => {
  getData()
    .then((data) => {
      if (value) {
        callback(data.filter((item) => item.category === value));
      } else {
        callback(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
// getGoods((data) => {
//   console.warn(data);
// });// for tests
try {
  const goodsList = document.querySelector(".goods__list");
  const goodsTitle = document.querySelector(".goods__title");

  if (!goodsList) {
    throw "This is not a goods page";
  }
  // const createCard = (data) => {
  //   const { id, preview, cost, brand, name, sizes } = data;
  // const id = data.id;
  // const preview = data.preview;
  // const cost = data.cost;
  // const brand = data.brand;
  // const name = data.name;
  // const sizes = data.sizes;
  const createCard = ({ id, preview, cost, brand, name, sizes }) => {
    const li = document.createElement("li");
    li.classList.add("goods__item");

    li.innerHTML = `
    <article class="good">
    <a class="good__link-img" href="card-good.html#${id}}">
         <img class="good__img" src="goods-image/${preview}" alt="">
    </a>
        <div class="good__description">
        <p class="good__price">${cost}&#8381;</p>
        <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
        ${
          sizes
            ? `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(
                " "
              )}</span></p>`
            : ""
        }
        <a class="good__link" href="card-good.html#${id}">Подробнее</a>
        </div>
    </article>
`;
    return li;
  };

  const renderGoodsList = (data) => {
    //goodsList.innerHTML = ""; //or
    goodsList.textContent = "";

    // for (let i = 0; i < data.length; i++) {
    //   console.log("for:", data[i]);
    // }

    // for (const item of data) {
    //   console.log("for/ of:", item);
    // }

    data.forEach((item) => {
      const card = createCard(item);
      goodsList.append(card);
    });
  };

  const setTitle = () => {
    hash = location.hash.substring(1);
    if (hash === "men") {
      goodsTitle.textContent = "Мужчинам";
    } else if (hash === "women") {
      goodsTitle.textContent = "Женщинам";
    } else if (hash === "kids") {
      goodsTitle.textContent = "Детям";
    }
  };

  window.addEventListener("hashchange", () => {
    hash = location.hash.substring(1);
    getGoods(renderGoodsList, hash);
    setTitle();
  });

  getGoods(renderGoodsList, hash);
  setTitle();
} catch (err) {
  console.warn(err);
}
