// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const baseURL = 'http://localhost:8080'

function loadPatient() {

    $('#list').html('')

    fetch(baseURL + '/patients')
        .then((res) => res.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                $('#list').append(`<li>${json[i].name}<ul style="list-style: none;"><li><button class="buttonDialog" onclick="openDialog(${json[i].id})" style="width:auto;">History Visit</button><button class="buttonDialog" onclick="openDialogDiagnose(${json[i].id},'${json[i].name}')" style="width:auto;">Diagnose</button><button class="buttonDialog" onclick="openDialog(${json[i].id})" style="width:auto;">Test</button></li></ul> </li>`)
            }
        })

}

loadPatient()

function doSave() {
    fetch(baseURL + '/patients', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ name: $('#name').val() })
    })
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            loadPatient()
        })
}
// Get the modal dialog
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
function openDialog(id){
    document.getElementById('id01').style.display='block'

/*load data*/
    $.ajax({
        type: "GET",
        url: '/visit/'+id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}
function OnSuccess(response) {
    $('#listVisit').empty();
    if(response.length == 0){
        $('#listVisit').append('<li>Dont have visit</li>');
        return;
    }
    for (let i = 0; i < response.length; i++) {
        var visit = response[i][0];
        var icd = response[i][1];
        var date = new Date(visit.date).toDateString();
        $('#listVisit').append("<li>"+icd.diseaseName+"<ul><li>"+visit.problems+"</li><li>"+date+" "+visit.time+"</li></ul></li>");
    }

}
/*open dialog diagnose*/
function openDialogDiagnose(id,name){
    document.getElementById('id02').style.display='block';
    $('#namePatient').html(name);
    $('#patient_id').val(id);
    loadDroplistIcd();
    /*load data*/
    $.ajax({
        type: "GET",
        url: '/visit/'+id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessDiagnose,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}
function OnSuccessDiagnose(response) {

    $('#listVisit').empty();
    if(response.length == 0){
        $('#listVisit').append('<li>Dont have visit</li>');
        return;
    }
    for (let i = 0; i < response.length; i++) {
        var visit = response[i][0];
        var icd = response[i][1];
        var date = new Date(visit.date).toDateString();
        $('#listVisit').append("<li>"+icd.diseaseName+"<ul><li>"+visit.problems+"</li><li>"+date+" "+visit.time+"</li></ul></li>");
    }

}
/*get date time*/
function getDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    today = yyyy+""+mm+""+dd;

    document.getElementById("todayDate").value = today;
}

//call getDate() when loading the page
getDate();

function loadDroplistIcd(){
    document.getElementById('id02').style.display='block';

    /*load data*/
    $.ajax({
        type: "GET",
        url: '/icd/',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessIcd,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}
function OnSuccessIcd(response) {
    for (let i = 0; i < response.length; i++) {
        $('#browsers').append("<option value='"+response[i].id+"'>"+response[i].diseaseName+"</option>");
    }

}
function submitVisitForm() {
    document.getElementById('id02').style.display='none';
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: '/visit',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            date : null,
            time:null,
            patient_id: $('#patient_id').val(),
            diagnosis_id: $('#diagnosis_id').val(),
            problems: $('#problems').val(),
        }),
        success: function (response) {
            alert("Add Visit Success !! ");
        },
        failure: function (response) {
            alert("Add Visit failure !! ");
        },
        error:function (response) {
            alert("Add Visit Erro !! ");
        }
    });
}
