const addTeamBtn = document.querySelector(".btn-add");
const inputEl = document.querySelector("#team-name");
const restartBtn = document.querySelector(".restart-btn");

const openModal = document.querySelector(".modal-message");

const teamList = document.querySelectorAll(".team-listed");

const teams = [];
let index = 0;

restartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    randomPowerValue();
    cleanAllField();
});

//EVENTS:
addTeamBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const teamName = inputEl.value;
    const isInputValid = /[a-zA-Z]/.test(teamName);

    const messageError = document.querySelector(".message-error");

    if (teamName.length > 0) {
        if (isInputValid && teamName.length < 10) {
            const nameOfTeamValue = teamList[index].children[0].lastElementChild;
            const powerOfTeamValue = teamList[index].children[1].lastElementChild;

            nameOfTeamValue.textContent = teamName;

            let randomValueOfPower = Math.random() * 100 + 1;
            powerOfTeamValue.textContent = parseInt(randomValueOfPower);
            let teamPower = powerOfTeamValue.textContent;

            index++;
            teams.push({ teamName, teamPower, trophies: 0 });
            refreshInput();

            if (index >= 4) {
                setTimeout(fillOutField, 1000);
            } else {
                return;
            }
        } else {
            messageError.classList.remove("hide");
            inputEl.classList.add("error");
            messageError.textContent = `Insira um nome de time válido!`;
            setTimeout(() => {
                messageError.classList.add("hide");
                inputEl.classList.remove("error");
            }, 3000);
            refreshInput();
        }
    } else {
        messageError.classList.remove("hide");
        inputEl.classList.add("error");
        messageError.textContent = `Favor, preencha o campo antes de adicionar...`;
        setTimeout(() => {
            messageError.classList.add("hide");
            inputEl.classList.remove("error");
        }, 3000);
        refreshInput();
    }

    fillOutTeamsTrophies(teams);
});

function refreshInput() {
    inputEl.value = "";
}

function randomPowerValue() {
    for (let i = 0; i < teams.length; i++) {
        let randomValue = Math.random() * 100 + 1;
        teams[i].teamPower = parseInt(randomValue);
    }

    for (let i = 0; i < teamList.length; i++) {
        const fillOutPower = teamList[i].children[1].lastElementChild;
        fillOutPower.textContent = teams[i].teamPower;
    }
}

function fillOutTeamsTrophies(teamsObject) {
    const allTrophiesOfTheTeam = document.querySelectorAll(".team-trophy-info");

    for (let i = 0; i < teams.length; i++) {
        allTrophiesOfTheTeam[i].children[1].textContent = teams[i].trophies;
    }
}

function addingTrophies(winner) {
    console.log(winner);

    for (let i = 0; i < teams.length; i++) {
        if (teams[i].teamName === winner) {
            teams[i].trophies++;
        }
        fillOutTeamsTrophies(teams);
    }
}

function fillOutField() {
    const firstStageAllItems = document.querySelectorAll(".first-stage .box-items");

    const firstMatch = firstStageAllItems[0].children;
    const secondMatch = firstStageAllItems[1].children;

    const allMatches = [...firstMatch, ...secondMatch];

    for (let i = 0; i < allMatches.length; i++) {
        allMatches[i].firstElementChild.textContent = teams[i].teamName;
    }
    secondStageMatch();
}

function secondStageMatch() {
    const secondStageItems = document.querySelectorAll(".second-stage .item");

    let firstMatchCheck;
    let firstResult = teams[0];

    if (firstResult.teamPower > teams[1].teamPower) {
        firstMatchCheck = firstResult;
    } else {
        firstMatchCheck = teams[1];
    }

    let secondResult = teams[2];
    let secondMatchCheck;

    if (secondResult.teamPower > teams[3].teamPower) {
        secondMatchCheck = secondResult;
    } else {
        secondMatchCheck = teams[3];
    }

    const firstTeamClassified = secondStageItems[0].children;
    const secondTeamClassified = secondStageItems[1].children;

    setTimeout(() => {
        firstTeamClassified[0].textContent = firstMatchCheck.teamName;
        secondTeamClassified[0].textContent = secondMatchCheck.teamName;
    }, 1500);

    teamWinner(firstMatchCheck, secondMatchCheck);
}

function teamWinner(firstFinalist, secondFinalist) {
    const winnerBox = document.querySelector(".final-stage .item");
    // console.log("Testando finalistas: ", firstFinalist, secondFinalist);

    let winner;

    if (firstFinalist.teamPower > secondFinalist.teamPower) {
        winner = firstFinalist;
    } else {
        winner = secondFinalist;
    }

    setTimeout(() => {
        winnerBox.firstElementChild.textContent = winner.teamName;
        addingTrophies(winner.teamName);

        for (let i = 0; i < teams.length; i++) {
            if (teams[i].trophies === 5) {
                openModal.classList.remove("hide");
                modalWithWinnerMessage(teams[i].teamName);
                console.log(teams[i].teamName);
            }
        }
    }, 3000);
}

function cleanAllField() {
    const firstStageAllItems = document.querySelectorAll(".first-stage .box-items");
    const secondStageItems = document.querySelectorAll(".second-stage .item");
    const winner = document.querySelector(".final-stage .item");

    const firstMatch = firstStageAllItems[0].children;
    const secondMatch = firstStageAllItems[1].children;

    const allMatches = [...firstMatch, ...secondMatch];

    for (let i = 0; i < allMatches.length; i++) {
        allMatches[i].firstElementChild.textContent = "";
    }

    secondStageItems[0].children[0].textContent = "";
    secondStageItems[1].children[0].textContent = "";

    winner.firstElementChild.textContent = "";

    randomPowerValue();
    setTimeout(fillOutField, 1500);
}

function modalWithWinnerMessage(teamWinner) {
    const openModal = document.querySelector(".modal-message");
    const modalTitle = openModal.querySelector(".modal-message-title");
    const btnRestartAllGame = openModal.querySelector(".restart-game");
    const closeIcon = openModal.querySelector(".modal-message i");

    closeIcon.addEventListener("click", () => openModal.classList.add("hide"));

    modalTitle.textContent = `O time vencedor foi: ${teamWinner}`;

    btnRestartAllGame.addEventListener("click", () => {
        const removeAllTeamsCards = document.querySelectorAll(".list-of-teams .team-listed");

        for (let i = 0; i <= 3; i++) {
            removeAllTeamsCards[i].remove();
        }
        //code to do...
    });
}
