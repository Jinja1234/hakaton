function getSelectionText() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
const p = document.querySelector(".desc")


p.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    activeMenu()

    const modal = document.querySelector(".modal")

    modal.querySelector("textarea").innerHTML = getSelectionText()
})


const inputSubmit = document.querySelector("#input-submit"),
    inputAnswer = document.querySelector("#input-answer"),
    inputComment = document.querySelector("#input-comment")



const mistakes = [

]


inputSubmit.addEventListener("click", (e) => {
    e.preventDefault()

    const modal = document.querySelector(".modal")

    const elem = {
        id: mistakes.length+1,
        mistake: modal.querySelector("textarea").value,
        answer: inputAnswer.value,
        comment: inputComment.value,
    }

    p.innerHTML = p.innerHTML.replace(
        modal.querySelector("textarea").value,
        `<div class="checked" data-id=${mistakes.length+1}>${modal.querySelector("textarea").value}
                        <div>
                            <div class="mistake">
                                ${modal.querySelector("textarea").value}
                            </div>
                            <div class="answer">
                                ${inputAnswer.value}
                            </div>
                            <div class="comment">
                                 ${inputComment.value}
                            </div>
                            <div class="btns">
                                <div class="btns__item accept" data-id=${mistakes.length+1}>accept</div>
                                <div class="btns__item dismiss" data-id=${mistakes.length+1}>dismiss</div>
                            </div>
                        </div>
                    </div>`
    )
    mistakes.push(elem)
    acceptClick(mistakes)
    dismissClick(mistakes)
})



function acceptClick(mistakes) {
    const buttons = document.querySelectorAll(".accept")

    const pChecked = p.querySelectorAll(".checked")
    buttons.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.getAttribute("data-id")

            const filteredMistake = mistakes.filter(mis => mis.id === +id)

            const elem = document.createElement("span")
            elem.innerHTML = filteredMistake[0].answer

            pChecked.forEach(check => {
                const checkId = check.getAttribute("data-id")
                if (checkId === id) {
                    check.parentNode.replaceChild(elem, check)
                }
            })
        })
    })
}

function dismissClick(mistakes) {
    const buttons = document.querySelectorAll(".dismiss")

    const pChecked = p.querySelectorAll(".checked")
    buttons.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.getAttribute("data-id")

            const filteredMistake = mistakes.filter(mis => mis.id === +id)

            const elem = document.createElement("span")
            elem.innerHTML = filteredMistake[0].mistake

            pChecked.forEach(check => {
                const checkId = check.getAttribute("data-id")
                if (checkId === id) {
                    check.parentNode.replaceChild(elem, check)
                }
            })
        })
    })
}


// function createWords(text) {
//
//     const words = text.split(/\s+/g)
//
//     for (let i = 0; i < words.length; i++) {
//         if (!containsSpecialChars(words[i])) {
//             p.innerHTML += `<span class="word">${words[i]}</span>`
//         } else {
//             p.innerHTML += `<span class="character">${words[i]}</span>`
//         }
//     }
//
//     const spans = document.querySelectorAll(".word")
//     spans.forEach(item => {
//         item.addEventListener("contextmenu",() => {
//             console.log(item.innerHTML)
//             activeMenu()
//         })
//     })
//
// }

//
// function containsSpecialChars(str) {
//     const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
//
//     return specialChars.split('').some(specialChar => {
//         return !!str.includes(specialChar);
//     });
// }

function activeMenu() {
    // let e = window.event
    const modal = document.querySelector(".modal")
    modal.classList.add("active")
}

const modal = document.querySelector(".modal")


modal.addEventListener("click",(e)=>{
    if (e.target.classList.contains("modal")) {
        modal.classList.remove("active")
    }
})



// createWords(text)

