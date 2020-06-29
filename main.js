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
  btn.classList.remove("following");
}

function follow(btn) {
  btn.innerHTML = "Following";
  btn.addEventListener("mouseover", followMouseOver)
  btn.addEventListener("mouseout", followMouseOut)
  btn.classList.add("following");
  btn.classList.add("first");
}

function followMouseOver(e) {
  e.target.classList.remove("first");
  e.target.innerHTML = "Unfollow";
}

function followMouseOut(e) {
  e.target.innerHTML = "Following";
}