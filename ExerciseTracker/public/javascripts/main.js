
let sortedExercise = [[], [], [], [], [], []];
let avgConfid = [];
let sldUrl = "https://www.youtube.com/watch?v=tZfxXdilG_M";
let crUrl = "https://www.youtube.com/watch?v=c5Kv6-fnTj8";
let pkUrl = "https://www.youtube.com/watch?v=YBVJJQijlYw"
let hlrUrl = "https://www.youtube.com/watch?v=Q3MJAkLsaV4";
let atwUrl = "https://www.youtube.com/watch?v=cJ27Zu_3_i0";
let msUrl = "https://www.youtube.com/watch?v=WEbdsSD_5A4";
let urlList = [sldUrl, crUrl, pkUrl, hlrUrl,  atwUrl, msUrl ];
let exercise = function (date, move, reps, confid) {
  this.date = date;
  this.move = move;
  this.reps = reps;
  this.confid = confid;
  this.ID = Math.random().toString(16).slice(5);
}


let tableButtons = function(){
  let table = document.getElementById("tableID");
  let rows = table.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++){
    let currentRow = table.rows[i];
    let createClickHandler = function(row){
      return function() {
          let cell = row.getElementsByTagName("td")[0];
          let whichID = cell.innerHTML;
          console.log(cell.innerHTML);
          for (let i = 1; i < 7; i++){
            console.log("in url")
            
            if (cell.innerHTML == i){
            
              window.open(urlList[i - 1]);
              
            }
          }
          }
      }
    currentRow.onclick = createClickHandler(currentRow);
    }
  }


document.addEventListener("DOMContentLoaded", function (event) {
  $(document).on("pagebeforeshow", "#show", function (event) {

    createChart();
    //Render Chart


  });

  document.getElementById("clearButton").addEventListener("click", function(){
    console.log('clearClicked');
    document.getElementById("confidence").value = "";
    document.getElementById("reps").value = "";
    document.getElementById("dateDone").value = "";
  });

  document.getElementById("submit").addEventListener("click", function () {

    addExercise();
  });


});

function addExercise() {
  let exerciseTemp = new exercise(document.getElementById("dateDone").value, document.getElementById("exercise").value, parseInt(document.getElementById("reps").value), document.getElementById("confidence").value);
  $.ajax({
    url: "/addExercise",
    type: "POST",
    data: JSON.stringify(exerciseTemp),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      console.log(result);
      // document.location.href = "index.html#show";
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("Server could not add exercise: " + exerciseTemp.ID);
      alert(textStatus + " " + errorThrown);
    }
  });
}
function sortDataForChart(exerciseList, chart) {
  for (let i = 0; i < exerciseList.length; i++) {
    if (exerciseList[i].move === "sld") {
      chart.options.data[0].dataPoints.push({
        x: new Date(exerciseList[i].date),
        y: exerciseList[i].reps
      })
    }
    else if (exerciseList[i].move === "calves") {
      chart.options.data[1].dataPoints.push({
        x: new Date(exerciseList[i].date),
        y: exerciseList[i].reps
      })
    }
    else if (exerciseList[i].move === "kneetap") {
      chart.options.data[2].dataPoints.push({
        x: new Date(exerciseList[i].date),
        y: exerciseList[i].reps
      })
    }
    else if (exerciseList[i].move === "hlr") {
      chart.options.data[3].dataPoints.push({
        x: new Date(exerciseList[i].date),
        y: exerciseList[i].reps
      })
    }
    else if (exerciseList[i].move === "atw") {
      chart.options.data[4].dataPoints.push({
        x: new Date(exerciseList[i].date),
        y: exerciseList[i].reps
      })
    }
    else {
      chart.options.data[5].dataPoints.push({
        x: new Date(exerciseList[i].date),
        y: exerciseList[i].reps
      })
    }
  }
}
function sortDataForAnal(exerciseList) {
  for (let i = 0; i < exerciseList.length; i++) {
    if (exerciseList[i].move === "sld") {
      sortedExercise[0].push(exerciseList[i].confid)
    }
    else if (exerciseList[i].move === "calves") {
      sortedExercise[1].push(exerciseList[i].confid)
    }
    else if (exerciseList[i].move === "kneetap") {
      sortedExercise[2].push(exerciseList[i].confid)
    }
    else if (exerciseList[i].move === "hlr") {
      sortedExercise[3].push(exerciseList[i].confid)
    }
    else if (exerciseList[i].move === "atw") {
      sortedExercise[4].push(exerciseList[i].confid)
    }
    else {
      sortedExercise[5].push(exerciseList[i].confid)
    }
  }
}
function avg(list, move) {

  let temp = 0;
  if (list[move].length < 1) {
    return temp;
  }
  else {
    for (let i = 0; i < list[move].length; i++) {
      temp += parseInt(list[move][i]);
      console.log(temp);
    }
    return temp / list[move].length;
  }
  
}
function toggleDataSeries(e) {
  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  }
  else {
    e.dataSeries.visible = true;
  }

}

function createChart() {
  $.get("/getData", function (data, status) {
    console.log(status);
    exerciseList = data;
    
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Exercise Trends"
      },
      axisX: {
        valueFormatString: "DD MMM, YY"
      },
      axisY: {
        title: "Repetitions of Exercise",
        suffix: " reps"
      },
      legend: {
        cursor: "pointer",
        fontSize: 16,
        itemclick: toggleDataSeries
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Single Leg Deadlift",
        type: "spline",
        showInLegend: true,
        dataPoints: [],
        markerSize: 4
      },
      {
        name: "Calf Raises",
        type: "spline",
        showInLegend: true,
        dataPoints: [],
        markerSize: 4
      },
      {
        name: "Plank w/ Knee Taps",
        type: "spline",
        showInLegend: true,
        dataPoints: [],
        markerSize: 4
      },
      {
        name: "Hamstring Lever Release",
        type: "spline",
        showInLegend: true,
        dataPoints: [],
        markerSize: 4
      },
      {
        name: "Around the World",
        type: "spline",
        showInLegend: true,
        dataPoints: [],
        markerSize: 4
      },
      {
        name: "Step March",
        type: "spline",
        showInLegend: true,
        dataPoints: [],
        markerSize: 4
      }
      ]
    });
    tableButtons();
    if (exerciseList.length !== 0) {
      sortDataForChart(exerciseList, chart);
      sortDataForAnal(exerciseList);
      console.log(chart);
      chart.render();
      for (let i = 0; i < 6; i++) {
        avgConfid[i] = Math.round(avg(sortedExercise, i), 5);
        
      }
      document.getElementById('avdsld').innerHTML = avgConfid[0];
      document.getElementById('avdcr').innerHTML = avgConfid[1];
      document.getElementById('avdpk').innerHTML = avgConfid[2];
      document.getElementById('avdhlr').innerHTML = avgConfid[3];
      document.getElementById('avdatw').innerHTML = avgConfid[4];
      document.getElementById('avdms').innerHTML = avgConfid[5];





    }

  })
}



