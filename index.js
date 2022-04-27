
let $start = document.querySelector('#start') // кнопка старт
let $game = document.querySelector('#game') // поле игры
let $time = document.querySelector('#time') // таймер
let $timeHeader = document.querySelector('#time-header') // заголовок с таймером
let $resultHeader = document.querySelector('#result-header') //заголовок со счетом
let $result = document.querySelector('#result') // результат
let $gameTime = document.querySelector('#game-time') // инпут со временем 

let colors = ['#6C5B7B', '#355C7D', '#C06C84', '#bc4e9c', '#40E0D0', '#FF8C00', '#108dc7', '#ef8e38', 
'#6A82FB', '#FC5C7D', '#c94b4b', '#4b134f']
let score = 0
let isGameStarted = false

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}


$start.addEventListener('click', startGame)
$game.addEventListener('click', hendelBoxClick)
$gameTime.addEventListener('input', setGameTime)

function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', true)
  isGameStarted = true
  console.log('start');
  hide($start)
  
  $game.style.backgroundColor = '#ffffff'

  //генерация таймера
  let interval = setInterval(function () {
    let time = parseFloat($time.textContent)

    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1) // tofixed приведет число к формату до одного знака
    }

  }, 100)

  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  hide($resultHeader)
  show($timeHeader)
}

// завершает игру
function endGame() {
  isGameStarted = false
  setGameScore()
  $gameTime.removeAttribute('disabled', true)
  show($start)
  hide($timeHeader)
  show($resultHeader)
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
}

function hendelBoxClick(event) {
  if (!isGameStarted) {
    return
  }

  if (isGameStarted) {
    //  дадасет проверит наличие атрибута дата у элемента
    if (event.target.dataset.box) {
      renderBox() // если есть атрибут бокс то будем заного генерировать квадрат при клике 
      score++
    }
  }
}

// генерируем квадрат
function renderBox () {
  $game.innerHTML = '' //обнуляет поле гейм что бы ушел предидущий квадрат
  let box = document.createElement('div') // создает див
  let boxSize = getRandom(30, 100)

  //вычисляем значение поля гейм 
  // нам нужно получить из него высоту и ширину поля
  let gameSize = $game.getBoundingClientRect()
  console.log(gameSize);

  // вычисляем максимальное откланение по высоте и по ширине
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize

  let randomColorIndex = getRandom(0, colors.length)

  box.style.height = box.style.width = boxSize + 'px' 
  box.style.backgroundColor = colors[randomColorIndex]
  box.style.position = 'absolute'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')
  
  //помещаем бокс внутрь гейма 
  $game.insertAdjacentElement('afterbegin', box)
}

// возращает какое-то рандомное число в заданном диапазоне
function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}