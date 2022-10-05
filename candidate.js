class Candidator {
    constructor(id, gender, age, education, resumeScore, videoScore, avatar, name, status) {
        this.id = id;
        this.gender = gender;
        this.age = age;
        this.education = education;
        this.resumeScore = resumeScore;
        this.videoScore = videoScore;
        this.avatar = avatar;
        this.name = name;
        this.status = status
    }
}
const candidate_key = "candidate_app";
var candidators = [];
var page_size = 4;
var total_pages = 0;
var page_number = 1;

// var cart = [];

function init() {
    if (window.localStorage.getItem(candidate_key) == null) {
        candidators = [
            new Candidator(1, true, 18, "University", 70.5, 95, "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1200.jpg", "Nguyên Nguyễn", "Finished"),
            new Candidator(3, false, 20, "University", 75.5, 85, "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/3.jpg", "Nhàn Hoàng", "Finished"),
            new Candidator(4, true, 21, "Colleague", 65.5, 65, "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/13.jpg", "Toàn Trương", "Finished"),
            new Candidator(7, true, 25, "Colleague", 85.5, 55, "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/33.jpg", "Long Trần", "Finished"),
        ]
        window.localStorage.setItem(candidate_key, JSON.stringify(candidators));
    }
    else {
        candidators = JSON.parse(window.localStorage.getItem(candidate_key));
    }
}

function renderCandidate() {
    let data = candidators.slice((page_size * (page_number - 1)), (page_size * page_number));
    let htmls = data.map(function (can) {
        return `
            <tr ondblclick="editCandidate(${can.id})">
                <td class="fw-bolder">${can.gender ? "M" : "F"}</td>
                <td>${can.age}</td>
                <td>${can.education}</td>
                <td class="fw-bolder text-right">${can.resumeScore}</td>
                <td class="fw-bolder text-right">${can.videoScore}</td>
                <td>
                    <div class="candidate-avatar">
                        <img class="avatar-sm" src="${can.avatar}" alt="">
                        <h3>${can.name}</h3>
                    </div>
                </td>
                <td>
                    <span class="status">${can.status}</span>
                </td>
                <td>
                    <span class="times" onclick='removeCandidator(${can.id})' >&times;</span>
                </td>
            </tr>
        `
    })
    document.getElementById('tbCandidate').innerHTML = htmls.join("");
    buildPagination();
    // calculator();
}

// function calculator(){
//     let totalResumeScore = 0;
//     let totalVideoScore = 0;
//     for(let can of candidators){
//         totalResumeScore += can.resumeScore;
//         totalVideoScore += can.videoScore;
//     }
//     document.getElementById('sumResumeScore').innerHTML = totalResumeScore;
//     document.getElementById('sumVideoScore').innerHTML = totalVideoScore;
// }

// <span class="plus" onclick='addToCart(${can.id})' >&plus;</span>

// function addToCart(canId){
//     let candidator = candidators.find(function(can){
//         return can.id == canId;
//     })
//     cart.push(candidator);
//     document.querySelector('.heading-2>span').innerHTML = `(${cart.length})`;
// }

function saveCandidator() {
    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let gender = Boolean(document.getElementById("gender").value);
    let education = document.getElementById("education").value;
    let resumeScore = Number(document.getElementById("resumeScore").value);
    let videoScore = Number(document.getElementById("videoScore").value);
    let avatar = document.getElementById("avatar").value;
    let status = document.getElementById("status").value;
    let id = findMaxId() + 1;

    let candidator = new Candidator(id, gender, age, education, resumeScore, videoScore, avatar, name, status);
    candidators.push(candidator);

    window.localStorage.setItem(candidate_key, JSON.stringify(candidators));

    renderCandidate();

    resetForm()
}

function resetForm() {
    document.getElementById("candidateId").value = "0";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "0";
    document.getElementById("education").value = "";
    document.getElementById("resumeScore").value = "";
    document.getElementById("videoScore").value = "";
    document.getElementById("avatar").value = "";
    document.getElementById("status").value = "0";

    document.getElementById('btnCreate').classList.remove('d-none');
    document.getElementById('btnUpdate').classList.add('d-none');
}

function findMaxId() {
    let max = 0;
    for (let can of candidators) {
        if (can.id > max) {
            max = can.id
        }
    }
    return max;
}

function removeCandidator(candidatorId) {
    let confirm = window.confirm("Are you sure to remove this candidator?");
    if (confirm) {
        let index = candidators.findIndex(function (can) {
            return can.id == candidatorId;
        })
        candidators.splice(index, 1);

        window.localStorage.setItem(candidate_key, JSON.stringify(candidators));

        renderCandidate();
    }
}

function editCandidate(candidatorId) {
    let candidator = candidators.find(function (can) {
        return can.id == candidatorId;
    })

    document.getElementById("candidateId").value = candidator.id;
    document.getElementById("name").value = candidator.name;
    document.getElementById("age").value = candidator.age;
    document.getElementById("gender").value = candidator.gender;
    document.getElementById("education").value = candidator.education;
    document.getElementById("resumeScore").value = candidator.resumeScore;
    document.getElementById("videoScore").value = candidator.videoScore;
    document.getElementById("avatar").value = candidator.avatar;
    document.getElementById("status").value = candidator.status;


    document.getElementById('btnCreate').classList.add('d-none');
    document.getElementById('btnUpdate').classList.remove('d-none');
}

function updateCandidator() {
    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let gender = Boolean(document.getElementById("gender").value);
    let education = document.getElementById("education").value;
    let resumeScore = Number(document.getElementById("resumeScore").value);
    let videoScore = Number(document.getElementById("videoScore").value);
    let avatar = document.getElementById("avatar").value;
    let status = document.getElementById("status").value;
    let id = document.getElementById("candidateId").value;

    let currentCandidator = candidators.find(function (can) {
        return can.id == id;
    })

    currentCandidator.name = name;
    currentCandidator.age = age;
    currentCandidator.gender = gender;
    currentCandidator.education = education;
    currentCandidator.resumeScore = resumeScore;
    currentCandidator.videoScore = videoScore;
    currentCandidator.avatar = avatar;
    currentCandidator.status = status;

    window.localStorage.setItem(candidate_key, JSON.stringify(candidators));

    renderCandidate();
    resetForm();
}

function ascending(field) {
    candidators.sort(function (can_1, can_2) {
        // return can_1[field] - can_2[field];
        if (can_1[field] > can_2[field]) {
            return 1;
        }
        if (can_1[field] < can_2[field]) {
            return -1;
        }
        return 0;
    })
    renderCandidate();
}
function descending(field) {
    candidators.sort(function (can_1, can_2) {
        // return can_2[field] - can_1[field];
        if (can_2[field] > can_1[field]) {
            return 1;
        }
        if (can_2[field] < can_1[field]) {
            return -1;
        }
        return 0;
    })
    renderCandidate();
}


function buildPagination() {
    total_pages = Math.ceil(candidators.length / page_size);
    let paginationString = "";
    let start = page_number == 1 ? 1 : page_number == total_pages ? page_number - 2 : page_number - 1;
    let end = page_number == total_pages ? total_pages : page_number == 1 ? page_number + 2 : page_number + 1;
    paginationString += `<li class="page-item"><button onclick='changePage(1)'>&#x25C0;</button></li>`;
    for (let page = start; page <= end; page++) {
        paginationString += `<li class="page-item">
                                    <button class='${page == page_number ? 'active' : ''}'
                                        onclick='changePage(${page})'>
                                ${page}</button></li>`
    }
    paginationString += `<li class="page-item"><button onclick='changePage(${total_pages})'>&#x25B6;</button></li>`;
    document.getElementById('pagination').innerHTML = paginationString;
}


function changePage(page) {
    page_number = page;
    renderCandidate();
}
function ready() {
    init();
    renderCandidate();
}

ready();