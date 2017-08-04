// const OTP = require('./otp')
// const QRCode = require('./vendor/qrcode.min')

/**
 * App controller
 */

/** Register service worker if compatable with current browser */
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js').catch(console.error);
}

// var generator = new OTP(secret)
var qrcode = new QRCode(document.getElementById("qrcode"), {
  correctLevel : QRCode.CorrectLevel.H,
  width: 250,
  height: 250
})

document.addEventListener("DOMContentLoaded", function(){
  // Use var for these variables, since we want them in the global scope.
  var secret = OTP.getRandomInt(0, Math.pow(10, 12))

  // Show default generated secret value in UI
  setSecret(secret)

  let numberElement = document.getElementById('number')
  let timeElement = document.getElementById('time')

  setInterval(() => {
      // Update time and value every second
      let date = new Date();
      timeElement.textContent = date.toLocaleString();
      numberElement.textContent = generator.getTOTP()
  }, 1000)
})

function randomizeSecret () {
  secret = OTP.getRandomInt(0, Math.pow(10, 12))
  setSecret(secret)
}

function setSecret (newSecret) {
  generator = new OTP(secret)
  document.getElementById('secret').value = secret
  setQRCode(generator)
}

function setQRCode (generator, label = 'test') {
  secretb32 =  generator.getBase32Secret()
  let qrContent = `otpauth://totp/${label}?secret=${secretb32}`
  console.log(qrContent)
  qrcode.clear()
  qrcode.makeCode(qrContent)
}

function setSecret (newSecret) {
  let secretInput = document.getElementById('secret')
  if (!newSecret) {
    newSecret = secretInput.value
  }

  newSecret = String(newSecret)

  try {
    generator = new OTP(newSecret)
    secret = newSecret
    setQRCode(generator)
  } catch (err) {
    console.error(err.message)
  }

  secretInput.value = secret
}