//select elemant
var nameInput = document.getElementById("bookMarkName");
var urlInput = document.getElementById("webUrl");
var submitBtn = document.getElementById("submitBtn");
var form1 = document.getElementsByTagName("form")[0];
//container site data
var sitedataContainer = [];

if (localStorage.getItem("sitedataContainer")) {
    sitedataContainer = JSON.parse(localStorage.getItem("sitedataContainer"));
    displaySiteData(sitedataContainer);
    // var delbtn = document.querySelectorAll("[-data-index-delete-btn]");

    console.log("i have data", sitedataContainer);
} else {
    console.log("i don't data", sitedataContainer);
}

// get data
var regexCont = {
    siteName: /^[a-z1-9_/ ]{3,50}$/i,
    urlSite:
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
};
var validInput = {
    siteName: false,
    urlSite: false,
};
function validationDataSite(regexobj, elemant) {
    var eleNameAtrr = elemant.name;
    if (regexobj[eleNameAtrr].test(elemant.value)) {
        elemant.classList.add("is-valid");
        elemant.classList.remove("is-invalid");
        validInput[eleNameAtrr] = true;
    } else {
        elemant.classList.remove("is-valid");
        elemant.classList.add("is-invalid");
        validInput[eleNameAtrr] = false;
    }
}
function getDataSite() {
    var container = {
        siteName: nameInput.value,
        urlsite: urlInput.value,
    };
    return container;
}

function addSite(arrcontainer) {
    console.log("my data is valid");
    arrcontainer.push(getDataSite());
    localStorage.setItem("sitedataContainer", JSON.stringify(arrcontainer));
    console.log(JSON.parse(localStorage.getItem("sitedataContainer")));
}

// events
nameInput.addEventListener("input", function (e) {
    validationDataSite(regexCont, e.target);
});
urlInput.addEventListener("input", function (e) {
    validationDataSite(regexCont, e.target);
});
form1.addEventListener("submit", function (e) {
    e.preventDefault();
    var isHere = false;
    var arrOfindexHere;
    //! contain for search test
    for (let index = 0; index < sitedataContainer.length; index++) {
        if (
            sitedataContainer[index].siteName === nameInput.value ||
            sitedataContainer[index].urlsite === urlInput.value
        ) {
            console.log("you have the same name in index", index);
            isHere = true;
            arrOfindexHere = index;
        } else {
            console.log("no", index);
        }
    }
    if (validInput.siteName && validInput.urlSite && isHere === false) {
        addSite(sitedataContainer);
        clearInputs();
        displaySiteData(sitedataContainer);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your website has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
    } else {
        if (validInput.siteName === false && validInput.urlSite === false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "you don't Enter the Correct Name and Url",
            });
        } else if (validInput.siteName === false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Enter a valid name with 3 to 50 characters, using letters, numbers, spaces, underscores (_), or slashes (/).",
            });
        } else if (validInput.urlSite === false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Enter a valid URL starting with `http://` or `https://`, optionally with `www.`, followed by a domain name and a valid extension (e.g., `.com`, `.org`).",
            });
        } else if (isHere) {
            //! contain for search test
            Swal.fire({
                icon: "warning",
                title: `Oops...`,
                text: `The Name of site "${nameInput.value}" or the url "${
                    urlInput.value
                }" site is here!  
                in index ${arrOfindexHere + 1} in your bookmark
                `,
            });
            console.log(arrOfindexHere);
        }
    }
});
function clearInputs() {
    nameInput.value = null;
    urlInput.value = null;
    nameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
    validInput = {
        siteName: false,
        urlSite: false,
    };
}

function displaySiteData(arrOfData) {
    const tableDisplay = document.querySelector("table tbody");
    var contentDisplay = ``;
    for (let index = 0; index < arrOfData.length; index++) {
        contentDisplay += `<tr>
                    <td>${index + 1}</td>
                    <td>${arrOfData[index].siteName}</td>
                    <td>
                    <button
                        class="btn bg-success text-white"
                        id="vsBtn"><a
                            class="text-decoration-none text-white"
                            target="_blank"
                            href="${arrOfData[index].urlsite}"
                            ><i class='fa-solid fa-eye'> </i> 
                            Visit</a>
                    </button>
                    </td>
                    <td>
                        <button -data-index-delete-btn="${index}" class="btn bg-danger text-white" >
                            <i class='fa-solid fa-trash-can'></i>  Delete
                        </button>
                    </td>
                </tr>`;
    }
    tableDisplay.innerHTML = contentDisplay;
}

function deleteSiteItem(index) {
    sitedataContainer.splice(index, 1);
    localStorage.setItem(
        "sitedataContainer",
        JSON.stringify(sitedataContainer)
    );
    console.log(JSON.parse(localStorage.getItem("sitedataContainer")));
    displaySiteData(sitedataContainer);
}

// Attach event listener to the table's tbody
document.querySelector("table tbody").addEventListener("click", function (e) {
    if (e.target.hasAttribute("-data-index-delete-btn")) {
        var indexOfdeleted = e.target.getAttribute("-data-index-delete-btn");
        console.log(indexOfdeleted);
        deleteSiteItem(indexOfdeleted);
    }
    console.log(e.target);
});
