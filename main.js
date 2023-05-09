const infoDisplay = document.querySelector("#info")
const restartBtn = document.querySelector("#restart-btn")

let go = "circle"

infoDisplay.textContent = "Circle Go First"

const boxElements = document.querySelectorAll(".box")

for (let i = 0; i < boxElements.length; i++) {
  boxElements[i].setAttribute("id", i)
  boxElements[i].addEventListener("click", addGo)
}

function addGo(e) {
  const goDisplay = document.createElement("div")
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === "circle" ? "cross" : "circle" // if go equals deeply equals the string circle and that condition is true we want to change it to cross, otherwise, if it is not then we want to set it to circle.
  infoDisplay.textContent = "It's Now" + " " + go + " " + "'s Turn"
  e.target.removeEventListener("click", addGo)
  checkScore()
}

function checkScore() {
  const allBoxes = document.querySelectorAll(".box")
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  let isGameFinished = false

  winningCombinations.forEach(Array => {
    let circleWins = Array.every(cell =>
      allBoxes[cell].firstChild?.classList.contains("circle"))

    if (circleWins) {
      infoDisplay.textContent = "Circle WINS!"
      isGameFinished = true
    }
  })

  winningCombinations.forEach(Array => {
    let crossWins = Array.every(cell =>
      allBoxes[cell].firstChild?.classList.contains("cross"))

    if (crossWins) {
      infoDisplay.textContent = "Cross WINS!"
      isGameFinished = true
    }
  })

  if (!isGameFinished) {
    let isBoardFull = true

    for (let i = 0; i < allBoxes.length; i++) {
      if (!allBoxes[i].firstChild) {
        isBoardFull = false
        break
      }
    }

    if (isBoardFull) {
      infoDisplay.textContent = "No One WINS!"
      isGameFinished = true
    }
  }

  if (isGameFinished) {
    boxElements.forEach((box) => {
      box.removeEventListener("click", addGo)
    })

    restartBtn.style.display = "block"
    restartBtn.addEventListener("click", restartGame)
  }
}

function restartGame() {
  const allBoxes = document.querySelectorAll(".box")
  
  for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].innerHTML = ""
    allBoxes[i].addEventListener("click", addGo)
  }
  
  go = "circle"
  infoDisplay.textContent = "Circle Go First"
  restartBtn.style.display = "none"
}
