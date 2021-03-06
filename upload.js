var database = firebase.database();
var user = ["default_id", "default_name", "default_email"];

var file = null;
var file_name = "default_name";
var file_type = "default_type";
var tags = [];
var desc = "";
checkAuthState();
var allTags = getTags();

function checkAuthState() {
  firebase.auth().onAuthStateChanged((u) => {
    console.log("User details: ");
    if (u) {
      console.log(u);
      user[0] = u.uid;
      user[1] = u.displayName;
      user[2] = u.email;
    } else {
      console.log("User is currently not logged in");
      alert("Error: User not signed in, please sign in to upload");
    }
  });
}
document.querySelector(".myFile").addEventListener("change", (e) => {
  file = e.target.files[0];
  console.log("File details: ");
  console.log(file);
});

document.getElementById("uploadB").addEventListener("click", () => {
  if (file == null) {
    alert("Error: no file has been attached");
  } else {
    file_name = file.name.trim().replace(/[\.#$[\] ]+/g, "_");

    file_type = file.type.trim().replace(/[\.#$[\] ]+/g, "_");

    var storageRef = firebase.storage().ref(file_type + "/" + file_name);
    var uploadTask = storageRef.put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      null,
      null,
      function () {
        console.log("File upload to storage completed successfully");
        getMeta();
      }
    );
  }
});

//Get Metadata
function getMeta() {
  var storageRef = firebase.storage().ref(file_type + "/" + file_name);
  storageRef
    .getMetadata()
    .then((metadata) => {
      file_type = file_type.trim().replace(/[\.#$[\] ]+/g, "_");
      getDesc();
      writeUserData(user, file_type, file_name, tags, desc);
    })
    .catch((error) => {
      console.log(
        "Error: Error getting Metadata or writing user data " + error
      );
    });
}

function datalist(allTags) {
  console.log(allTags);
  var list = document.getElementById("allTags");

  allTags.forEach(function (item) {
    var option = document.createElement("option");
    option.value = item;
    list.appendChild(option);
  });
  var div = document.getElementById("descInput");
  div.list = "allTags";
}

// Write in Realtime Database
function writeUserData(user, file_type, file_name, tags, descIn) {
  firebase
    .database()
    .ref(file_type + "/" + file_name)
    .set(
      {
        file_type: file_type,
        file_name: file_name,
        user: user,
        desc: descIn,
        tags: tags,
      },
      (error) => {
        if (error) {
          console.log("Error uploading details to database");
        } else {
          console.log("Details successfully uploaded to the database");
          allTags = setTags(tags);
          var path = file_type + "/" + file_name;
          resourceMatch(tags, path);
        }
      }
    );
}

function getTags() {
  const dbRef = firebase.database().ref("allTags");
  var allT = [];
  dbRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        var temptags = snapshot.val().tags;
        datalist(temptags);
        alltags = temptags;
        return allT;
      } else {
        return allT;
      }
    })
    .catch((error) => {
      console.error("Error getting all tags " + error);
    });
}

function resetPage() {
  var descInput = document.getElementById("descInput");
  var hiddenInput = document.getElementById("hiddenInput");
  hiddenInput.value = "";
  descInput.value = "";
  desc = "";
  tags = [];
  var tagsDiv = document.getElementsByClassName("tag");
  while (tagsDiv[0]) {
    tagsDiv[0].remove();
  }
}

function setTags(tags) {
  const dbRef = firebase.database().ref("allTags");
  dbRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        //If there are existing tags already
        var allTags = snapshot.val().tags;
        var toAdd = [];
        tags.forEach((vari) => {
          console.log(vari.text);
          if (!allTags.includes(vari.text)) {
            toAdd.push(vari.text);
          }
        });
        allTags = allTags.concat(toAdd);
        firebase
          .database()
          .ref("allTags")
          .set({ tags: allTags }, (error) => {
            // If the function returns an error.
            if (error) {
              console.log("Error: Unable to push tags to the database");
              alert(
                "There was an error uploading the tags to the database. Please try again."
              );
            }
            // If the upload function runs as normal
            else {
              alert("Successfully uploaded resource.");
              resetPage();
            }
          });
        return allTags;
      }
      //If there aren't any existing tags
      else {
        var toAdd = [];
        tags.forEach((tags) => {
          toAdd.push(tags.text);
        });
        firebase
          .database()
          .ref("allTags")
          .set({ tags: toAdd }, (error) => {
            // If an error occurs when pushing the tags
            if (error) {
              console.log("Error: Unable to push tags to the database");
              alert(
                "There was an error uploading the tags to the database. Please try again."
              );
            }
            // If pushing the tags runs successfully
            else {
              alert("Successfully uploaded resource.");
              resetPage();
            }
          });

        return toAdd;
      }
    })
    .catch((error) => {
      console.error("Error getting all tags " + error);
    });
}

function resourceMatch(tags, file_name) {
  const dbRef = firebase.database().ref("allTags/match");
  dbRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        var allDicts = snapshot.val().matched;
        var alltags = Object.keys(allDicts);

        tags.forEach((vari) => {
          if (alltags.includes(vari.text)) {
            var temparr = allDicts[vari.text];
            // add to temparr
            if (!temparr.includes(file_name)) {
              temparr.push(file_name);
            }
            // reset all dicts
            allDicts[vari.text] = temparr;
            //add file name to the thing
          } else {
            allDicts[vari.text] = [file_name];
          }
        });

        firebase
          .database()
          .ref("allTags/match")
          .set({ matched: allDicts }, (error) => {
            // If the function returns an error.
            if (error) {
              console.log("Error: Unable to push tags to the database");
              alert(
                "There was an error uploading the tags to the database. Please try again."
              );
            }
            // If the upload function runs as normal
            else {
              alert("Successfully uploaded resource.");
              resetPage();
            }
          });
        return toAdd;
      }
      //If there aren't any existing tags
      else {
        console.log("doesn't exist");
        var toAdd = {};
        tags.forEach((tags) => {
          toAdd[tags.text] = [file_name];
        });

        console.log("toadd");
        console.log(toAdd);

        firebase
          .database()
          .ref("allTags/match")
          .set({ matched: toAdd }, (error) => {
            // If an error occurs when pushing the tags
            if (error) {
              console.log("Error: Unable to push tags to the database");
              alert(
                "There was an error uploading the tags to the database. Please try again."
              );
            }
            // If pushing the tags runs successfully
            else {
              alert("Successfully uploaded resource.");
              resetPage();
            }
          });

        return toAdd;
      }
    })
    .catch((error) => {
      console.error("Error getting all tags " + error);
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
    mainInput = document.getElementById("tagsInput");

  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("id", "hiddenInput");
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
  // make the delete thing work again
  mainInput.addEventListener("keydown", (e) => {
    let keyCode = e.which || e.keyCode;
    if (keyCode == 8 && mainInput.value.length === 0 && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  });

  el.appendChild(mainInput);
  el.appendChild(hiddenInput);

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

// Desc related things

function getDesc() {
  var descInput = document.getElementById("descInput");
  let temp = descInput.value;
  if (temp.length > 0) {
    desc = temp;
    console.log(desc);
  }
}
