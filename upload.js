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
    file_name = file.name
      .replace(/\./g, "_")
      .replace(/[^\w ]+/g, "")
      .trim()
      .replace(/ /g, "_");
    var storageRef = firebase.storage().ref(uid + "/" + file_name);
    var uploadTask = storageRef.put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      null,
      null,
      function () {
        console.log("upload complete!");
        getMeta();
      }
    );
  }
});

//Get Metadata
function getMeta() {
  var storageRef = firebase.storage().ref(uid + "/" + file_name);
  storageRef
    .getMetadata()
    .then((metadata) => {
      console.log("Got Meta succesfully");
      file_type = metadata.contentType;
      tags = filterTags(tags);
      writeUserData(uid, file_type, file_name, tags);
    })
    .catch((error) => {
      console.log("Error: Error getting Metadata " + error);
    });
}

// Write in Realtime Database
function writeUserData(userId, filetype, fileName, tags) {
  // fileName = firebase
  var name = fileName
    .replace(/\./g, "_")
    .replace(/[^\w ]+/g, "")
    .trim()
    .replace(/ /g, "_");

  firebase
    .database()
    .ref("users/" + userId + "/" + name)
    .set({
      file_type: filetype,
      tags: tags,
    });
}

//Tags related things

function filterTags(tags) {
  var filteredTags = [];
  for (var i = 0; i < tags.length; i++) {
    filteredTags.push(tags[i].text);
  }
  console.log(filteredTags);
  return filteredTags;
}

[].forEach.call(document.getElementsByClassName("tags-input"), (el) => {
  let hiddenInput = document.createElement("input"),
    mainInput = document.createElement("input");

  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", el.getAttribute("data-name"));

  mainInput.setAttribute("type", "text");
  mainInput.classList.add("main-input");

  mainInput.addEventListener("input", () => {
    mainInput.addEventListener("keydown", (e) => {
      let keyCode = e.which || e.keyCode;
      if (keyCode == 13) {
        let tag = mainInput.value;
        if (tag.length > 0) {
          addTag(tag);
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
    filterTags(tags);
  }

  function removeTag(index) {
    let tag = tags[index];
    tags.splice(index, 1);
    el.removeChild(tag.element);
    refreshTags();
    filterTags(tags);
  }

  function refreshTags() {
    let tagsList = [];
    tags.forEach((t) => {
      tagsList.push(t.text);
    });
    hiddenInput.value = tagsList.join(",");
  }
});
