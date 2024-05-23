document.addEventListener("DOMContentLoaded", function(event) {
    var exerciseList = [];
    document.getElementById("submit").addEventListener("click", function() {
        let exercise = new Exercise(document.getElementById("dateDone").value, document.getElementById("exercise").value, document.getElementById("reps").value, document.getElementById("confidence").value)
        exerciseList.push(exercise);
    });
    $(document).on("pagebeforeshow", "#add", function(event){createChart();});
});



