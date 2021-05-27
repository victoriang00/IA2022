var database = firebase.database();

var uid = "default";
var file = null;
var file_name = "default_name";
var file_type = "default_type";
var tags = [];
checkAuthState();

function checkAuthState() {
  firebase.auth().onAuthStateChanged((user) => {
    console.log("user is logged in");
    if (user) {
      console.log(user);
      uid = user.uid;
    } else {
      console.log("user not logged in");
      alert("Error: User not signed in, please sign in to upload");
    }
  });
}
document.querySelector(".myFile").addEventListener("change", (e) => {
  file = e.target.files[0];
  checkAuthState();
});

document.getElementById("uploadB").addEventListener("click", () => {
  if (file == null) {
    alert("Error: no file has been attached");
  } else {
    var storageRef = firebase.storage().ref(uid + "/" + file.name);
    storageRef.put(file);
    console.log("Success");
  }
});

// Write in Realtime Database
function writeUserData(userId, filetype, fileName, tags) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      file_type: filetype,
      file_name: fileName,
      tags: tags,
    });
}
//Get Metadata
function getMeta() {
  var storageRef = firebase.storage().ref(uid + "/" + file.name);

  storageRef
    .getMetadata()
    .then((metadata) => {
      console.log(metadata);
      console.log(metadata.name);
      console.log(metadata.contentType);
      console.log(tags.text);
      //       file_nume = metadata.getAttribute.
      //       var file_name = "default_name";
      // var file_type = "default_type";
      // var tags = [];
    })
    .catch((error) => {
      console.log("Error: Error getting Metadata");
    });
}
//Tags related things
[].forEach.call(document.getElementsByClassName("tags-input"), (el) => {
  let hiddenInput = document.createElement("input"),
    mainInput = document.createElement("input");

  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", el.getAttribute("data-name"));

  mainInput.setAttribute("type", "text");
  mainInput.classList.add("main-input");
  // CHNGE THIS LATER SO THAT IT WORKS WHEN YOU PESS ENTER
  mainInput.addEventListener("input", () => {
    mainInput.addEventListener("keydown", (e) => {
      let keyCode = e.which || e.keyCode;
      if (keyCode == 13) {
        let tag = mainInput.value;
        if (tag.length > 0) {
          addTag(tag);
          // writeUserData(uid, filetype, fileName, tags);
          console.log("tag");
        }
      }
    });
  });
  mainInput.addEventListener("keydown", (e) => {
    let keyCode = e.which || e.keyCode;
    if (keyCode == 8 && mainInput.value.length === 0 && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  });

  el.appendChild(mainInput);
  el.appendChild(hiddenInput);
  addTag("tester");

  function addTag(text) {
    let tag = {
      text: text,
      element: document.createElement("span"),
    };
    tag.element.classList.add("tag");
    tag.element.textContent = tag.text;

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    tag.element.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
      removeTag(tags.indexOf(tag));
    });

    tags.push(tag);
    el.insertBefore(tag.element, mainInput);
    mainInput.value = "";
    refreshTags();
    getTags();
  }

  function removeTag(index) {
    let tag = tags[index];
    tags.splice(index, 1);
    el.removeChild(tag.element);
    refreshTags();
    getTags();
  }

  function refreshTags() {
    let tagsList = [];
    tags.forEach((t) => {
      tagsList.push(t.text);
    });
    hiddenInput.value = tagsList.join(",");
  }

  function getTags() {
    console.log(tags);
  }
});
