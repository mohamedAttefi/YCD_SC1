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
let Role = null;
let container = null;
let roles = null;
let worker = null;

let workersArr = localStorage.getItem("workers")
  ? JSON.parse(localStorage.getItem("workers"))
  : [];

let ctr = 1;
let x = 0;

function ShowPopUp() {
  popupContainer.classList.remove("hidden");
}

function AddWorker() {
  worker = {
    Nom: nom.value,
    Email: Email.value,
    Role: role.value,
    Image: source.value,
    Telephone: Telephone.value,
    isAssigned : false,
    experiences: [],
  };

  let content = `
    <div class='workerCard flex p-2 rounded shadow-[0px_0px_4px_rgb(0,0,0,0.5)] w-[95%] gap-2 self-center'>
        <div class='w-[10vh] h-[10vh] flex items-center rounded justify-center overflow-hidden'>
            <img src='${worker.Image}' alt='${worker.Nom} image'>  
        </div>
        <div class=''>
            <p class='font-semibold text-sm'>${worker.Nom}</p>
            <p class='text-xs role'>${worker.Role}</p>
            <p class='text-xs'>${worker.Email}</p>
        </div>
    </div>`;

  workersContainer.innerHTML += content;

  let dateDebut = document.querySelectorAll(".debut");
  let dateFin = document.querySelectorAll(".fin");
  let Entreprise = document.querySelectorAll(".Entreprise");

  if (dateDebut && dateFin && Entreprise) {
    for (let i = 0; i < dateDebut.length; i++) {
      worker.experiences.push({
        dateDeDebut: dateDebut[i].value,
        dateDeFin: dateFin[i].value,
        Entreprise: Entreprise[i].value,
      });
    }
  }

  workersArr.push(worker);

  closePopup();

  console.log(workersArr);
  ctr = 1;
}

function closePopup() {
  popupContainer.classList.add("hidden");
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
  experienceContainer.innerHTML = "";
}
closeX.addEventListener("click", () => myfunc());

function myfunc() {
  addPopupContainer.classList.add("hidden");
  console.log(addPopupContainer.classList);
  cardsContainer.innerHTML = "";
}

function AddExperience() {
  experienceContainer.classList.remove("hidden");
  let content = `<div class='w-full h-full  flex flex-col justify-center items-center '>
  <h1 class="text-lg font-bold">Experience${ctr}</h1>
            <div class=" w-[80%] h-[15vh] flex flex-col gap-5">
                <label for="debut">Date de debut</label>
                <input type="date" name="debut" id="debut"
                    class="debut p-2 bg-gray-100 border-[1px] rounded-lg border-gray-700  w-full">
            </div>
            <div class=" w-[80%] h-[15vh] flex flex-col gap-5">
                <label for="fin">Date de fin</label>
                <input type="date" name="fin" id="fin"
                    class="fin p-2 bg-gray-100 border-[1px] rounded-lg border-gray-700  w-full">
            </div>
            <div class=" w-[80%] h-[15vh] flex flex-col gap-5">
                <label for="Entreprise">Entreprise</label>
                <input type="text" id="Entreprise" name="Entreprise" class="Entreprise p-2 bg-gray-100 border-[1px] rounded-lg border-gray-700  w-full">
            </div>
            <p class="self-end justify-self-end text-red-700 font-bold suprimer">Suprimmer</p>
  </div>`;
  experienceContainer.innerHTML += content;
  let supprimer = document.querySelectorAll(".suprimer");
  ctr++;
  supprimer.forEach((e) => {
    e.addEventListener("click", () => {
      ctr--;
      e.parentElement.remove();
      if (experienceContainer.innerHTML == "")
        experienceContainer.classList.add("hidden");
    });
  });
}
function addToArea(AllowedRoles, className) {
  currentAllowedRoles = AllowedRoles;
  currentContainer = document.querySelector(`.${className}`);
  currentWorkers = document.querySelectorAll(".workerCard");

  addPopupContainer.classList.remove("hidden");

  currentWorkers.forEach((worker) => {
    Role = worker.querySelector(".role").textContent;
    console.log(Role);
    console.log(roles);
    
    if (currentAllowedRoles.includes(Role)) {
      cardsContainer.innerHTML += worker.outerHTML;
    }


    addPopupContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("workerCard")) {
        selected = e.target;
        selected.classList.remove("bg-white");
        selected.classList.add("bg-gray-300");
        console.log(selected.children[1].children[0].textContent);
      }
    });
  });
  unassignBtns = document.querySelectorAll('unassign')
  unassignBtns.forEach((btn)=>{
  btn.addEventListener('clock', ()=>{
    console.log(btn.parentElement)
  })
})
}

Add.addEventListener("click", () => {
  if (!currentWorkers || !currentAllowedRoles) return;

  let currenrWorker = getWhoMatchesTheRole(currentWorkers, currentAllowedRoles);
  if (!worker) return;

  currenrWorker.remove();
  isAssigned = true;
   worker = {
    ...worker,
    isAssigned: true
  }
  console.log(workersArr);
  let content = `
    <div class='bg-white workerCard flex items-center relative p-2 rounded h-fit shadow-[0px_0px_5px_black] w-[40%] gap-2'>
      <p class='text-black text-xs font-light'>${currenrWorker.children[1].children[0].textContent}</p>
      <p class="absolute right-1 text-sm" id='unassign'>❌</p>
    </div>
  `;
  currentContainer.innerHTML += content;
  myfunc();
  getWhatShouldBeAssigned([securiteContainer, archiveContainer, receptionContainer, serveurContainer])
  getWhosAssigned()
  
});

function getWhoMatchesTheRole(who, arr) {
  for (const e of who) {
    if (arr.includes(e.querySelector(".role").textContent)) {
      return e;
    }
  }
  return null;
}



function getWhosAssigned(){
  if(worker.isAssigned){
    console.log('hello')
    return
  }
}


