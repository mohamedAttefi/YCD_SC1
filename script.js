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
let assignedWorkers = [];
let ctr = 1
let workersArr = localStorage.getItem("workers")
  ? JSON.parse(localStorage.getItem("workers"))
  : [];
let assignedWorkersArr = localStorage.getItem("assigned")
  ? JSON.parse(localStorage.getItem("assigned"))
  : [];
let unassignBtns = null;
function ShowPopUp() {
  popupContainer.classList.remove("hidden");
}
function AddWorker() {
  if (
    !nom.value.match(/[a-zA-Z]{4,}$/) ||
    !Email.value.match(/^[a-zA-Z]+@gmail.com$/) ||
    !Telephone.value.match(/^0[5-7]\d{8}$/)
  ) {
    Swal.fire({
      title: "please enter valid inputs",
      icon: "warning",
      confirmButtonText: "Okay",
    }).then(() => {
      Telephone.value = "";
      source.value = "";
      role.value = "";
      Email.value = "";
      nom.value = "";
    });
    return;
  }
  let imageSrc;
  if (source.value.trim() == "") {
    imageSrc =
      "https://i.pinimg.com/736x/04/f0/63/04f0632a7360bbe60465770ba3fe50a6.jpg";
  } else {
    imageSrc = source.value;
  }
  worker = {
    id: Date.now(),
    Nom: nom.value,
    Email: Email.value,
    Role: role.value,
    Image: imageSrc,
    Telephone: Telephone.value,
    isAssigned: false,
    experiences: [],
  };
  console.log(worker);
  console.log(worker.Image);
  let content = `
    <div id='${worker.id}' onclick='displayInfo(${worker.id})' class='workerCard flex p-2 rounded shadow-[0px_0px_4px_rgb(0,0,0,0.5)] w-[95%] gap-2 self-center'>
        <div class='w-[10vh] h-[10vh] flex items-center rounded justify-center overflow-hidden'>
            <img src='${worker.Image}' alt='${worker.Nom} image'>  
        </div>
        <div class=''>
            <p class='font-semibold text-sm nom'>${worker.Nom}</p>
            <p class='text-xs role'>${worker.Role}</p>
            <p class='text-xs email'>${worker.Email}</p>
        </div>
    </div>`;

  let dateDebut = document.querySelectorAll(".debut");
  let dateFin = document.querySelectorAll(".fin");
  let Entreprise = document.querySelectorAll(".Entreprise");
  console.log(!dateDebut.value > Date.now());
  for (let i = 0; i < dateDebut.length; i++) {
    let DebutDate = new Date(dateDebut[i].value).getTime();
    let FinDate = new Date(dateDebut[i].value).getTime();
    console.log(DebutDate > Date.now());
    console.log(DebutDate > FinDate);

    if (DebutDate > Date.now() || FinDate > dateFin.value) {
      Swal.fire({
        title: "please enter valid dates",
        icon: "warning",
        confirmButtonText: "Okay",
      }).then(() => {
        Telephone.value = "";
        source.value = "";
        role.value = "";
        Email.value = "";
        nom.value = "";
      });
      return;
    }
  }
  if (dateDebut && dateFin && Entreprise) {
    for (let i = 0; i < dateDebut.length; i++) {
      worker.experiences.push({
        dateDeDebut: dateDebut[i].value,
        dateDeFin: dateFin[i].value,
        Entreprise: Entreprise[i].value,
      });
    }
  }
  console.log(workersArr);
  workersArr.push(worker);
  localStorage.setItem("workers", JSON.stringify(workersArr));
  closePopup();

  workersContainer.innerHTML += content;
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
  console.log(currentWorkers);
  console.log(currentAllowedRoles);
  addPopupContainer.classList.remove("hidden");
  currentWorkers.forEach((worker) => {
    Role = worker.querySelector(".role").textContent;
    console.log(Role);
    if (currentAllowedRoles.includes(Role)) {
      cardsContainer.innerHTML += worker.outerHTML;
    }
    addPopupContainer.querySelectorAll(".workerCard").forEach((child) => {
      child.removeAttribute("onclick");
    });
    addPopupContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("workerCard")) {
        selected = e.target;

        selected.classList.remove("bg-white");
        selected.classList.add("bg-gray-300");
        console.log(selected.children[1].children[0].textContent);
      }
    });
  });
}
Add.addEventListener("click", () => {
  console.log("xi");
  if (!currentWorkers || !currentAllowedRoles) return;
  let currentWorker = getWhoMatchesTheRole(currentWorkers, currentAllowedRoles);
  if (!currentWorker) return;
  currentWorker.classList.add("assigned");
  currentWorker.remove();
  assignedWorkers.push(currentWorker);
  let assignedWorker = workersArr.find(
    (e) => e.Nom == currentWorker.querySelector(".nom").textContent
  );
  workersArr = workersArr.filter(
    (e) => e.Nom != currentWorker.querySelector(".nom").textContent
  );
  console.log(workersArr);

  console.log(assignedWorker);
  assignedWorkersArr.push({
    ...assignedWorker,
    container: currentContainer.id,
  });
  localStorage.setItem("workers", JSON.stringify(workersArr));
  localStorage.setItem("assigned", JSON.stringify(assignedWorkersArr));
  let div = document.createElement("div");
  let content = `
      <p class='text-black text-xs font-light'>${currentWorker.children[1].children[0].textContent}</p>
      <p class="absolute right-1 text-xs unassign text-red-500">⨉</p>
  `;
  div.classList =
    "bg-white workerCard flex items-center relative p-2 h-fit w-[40%] gap-2";
  div.innerHTML = content;
  currentContainer.appendChild(div);
  myfunc();
  getWhatShouldBeAssigned([
    securiteContainer,
    archiveContainer,
    receptionContainer,
    serveurContainer,
  ]);
  Unassign();
  console.log(assignedWorkersArr);
});
function getWhoMatchesTheRole(who, arr) {
  for (const e of who) {
    if (arr.includes(e.querySelector(".role").textContent)) {
      return e;
    }
  }
  return null;
}
function getWhatShouldBeAssigned(restreintes) {
  restreintes.forEach((restreinte) => {
    if (restreinte.innerHTML == "") {
      restreinte.parentElement.classList.remove("bg-[rgb(0,0,0,0.6)]");
      restreinte.parentElement.classList.add("bg-[rgb(255,0,0,0.3)]");
    } else {
      restreinte.parentElement.classList.add("bg-[rgb(0,0,0,0.6)]");
      restreinte.parentElement.classList.remove("bg-[rgb(255,0,0,0.3)]");
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  getWhatShouldBeAssigned([
    securiteContainer,
    archiveContainer,
    receptionContainer,
    serveurContainer,
  ]);
});
function Unassign() {
  let unassignBtns = document.querySelectorAll(".unassign");
  unassignBtns.forEach((btn) => {
    btn.onclick = () => {
      let card = btn.closest(".workerCard");
      let workerName = card.querySelector("p").textContent;
      console.log(assignedWorkersArr);
      let workerObj = assignedWorkersArr.find((w) => w.Nom == workerName);
      assignedWorkersArr = assignedWorkersArr.filter(
        (w) => w.Nom != workerName
      );
      if (!workerObj) return;
      console.log(workerObj);
      workersArr.push(workerObj);

      localStorage.setItem("workers", JSON.stringify(workersArr));
      localStorage.setItem("assigned", JSON.stringify(assignedWorkersArr));

      card.remove();

      workersContainer.innerHTML += `
      <div id='${workerObj.id}' onclick='displayInfo(${workerObj.id})' class='workerCard flex p-2 rounded shadow-[0px_0px_4px_rgb(0,0,0,0.5)] w-[95%] gap-2 self-center'>
          <div class='w-[10vh] h-[10vh] flex items-center rounded justify-center overflow-hidden'>
              <img src='${workerObj.Image}' alt='${workerObj.Nom} image'>
          </div>
          <div class=''>
              <p class='font-semibold text-sm nom'>${workerObj.Nom}</p>
              <p class='text-xs role'>${workerObj.Role}</p>
              <p class='text-xs email'>${workerObj.Email}</p>
          </div>
      </div>`;
    };
  });
  getWhatShouldBeAssigned([
    securiteContainer,
    archiveContainer,
    receptionContainer,
    serveurContainer,
  ]);
}

function displayUnassigned() {
  workersArr.forEach((worker) => {
    let content = `
    <div id='${worker.id}' onclick='displayInfo(${worker.id})' class='workerCard flex p-2 rounded shadow-[0px_0px_4px_rgb(0,0,0,0.5)] w-[95%] gap-2 self-center'>
        <div class='w-[10vh] h-[10vh] flex items-center rounded justify-center overflow-hidden'>
            <img src='${worker.Image}' alt='${worker.Nom} image'>  
        </div>
        <div class=''>
            <p class='font-semibold text-sm nom'>${worker.Nom}</p>
            <p class='text-xs role'>${worker.Role}</p>
            <p class='text-xs email'>${worker.Email}</p>
        </div>
    </div>`;
    workersContainer.innerHTML += content;
    console.log(workersArr);
  });
}
displayUnassigned();
function displayAssigned(className) {
  let container = document.querySelector(`.${className}`);

  assignedWorkersArr.forEach((worker) => {
    if (worker.container == className) {
      console.log(worker);
      let div = document.createElement("div");
      let content = `
      <p class='text-black text-xs font-light'>${worker.Nom}</p>
      <p class="absolute right-1 text-xs unassign text-red-500">⨉</p>
  `;
      div.classList =
        "bg-white workerCard flex items-center relative p-2 h-fit w-[40%] gap-2";
      div.innerHTML = content;
      container.appendChild(div);
    }
  });

  Unassign();
}

displayAssigned("conferenceContainer");
displayAssigned("receptionContainer");
displayAssigned("securiteContainer");
displayAssigned("personelContainer");
displayAssigned("archiveContainer");
displayAssigned("serveurContainer");

function displayInfo(e) {
  console.log(e)
  let worker = workersArr.find((ele) => (ele.id == e));

  console.log(worker);
  let content = `
  
        <div class="flex">
            <img src="${worker.Image}" class="w-[15%]">
            <div class="w-[85%] flex flex-col">
                <h1 class="w-full text-center text-xl font-bold py-1">Worker Informations</h1>
                <div class="w-[35%] ml-3 h-[85%] flex flex-col justify-around">
                    <p><strong>Nom:</strong> ${worker.Nom}</p>
                    <p><strong>Email:</strong> ${worker.Email}</p>
                    <p><strong>Telephone:</strong> ${worker.Telephone}</p>
                    <p><strong>Role:</strong> ${worker.Role}</p>
                </div>
            </div>
        </div>
  `;
  worker.experiences.forEach((ele)=>{
    content += `
    <div class="mt-4 ml-2">
            <h1 class=" text-center font-bold text-lg">Experiences</h1>
            <div class="expContainer pl-2 w-[35vh] flex flex-col border-black border-[1px] justify-evenly h-[30vh] border-2">
                
            </div>
        </div>`
  })
  
  let div = document.createElement('div')
  div.classList = "bg-white border-2 border-black w-[60%] h-[80%] rounded"
  div.innerHTML = content
  let conatainer = document.createElement('div')
  conatainer.classList = 'backdrop-blur-[5px] absolute top-0 h-screen w-screen bg-[rgb(0,0,0,0.6)] flex items-center justify-center'
  conatainer.appendChild(div)
  document.body.appendChild(conatainer)

}
