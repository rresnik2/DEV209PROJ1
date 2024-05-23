import CanvasJS from '@canvasjs/charts';

document.addEventListener("DOMContentLoaded", function(event) {
    var exerciseList = [];
    document.getElementById("submit").addEventListener("click", function() {
        let exercise = new Exercise(document.getElementById("dateDone").value, document.getElementById("exercise").value, document.getElementById("reps").value, document.getElementById("confidence").value)
        exerciseList.push(exercise);
    });
    $(document).on("pagebeforeshow", "#add", function(event){var chart = new CanvasJS.Chart("container", {
        //Chart Options - Check https://canvasjs.com/docs/charts/chart-options/
        title:{
          text: "Basic Column Chart in JavaScript"              
        },
        data: [{
          type: "column",
          dataPoints: [
            { label: "apple",  y: 10  },
            { label: "orange", y: 15  },
            { label: "banana", y: 25  },
            { label: "mango",  y: 30  },
            { label: "grape",  y: 28  }
          ]
        }]
      });
      //Render Chart
      chart.render();});
});



