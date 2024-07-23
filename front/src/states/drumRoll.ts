import timpaniRollSound from '../assets/SE/timpani_roll.mp3'
import rollCloseSound from '../assets/SE/roll_close.mp3'

const drumAudio = new Audio(timpaniRollSound)
drumAudio.volume = 0.8

/*
* ドラムロール
* */
export function startDrumRoll() {
  drumAudio.play().then()
}

export function stopDrumRoll() {
  drumAudio.pause()
  drumAudio.currentTime = 0

  playCymbal()
}

/*
* シンバル
* */
function playCymbal() {
  const cymbalAudio = new Audio(rollCloseSound)
  cymbalAudio.volume = 0.8
  cymbalAudio.play().then()
}