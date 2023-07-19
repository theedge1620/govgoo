const button = document.querySelector("button");


var hostName = 'data.usajobs.gov';  
var userAgent = 'jason.carneal@nrc.gov';  
var authKey = 's7pZZOfktyr/8azgdWdjvpLw4V6RY6W9Bl5wzr1FozY=';    
 

button.addEventListener('click', async ()=> {

    // Set up the URL query for remote jobs:
    let jobKeyWord = document.getElementById("keywordInput").value;
    let salaryInput = document.getElementById("desiredSalary").value;
    var salaryDesired = Number(salaryInput);
    let checkBox = document.getElementById("partTimeHourly");

    let queryUrl = 'https://data.usajobs.gov/api/Search?RemoteIndicator=True&Keyword='+jobKeyWord+'&ResultsPerPage=250'


    // check if a table exists on the page already (for multiple searches):
    let tableCheck = document.querySelector("table");
    if (tableCheck !== null) {  // if a table exists, delete it.
        var parentTable = tableCheck.parentElement;
        parentTable.removeChild(tableCheck);
    }

    axios({

        url: queryUrl,
        method: 'get',
        headers: {
            "Host": hostName,          
            "User-Agent": userAgent,          
            "Authorization-Key": authKey
        }
     })
     .then(response => {
        
        // If the response is good, let's update the page with the results:
        console.log(response);

        var jobsArray = response.data.SearchResult.SearchResultItems;
        console.log(jobsArray.length);

        /// create a Table with the returned job results from the query:

        function createTable() {

            var headers = ["Job Title", "Agency", "Max Pay","Closing Date","Link"];
            var table = document.createElement("TABLE");  //makes a table element for the page

            
            

            table.setAttribute("class", "jobs_table");
   
            for(var i = 0; i < jobsArray.length; i++) {
                var row = table.insertRow(i);

                var payType = jobsArray[i].MatchedObjectDescriptor.PositionRemuneration[0].Description;

                

                if (payType == 'Per Year') {  // if this is an annual salary, fix the string returned.
                    
                    var payString = jobsArray[i].MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange;
                    var payNumber = Number(payString);
                    var fixedString = "$"  +payString.slice(0,payString.length-5) + "," + payString.slice(payString.length-5,payString.length-2)+ ".00" + " / year";

                    // check if the job pays more annually than the user input:

                    if (payNumber > salaryDesired) {
                        var outputFlag = true;
                    }
                    else {
                        var outputFlag = false;
                    }

                }
                else {
                    var fixedString = "$"+jobsArray[i].MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange + " / hour";
                    var outputFlag = checkBox.checked;
                };



                
                closingDate = jobsArray[i].MatchedObjectDescriptor.ApplicationCloseDate;
                if (outputFlag) {  // output a row if the jobs match the job parameters:

                    row.insertCell(0).innerHTML = jobsArray[i].MatchedObjectDescriptor.PositionTitle;
                    row.insertCell(1).innerHTML = jobsArray[i].MatchedObjectDescriptor.DepartmentName;
                    row.insertCell(2).innerHTML = fixedString;
                    row.insertCell(3).innerHTML = closingDate.slice(0,10);
                    row.insertCell(4).innerHTML = "<a href='"+ jobsArray[i].MatchedObjectDescriptor.PositionURI+"' target='_blank'> Apply to Job </a>";

                }
            }
        
            var header = table.createTHead();
            var headerRow = header.insertRow(0);
            for(var i = 0; i < headers.length; i++) {
                headerRow.insertCell(i).innerHTML = headers[i];
            }
        
            document.body.appendChild(table);

            

        };
        
        createTable();
       
     })
            
     .catch(err => {
        console.log(err);
     });


});

