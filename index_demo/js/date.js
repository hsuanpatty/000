// 讓手機點日期不跳出鍵盤（一定要放最前面）
$("#date-range, #date-range-sm").attr("readonly", true);
function initDateRange(inputId) {
    // ... (daterangepicker 初始化程式碼不變) ...
    $(inputId).daterangepicker({
        // ... (省略 locale, startDate 等設定) ...
    });

    // 顯示中文月份
    const pickerInstance = $(inputId).data("daterangepicker");

    function updateMonthTitle(picker) {
        // 從 picker 實例中取得左右日曆的 Moment 物件
        const leftMonthMoment = picker.leftCalendar.month;
        const rightMonthMoment = picker.rightCalendar.month;

        // **正確使用 Moment.js 方法 (已補齊註釋)**
        const leftYear = leftMonthMoment.year();
        const leftMonth = leftMonthMoment.month(); // 0-11

        const rightYear = rightMonthMoment.year();
        const rightMonth = rightMonthMoment.month(); // 0-11

        // 寫入中文標題 (月份需要 + 1)
        picker.container
            .find(".drp-calendar.left .month")
            .text(leftYear + " 年 " + (leftMonth + 1) + " 月");

        picker.container
            .find(".drp-calendar.right .month")
            .text(rightYear + " 年 " + (rightMonth + 1) + " 月");
    }

    $(inputId).on(
        // 確保在日曆顯示時或切換時都能更新標題
        "show.daterangepicker showCalendar.daterangepicker",
        function (ev, picker) {
            // 使用 setTimeout 確保 DOM 已更新
            setTimeout(() => updateMonthTitle(picker), 10); 
            
            // 點擊日期自動關閉邏輯
            picker.container
                .find("td.available")
                .off("click")
                .on("click", function () {
                    picker.hide();
                });
        }
    );
    
    // 第一次載入時也要更新標題
    setTimeout(() => updateMonthTitle(pickerInstance), 10);
}
