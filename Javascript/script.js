

$(document).ready(function() {
  const inputFileElement = document.getElementById("fileChooser");
  console.log("document loaded");
  
  //inputFileElement.files[0]
  
  inputFileElement.addEventListener("change", (e) => {
    const inputFile = e.target.files[0]
    console.log("file changed");
    console.log(inputFile.name);
    const reader = new FileReader();
    //You need this onload because the reader is asynchronos in it's read
    reader.onload = (evt) => { 
      const fileStr = evt.target.result;
      //regex part
      const PATTERN = /(?:(\d{1,2}\/\d{1,2}\/\d\d), (\d\d:\d\d) - ([^:]*): (.*\n))/g;

      //console.log(fileStr);
      const matches = [...fileStr.matchAll(PATTERN)];
      const users = [];
      matches.forEach(match => {
	users.push(match[3]);
      });
      const userCounts = {};
      //Now we're counting everything
      users.forEach(user => {
	if (userCounts[user]){
	  userCounts[user] += 1;
	} else {
	  userCounts[user] = 1;
	}
      });
      for (const key in userCounts) {
	console.log(key);
	console.log(userCounts[key]);
      }
    }
    reader.readAsText(inputFile);
  })
});
