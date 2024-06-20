
let sortedExercise = [[], [], [], [], [], []];
let avgConfid = [];

let exercise = function (date, move, reps, confid) {
  this.date = date;
  this.move = move;
  this.reps = reps;
  this.confid = confid;
  this.ID = Math.random().toString(16).slice(5);
}


document.addEventListener("DOMContentLoaded", function (event) {
  $(document).on("pagebeforeshow", "#show", function (event) {

    createChart();
    //Render Chart


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
  console.log(list[0], move);
  let temp = 0;
  if (list[move].length < 1) {
    return temp;
  }
  else {
    for (let i = 0; i < list[move].length; i++) {
      temp += list[move][i];
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
    if (exerciseList.length !== 0) {
      sortDataForChart(exerciseList, chart);
      sortDataForAnal(exerciseList);
      console.log(chart);
      chart.render();
      for (let i = 0; i < 6; i++) {
        avgConfid[i] = avg(sortedExercise, i);
        
      }
      document.getElementById('avdsld') = avgConfid[0];
      document.getElementById('avdcr') = avgConfid[1];
      document.getElementById('avdpk') = avgConfid[2];
      document.getElementById('avdhlr') = avgConfid[3];
      document.getElementById('avdatw') = avgConfid[4];
      document.getElementById('avdms') = avgConfid[5];





    }

  })
}



