input.onButtonPressed(Button.A, function () {
    customMaqueen.setMaqueenRotateSpeed(40)
})
input.onButtonPressed(Button.B, function () {
    customMaqueen.maqueenStopRotate()
})
customMaqueen.maqueenRotate(SmerOkretanja.Levo, SmerKretanja.Napred, 34)
