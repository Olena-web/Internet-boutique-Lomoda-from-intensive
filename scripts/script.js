const headerCityButton = document.querySelector(".header__city-button");
console.log("headerCityButton:", headerCityButton);

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

const getGoods = (callback) => {
  getData()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      console.error(err);
    });
};
getGoods((data) => {
  console.warn(data);
});
