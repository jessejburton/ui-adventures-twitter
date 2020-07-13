const follow_buttons = document.querySelectorAll(".btn--follow")

follow_buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    toggleFollow(btn);
  })
  if (btn.classList.contains("following")) {
    follow(btn)
  }
})

function toggleFollow(btn) {
  let is_following = btn.classList.contains("following");
  is_following ? unfollow(btn) : follow(btn)
}

function unfollow(btn) {
  btn.innerHTML = "Follow";
  btn.removeEventListener("mouseover", followMouseOver);
  btn.removeEventListener("mouseout", followMouseOut);
  btn.classList.remove("following")
}

function follow(btn) {
  btn.innerHTML = "Following"
  btn.addEventListener("mouseover", followMouseOver)
  btn.addEventListener("mouseout", followMouseOut)
  btn.classList.add("following")
  btn.classList.add("first")
}

function followMouseOver(e) {
  e.target.classList.remove("first")
  e.target.innerHTML = "Unfollow"
}

function followMouseOut(e) {
  e.target.innerHTML = "Following"
}

const popup = document.querySelector("#popup")
const profile_images = document.querySelectorAll(".profile-image:not(.profile-image--nohover)")

let isProfileImageHovering = false

popup.addEventListener("mouseleave", () => {
  isProfileImageHovering = false
  startHidePopup()
})
popup.addEventListener("mouseenter", () => {
  isProfileImageHovering = true
})

function placePopup(elm) {
  const elmRect = elm.getBoundingClientRect();
  const halfElmWidth = elmRect.width / 2
  const elmHeight = elmRect.height

  const popupRect = popup.getBoundingClientRect();
  const halfPopupWidth = popupRect.width / 2
  const popupHeight = popupRect.height

  const spacing = 20
  const windowHieght = window.innerHeight
  const distanceToBottom = (windowHieght - (spacing + popupRect.height + elmRect.top))
  const position = distanceToBottom > 0 ? "Below" : "Above"

  if (position === "Below") {
    popup.style.left = `${elmRect.left - halfPopupWidth + halfElmWidth}px`
    popup.style.top = `${elmRect.top + elmHeight + spacing}px`
  } else {
    console.log(elmRect.top - popupHeight)
    popup.style.left = `${elmRect.left - halfPopupWidth + halfElmWidth}px`
    popup.style.top = `${elmRect.top - popupHeight - spacing}px`
  }

  showPopup()
}

function hidePopup() {
  popup.style.opacity = 0
  popup.style.pointerEvents = "none"
}

function showPopup() {
  popup.style.opacity = 1
  popup.style.pointerEvents = "all"
}

function startHidePopup() {
  if (isProfileImageHovering) return
  setTimeout(() => {
    if (!isProfileImageHovering) {
      hidePopup()
    }
  }, 1500)
}

profile_images.forEach(img => {
  img.addEventListener("mouseenter", (e) => {
    isProfileImageHovering = true
    placePopup(e.currentTarget)
  })
  img.addEventListener("mouseleave", () => {
    isProfileImageHovering = false
    startHidePopup()
  })
})
