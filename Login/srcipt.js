
const logi = document.getElementById('useremail');
const logiBut = document.getElementById('loginBut');

logiBut.addEventListener('click', () => {
if (!logi.value) {
alert('Email Is Required');
logi.value = "";
} else {
var ans = logi.value;
if (ans.length < 4) {
  alert('Invalid Email');
  logi.value = ""; 
} else {
  if (/\.com$/i.test(ans)) {
    
  } else {
      alert('Invalid email');
      logi.value = ""; 
  }
}
}
});

