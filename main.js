// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!


document.addEventListener("DOMContentLoaded", function(event) {
  let modalDivElement = document.getElementById("modal");
  modalDivElement.setAttribute("class", "hidden");
  function monitorLikes() {
    let likes = document.querySelectorAll(".like-glyph");
    for (let i = 0; i < likes.length; i++) {
      likes[i].addEventListener("click", (event) => {
        event.preventDefault();
        mimicServerCall()
        .then(function(response) {
          if (likes[i].textContent == EMPTY_HEART) {          
            likes[i].textContent = FULL_HEART;
            likes[i].setAttribute("class", "activated-heart")
          } else {
            likes[i].textContent = EMPTY_HEART;
            likes[i].removeAttribute("class", "activated-heart")
          }          
        })
        .catch(function(error) {
          modalDivElement.removeAttribute("class", "hidden");
          modalMsgElement = document.getElementById("modal-message");
          modalMsgElement.textContent = error;
          hideError();
        }); //end catch
      }) // end addEventListener
    } // end for
  }//end function
  
  function hideError() {
    setTimeout(function() { modalDivElement.setAttribute("class", "hidden")}, 5000);
  }
  monitorLikes();
})


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
