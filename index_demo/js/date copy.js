$(function () {
    const today = moment();
    const minDate = moment("2025-12-01");

    function initDateRange(inputId) {
        const $input = $(inputId);
        // 暫時顯示 input 避免 display:none 導致初始化失敗
        $input.show();

        $input.daterangepicker({
            autoApply: true,
            locale: {
                format: "YYYY/MM/DD",
                separator: " - ",
                daysOfWeek: ["一", "二", "三", "四", "五", "六", "日"],
                monthNames: [
                    "1 月","2 月","3 月","4 月","5 月","6 月",
                    "7 月","8 月","9 月","10 月","11 月","12 月"
                ],
                firstDay: 1
            },
            startDate: today,
            endDate: today,
            minDate: minDate,
            opens: "left"
        });

        // 顯示中文月份
        const pickerInstance = $input.data("daterangepicker");
        function updateMonthTitle(picker) {
            const leftMonth = picker.leftCalendar.month.month();
            const leftYear = picker.leftCalendar.month.year();
            const rightMonth = picker.rightCalendar.month.month();
            const rightYear = picker.rightCalendar.month.year();
            picker.container
                .find(".drp-calendar.left .month")
                .text(leftYear + " 年 " + (leftMonth + 1) + " 月");
            picker.container
                .find(".drp-calendar.right .month")
                .text(rightYear + " 年 " + (rightMonth + 1) + " 月");
        }

        $input.on("show.daterangepicker showCalendar.daterangepicker", function (ev, picker) {
            setTimeout(() => updateMonthTitle(picker), 10);
            // 點日期自動關閉
            picker.container
                .find("td.available")
                .off("click")
                .on("click", function () {
                    picker.hide();
                });
        });

        setTimeout(() => updateMonthTitle(pickerInstance), 10);
    }

    // 桌面版直接初始化
    initDateRange("#date-range");

    // 手機版直接初始化，無需點 accordion
    initDateRange("#date-range-sm");

    // 保留 accordion 展開效果
    $(".accordion-button").on("click", function () {
        $(this).next(".accordion-content").slideToggle();
    });
});
