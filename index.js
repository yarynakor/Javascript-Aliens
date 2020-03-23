// Get references to the tbody element, input fields and button
var $tbody = document.querySelector("tbody");
var $timeInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

var $loadMoreBtn = document.querySelector("#pagination");

var startingIndex = 0;
var resultsPerPage = 50;





// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var filteredDataSet = data;

// renderTable renders dataset to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredDataSet.length; i++) {

    // Get the current object and its fields
    var data = filteredDataSet[i];
    var fields = Object.keys(data);

    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {

      // For every field in the table object, create a new cell at set its inner text to be the current value at the current field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}

function handleSearchButtonClick() {

  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDateTime = $timeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filteredDataSet to an array of all data whose fields matches the filter
  filteredDataSet = data.filter(function(data) {
    var dateTimeField = data.datetime.toLowerCase();
    var cityField = data.city.toLowerCase();
    var stateField = data.state.toLowerCase();
    var countryField = data.country.toLowerCase();
    var shapeField = data.shape.toLowerCase();

    var allFields = 
      (filterDateTime === "" || dateTimeField === filterDateTime) &&
      (filterCity === "" || cityField === filterCity) &&
      (filterCountry === "" || countryField === filterCountry) &&
      (filterState === "" || stateField === filterState) &&
      (filterShape === "" || shapeField === filterShape);
    return allFields;

  });
  renderTable();
}


function handleButtonClick() {
  startingIndex += resultsPerPage;
  renderTable();

  if (startingIndex + resultsPerPage >= filteredDataSet.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Data Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}
// $loadMoreBtn.addEventListener("click", handleButtonClick);



// Render the table for the first time on page load
renderTable();