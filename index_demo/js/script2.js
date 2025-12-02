$(document).ready(function () {
  $("input[name='datetimes']").daterangepicker(
    {},
    function (start, end, label) {
      let startDate = start.format("YYYY-MM-DD").toString();
      let endDate = end.format("YYYY-MM-DD").toString();

      document.getElementById("startDate").innerHTML =
        "Start date: " + startDate;
      document.getElementById("endDate").innerHTML = "End date: " + endDate;
      
    }
  );
});