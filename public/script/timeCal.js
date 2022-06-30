$(document).ready(function () {
  function calculateTime() {
    var hourDiff =
      parseInt($("select[name='timestart']").val().split(":")[0], 10) -
      parseInt($("select[name='timestop']").val().split(":")[0], 10);
    $("p").html("<b>Hour Difference:</b> " + hourDiff);
  }
  $("select").change(calculateTime);
  calculateTime();
});
