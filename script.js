let popupContainer = document.querySelector(".popup-container");
let Email = document.getElementById("Email");
let Telephone = document.getElementById("Telephone");
let role = document.getElementById("role");
let source = document.getElementById("source");
let nom = document.getElementById("nom");
let workersContainer = document.querySelector(".workersContainer");
let addPopup = document.querySelector(".addPopup");
let addPopupContainer = document.querySelector(".addPopupContainer");
let Add = document.querySelector(".Add");
let serveurContainer = document.querySelector(".serveurContainer");
let conferenceContainer = document.querySelector(".conferenceContainer");
let receptionContainer = document.querySelector(".receptionContainer");
let archiveContainer = document.querySelector(".archiveContainer");
let securiteContainer = document.querySelector(".securiteContainer");
let personelContainer = document.querySelector(".personelContainer");
let closeX = document.querySelector(".close");
let cardsContainer = document.querySelector(".cardsContainer");
let experienceContainer = document.querySelector(".experience-container");
let selected = null;
function ShowPopUp() {
  popupContainer.classList.remove("hidden");
}

function AddWorker() {
  ShowPopUp();
  let content = `<div class='workerCard flex p-2 rounded-2xl shadow-[0px_0px_5px_] w-[95%] gap-2 self-center'>
  <div class='w-[10vh] h-[10vh] rounded-[200px] flex items-center justify-center overflow-hidden'>
    <img src='${source.value}' alt='${nom.value} image' class='w-full h-full rounded-full'>  
  </div>
  <div class=''>
    <p class='font-semibold text-sm'>${nom.value}</p>
    <p class='text-xs'>${role.value}</p>
    <p class='text-xs'>${Email.value}</p>
  </div>
  </div>`;
  workersContainer.innerHTML += content;
  closePopup();
}
function closePopup() {
  popupContainer.classList.add("hidden");
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
  experienceContainer.innerHTML = "";
}
closeX.addEventListener("click", () => {
  addPopupContainer.classList.add("hidden");
  console.log(addPopupContainer.classList);
  cardsContainer.innerHTML = "";
});

function AddExperience() {
  let content = `<h1 class="text-lg font-bold">Experience</h1>
            <div class=" w-[80%] h-[15vh] flex flex-col gap-5">
                <label for="debut">Date de debut</label>
                <input type="date" name="debut" id="debut"
                    class=" p-2 bg-gray-100 border-[1px] rounded-lg border-gray-700  w-full">
            </div>
            <div class=" w-[80%] h-[15vh] flex flex-col gap-5">
                <label for="fin">Date de fin</label>
                <input type="date" name="fin" id="fin"
                    class=" p-2 bg-gray-100 border-[1px] rounded-lg border-gray-700  w-full">
            </div>
            <div class=" w-[80%] h-[15vh] flex flex-col gap-5">
                <label for="Entreprise">Entreprise</label>
                <input type="text" id="Entreprise" name="Entreprise" class="p-2 bg-gray-100 border-[1px] rounded-lg border-gray-700  w-full">
            </div>`;
  experienceContainer.innerHTML += content;
}
function addToArea(AllowedRoles, className) {
  selected = null
  let currentArea = null;
  let workers = document.querySelectorAll(".workerCard");

  addPopupContainer.classList.remove("hidden");

  workers.forEach((worker) => {
    currentArea = document.querySelector(`.${className}`);
    console.log(currentArea.children);
    let Role = worker.children[1].children[1].textContent;
    if (AllowedRoles.includes(Role)) {
      console.log(worker.outerHTML);

      cardsContainer.innerHTML += worker.outerHTML;
      console.log(document.querySelector(".title").nextElementSibling);
      addPopupContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("workerCard")) {
          selected = e.target;
          selected.classList.remove("bg-white");
          selected.classList.add("bg-gray-300");
          console.log(selected.children[1].children[0].textContent);
        }
      });
    } else {
      cardsContainer.innerHTML = "no workers to add";
      return;
    }
    Add.addEventListener("click", () => {
      if(selected){
        worker.remove();
      let content = `<div class='bg-white workerCard flex items-center relative p-2 rounded h-fit shadow-[0px_0px_5px_black] w-[40%] gap-2'>
                    <p class='text-black text-xs font-light'>${worker.children[1].children[0].textContent}</p>
                    <p class="absolute right-1 text-sm">❌</p>
                </div>`;

      if(currentArea.innerHTML == ''){
        currentArea.innerHTML = content;
      }
      else{
        currentArea.innerHTML += content;
      }
      }
    });
  });
}
