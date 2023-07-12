
let arr = []
function findAll() {
    $.ajax({
        url: "http://localhost:8080/api/cities",
        type: "GET",
        success: function (city) {
            displayCity(city)
            arr = city
            document.getElementById("create").style.display = "none"
            document.getElementById("update").style.display = "none"
        }
    })
}

function displayCity(city) {
    let content = `<h1>List City</h1>
<button onclick="displayFormCreate();getAllSelectCountry()">Add new city</button>
<table border="1">
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Acreage</th>
    <th>Population</th>
    <th>GDP</th>
    <th>Type</th>
    <th>Country</th>
    <th colspan="3">Action</th>
</tr>`
    for (let i = 0; i < city.length; i++) {
        content += `<tr>
    <td>${city[i].id}</td>
    <td>${city[i].name}</td>
    <td>${city[i].acreage}</td>
    <td>${city[i].population}</td>
    <td>${city[i].gdp}</td>
    <td>${city[i].type}</td>
    <td>${city[i].country.name}</td>
    <td><button onclick="detailCity(${city[i].id})">View</button></td>
    <td><button onclick="displayFormUpdate(${city[i].id}); getAllSelectCountryUpdate()">Update</button></td>
    <td><button onclick="deleteCity(${city[i].id})">Delete</button></td>
</tr>`
    }
    content += `</table>`
    document.getElementById("list").style.display = "block"
    document.getElementById("views").style.display = "none"
    document.getElementById("list").innerHTML = content
}

function displayFormCreate() {
    document.getElementById("create").style.display = "block"
    document.getElementById("list").style.display = "none"
}

function getCountryOption(country) {
    return `<option value="${country.id}">${country.name}</option>`
}

function getAllSelectCountry() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/countries",
        success: function (data) {
            let content = `<select id="countryId">`
            for (let i = 0; i < data.length; i++) {
                content += getCountryOption(data[i]);
            }
            content += `</select>`;
            document.getElementById("selectCountry").innerHTML = content;
        }
    });

}

function getAllSelectCountryUpdate() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/countries",
        success: function (data) {
            let content = `<select id="countryIdUpdate">`
            for (let i = 0; i < data.length; i++) {
                content += getCountryOption(data[i]);
            }
            content += `</select>`;
            document.getElementById("selectCountryUpdate").innerHTML = content;
        }
    });

}

function create() {
    let name = $("#name").val()
    let acreage = $("#acreage").val()
    let population = $("#population").val()
    let gdp = $("#gdp").val()
    let type = $("#type").val()
    let countryId = $("#countryId").val()

    let city = {
        name: name,
        acreage: acreage,
        population: population,
        gdp: gdp,
        type: type,
        country: {
            id: countryId
        }
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/cities",
        type: "POST",
        data: JSON.stringify(city),
        success: function () {
            findAll()
            document.getElementById("create").style.display = "none"
        }

    })
}

function detailCity(id) {
    $.ajax({
        url: `http://localhost:8080/api/cities/${id}`,
        type: "GET",
        success: function (city) {
            let content = `<h2>Name: ${city.name}</h2>
                           <h2>Country: ${city.country.name}</h2>
                           <h2>Acreage: ${city.acreage}</h2>
                           <h2>Population: ${city.population}</h2>
                           <h2>Gdp: ${city.gdp}</h2>
                           <h2>Type: ${city.type}</h2>
                           <button onclick="displayCity(arr)">Back to list</button>`
            document.getElementById("list").style.display = "none"
            document.getElementById("views").style.display = "block"
            document.getElementById("views").innerHTML = content
        }
    })
}

let idUpdate;
function displayFormUpdate(id) {
    $.ajax({
        url: `http://localhost:8080/api/cities/${id}`,
        type: "GET",
        success: function (student) {
            idUpdate = student.id
            document.getElementById("name-update").value = student.name
            document.getElementById("acreage-update").value = student.acreage
            document.getElementById("population-update").value = student.population
            document.getElementById("gdp-update").value = student.gdp
            document.getElementById("type-update").value = student.type

        }
    })

    document.getElementById("update").style.display = "block"
    document.getElementById("list").style.display = "none"
}

function update() {
    let name = $("#name-update").val()
    let acreage = $("#acreage-update").val()
    let population = $("#population-update").val()
    let gdp = $("#gdp-update").val()
    let type = $("#type-update").val()
    let countryId = $("#countryIdUpdate").val()

    let city = {
        name: name,
        acreage: acreage,
        population: population,
        gdp: gdp,
        type: type,
        country: {
            id: countryId
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/api/cities/${idUpdate}`,
        type: "PUT",
        data: JSON.stringify(city),
        success: function () {
            findAll()
            document.getElementById("update").style.display = "none"
        },
        error: function () {
            alert("City not exists!")
        }
    })
}

function deleteCity(id) {
    if (confirm("Sure ?")) {
        $.ajax({
            url: `http://localhost:8080/api/cities/${id}`,
            type: "DELETE",
            success: function () {
                findAll()
            }
        })
    }
}