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
      //sort
      const userCountsSorted = Object.entries(userCounts);
      console.log(userCountsSorted[0]);
      userCountsSorted.sort(function(a, b){
	return b[1] - a[1] ;
      });
      console.log(userCountsSorted);

      let tableBodyStr = "";
      for ( var i = 0; i < userCountsSorted.length; i++){
        tableBodyStr += `<tr>\n<td>${userCountsSorted[i][0]}</td>\n<td>${userCountsSorted[i][1]}</td>\n</tr>\n`;
      }
      //let tableBodyStr = "";
      //for (const key in userCounts) {
      //  tableBodyStr += `<tr>\n<td>${key}</td>\n<td>${userCounts[key]}</td>\n</tr>\n`;
      //  console.log(key);
      //  console.log(userCounts[key]);
      //}
      $("#tableBodyTarget").html(tableBodyStr);
      //Finally, load everything into the html



    }
    reader.readAsText(inputFile);
  })
});
