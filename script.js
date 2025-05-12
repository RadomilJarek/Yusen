// 全局變數
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let selectedDate = null;
let schedules = [];
let scheduleTypes = [];
let calendarTitle = "行程月曆";
let currentLanguage = "zh";

// 顏色選項
const colorOptions = [
    '#1890ff', '#52c41a', '#ff4d4f', '#722ed1', '#faad14', 
    '#13c2c2', '#eb2f96', '#fa8c16', '#a0d911', '#f759ab'
];

// 多語言支援
const translations = {
    zh: {
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        weekdays: ["日", "一", "二", "三", "四", "五", "六"],
        today: "今天",
        newCalendar: "開新月曆",
        loadCalendar: "載入月曆",
        saveCalendar: "另存月曆",
        addSchedule: "新增行程",
        editSchedule: "編輯行程",
        date: "日期",
        scheduleType: "行程類型",
        details: "詳情",
        save: "儲存",
        delete: "刪除",
        cancel: "取消",
        confirmDelete: "確定要刪除這個行程嗎？",
        noSchedules: "今天沒有行程",
        selectDate: "選擇一個日期查看行程",
        schedules: "行程",
        addType: "新增類型",
        deleteType: "刪除類型",
        typeName: "類型名稱",
        typeColor: "類型顏色",
        selectTypeToDelete: "選擇要刪除的類型",
        confirmDeleteType: "確定要刪除這個類型嗎？所有使用此類型的行程將被重新分配。",
        editTitle: "編輯日曆標題",
        calendarTitle: "日曆標題",
        default: "預設"
    },
    en: {
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        today: "Today",
        newCalendar: "New Calendar",
        loadCalendar: "Load Calendar",
        saveCalendar: "Save Calendar",
        addSchedule: "Add Schedule",
        editSchedule: "Edit Schedule",
        date: "Date",
        scheduleType: "Schedule Type",
        details: "Details",
        save: "Save",
        delete: "Delete",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to delete this schedule?",
        noSchedules: "No schedules for today",
        selectDate: "Select a date to view schedules",
        schedules: "Schedules",
        addType: "Add Type",
        deleteType: "Delete Type",
        typeName: "Type Name",
        typeColor: "Type Color",
        selectTypeToDelete: "Select type to delete",
        confirmDeleteType: "Are you sure you want to delete this type? All schedules using this type will be reassigned.",
        editTitle: "Edit Calendar Title",
        calendarTitle: "Calendar Title",
        default: "Default"
    },
    ja: {
        months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        weekdays: ["日", "月", "火", "水", "木", "金", "土"],
        today: "今日",
        newCalendar: "新しいカレンダー",
        loadCalendar: "カレンダーを読み込む",
        saveCalendar: "カレンダーを保存",
        addSchedule: "予定を追加",
        editSchedule: "予定を編集",
        date: "日付",
        scheduleType: "予定タイプ",
        details: "詳細",
        save: "保存",
        delete: "削除",
        cancel: "キャンセル",
        confirmDelete: "この予定を削除してもよろしいですか？",
        noSchedules: "今日の予定はありません",
        selectDate: "予定を表示する日付を選択してください",
        schedules: "予定",
        addType: "タイプを追加",
        deleteType: "タイプを削除",
        typeName: "タイプ名",
        typeColor: "タイプの色",
        selectTypeToDelete: "削除するタイプを選択",
        confirmDeleteType: "このタイプを削除してもよろしいですか？このタイプを使用しているすべての予定が再割り当てされます。",
        editTitle: "カレンダータイトルを編集",
        calendarTitle: "カレンダータイトル",
        default: "デフォルト"
    }
};

// DOM 元素
const calendarBody = document.getElementById('calendar-body');
const currentMonthYear = document.getElementById('current-month-year');
const yearDropdown = document.getElementById('year-dropdown');
const monthDropdown = document.getElementById('month-dropdown');
const scheduleInfo = document.getElementById('schedule-info');
const scheduleModal = document.getElementById('schedule-modal');
const closeModal = document.getElementById('close-modal');
const scheduleForm = document.getElementById('schedule-form');
const scheduleId = document.getElementById('schedule-id');
const scheduleDate = document.getElementById('schedule-date');
const scheduleType = document.getElementById('schedule-type');
const scheduleDetails = document.getElementById('schedule-details');
const modalTitle = document.getElementById('modal-title');
const deleteBtn = document.getElementById('delete-btn');
const addScheduleBtn = document.getElementById('add-schedule-btn');
const titleModal = document.getElementById('title-modal');
const calendarTitleElement = document.getElementById('calendar-title');
const calendarTitleInput = document.getElementById('calendar-title-input');
const closeTitleModal = document.getElementById('close-title-modal');
const saveTitleBtn = document.getElementById('save-title-btn');
const addTypeBtn = document.getElementById('add-type-btn');
const deleteTypeBtn = document.getElementById('delete-type-btn');
const addTypeModal = document.getElementById('add-type-modal');
const closeAddTypeModal = document.getElementById('close-add-type-modal');
const typeName = document.getElementById('type-name');
const typeColor = document.getElementById('type-color');
const saveTypeBtn = document.getElementById('save-type-btn');
const colorPicker = document.getElementById('color-picker');
const deleteTypeModal = document.getElementById('delete-type-modal');
const closeDeleteTypeModal = document.getElementById('close-delete-type-modal');
const deleteTypeSelect = document.getElementById('delete-type-select');
const confirmDeleteTypeBtn = document.getElementById('confirm-delete-type-btn');
const newCalendarBtn = document.getElementById('new-calendar-btn');
const loadCalendarBtn = document.getElementById('load-calendar-btn');
const saveCalendarBtn = document.getElementById('save-calendar-btn');
const calendarFileInput = document.getElementById('calendar-file-input');
const calendarDownloadLink = document.getElementById('calendar-download-link');
const langBtns = document.querySelectorAll('.lang-btn');
const themeBtns = document.querySelectorAll('.theme-btn');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化預設行程類型
    if (scheduleTypes.length === 0) {
        scheduleTypes.push({
            id: 'default',
            name: translations[currentLanguage].default || '預設',
            color: '#1890ff'
        });
    }

    // 初始化年份下拉選單
    const currentYearInt = currentDate.getFullYear();
    for (let year = currentYearInt - 5; year <= currentYearInt + 5; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === currentYearInt) {
            option.selected = true;
        }
        yearDropdown.appendChild(option);
    }

    // 初始化月份下拉選單
    updateMonthDropdown();

    // 初始化顏色選擇器
    initColorPicker();

    // 載入儲存的資料
    loadFromLocalStorage();

    // 初始化日曆
    renderCalendar();

    // 設定事件監聽器
    setupEventListeners();

    // 初始化語言和主題
    updateLanguage(currentLanguage);
    updateThemeButtons();
});

// 設定事件監聽器
function setupEventListeners() {
    // 年份和月份選擇
    yearDropdown.addEventListener('change', handleYearMonthChange);
    monthDropdown.addEventListener('change', handleYearMonthChange);

    // 行程相關
    addScheduleBtn.addEventListener('click', () => openAddScheduleModal());
    closeModal.addEventListener('click', () => closeScheduleModal());
    scheduleForm.addEventListener('submit', handleScheduleSubmit);
    deleteBtn.addEventListener('click', handleScheduleDelete);

    // 標題編輯
    calendarTitleElement.addEventListener('click', openTitleModal);
    closeTitleModal.addEventListener('click', () => titleModal.style.display = 'none');
    saveTitleBtn.addEventListener('click', saveTitle);

    // 類型管理
    addTypeBtn.addEventListener('click', openAddTypeModal);
    closeAddTypeModal.addEventListener('click', () => addTypeModal.style.display = 'none');
    saveTypeBtn.addEventListener('click', saveScheduleType);
    deleteTypeBtn.addEventListener('click', openDeleteTypeModal);
    closeDeleteTypeModal.addEventListener('click', () => deleteTypeModal.style.display = 'none');
    confirmDeleteTypeBtn.addEventListener('click', deleteScheduleType);

    // 檔案操作
    newCalendarBtn.addEventListener('click', createNewCalendar);
    loadCalendarBtn.addEventListener('click', () => calendarFileInput.click());
    calendarFileInput.addEventListener('change', loadCalendarFromFile);
    saveCalendarBtn.addEventListener('click', saveCalendarToFile);

    // 語言切換
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLanguage = btn.dataset.lang;
            updateLanguage(currentLanguage);
            saveToLocalStorage();
        });
    });

    // 主題切換
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            if (theme === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
            updateThemeButtons();
            saveToLocalStorage();
        });
    });

    // 點擊其他地方關閉模態框
    window.addEventListener('click', (e) => {
        if (e.target === scheduleModal) {
            closeScheduleModal();
        }
        if (e.target === titleModal) {
            titleModal.style.display = 'none';
        }
        if (e.target === addTypeModal) {
            addTypeModal.style.display = 'none';
        }
        if (e.target === deleteTypeModal) {
            deleteTypeModal.style.display = 'none';
        }
    });
}

// 更新月份下拉選單
function updateMonthDropdown() {
    monthDropdown.innerHTML = '';
    const months = translations[currentLanguage].months;
    for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = months[i];
        if (i === currentMonth) {
            option.selected = true;
        }
        monthDropdown.appendChild(option);
    }
}

// 初始化顏色選擇器
function initColorPicker() {
    colorPicker.innerHTML = '';
    colorOptions.forEach((color, index) => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option color-${index + 1}`;
        colorOption.style.backgroundColor = color;
        colorOption.dataset.color = color;
        colorOption.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            colorOption.classList.add('selected');
            typeColor.value = color;
        });
        colorPicker.appendChild(colorOption);
    });
    // 預設選擇第一個顏色
    const firstColor = colorPicker.querySelector('.color-option');
    if (firstColor) {
        firstColor.classList.add('selected');
        typeColor.value = firstColor.dataset.color;
    }
}

// 從本地儲存載入資料
function loadFromLocalStorage() {
    try {
        // 載入行程
        const savedSchedules = localStorage.getItem('schedules');
        if (savedSchedules) {
            schedules = JSON.parse(savedSchedules);
        }

        // 載入行程類型
        const savedTypes = localStorage.getItem('scheduleTypes');
        if (savedTypes) {
            scheduleTypes = JSON.parse(savedTypes);
            if (scheduleTypes.length === 0) {
                scheduleTypes.push({
                    id: 'default',
                    name: translations[currentLanguage].default || '預設',
                    color: '#1890ff'
                });
            }
        }

        // 載入日曆標題
        const savedTitle = localStorage.getItem('calendarTitle');
        if (savedTitle) {
            calendarTitle = savedTitle;
            calendarTitleElement.textContent = calendarTitle;
        }

        // 載入語言設定
        const savedLanguage = localStorage.getItem('calendarLanguage');
        if (savedLanguage && translations[savedLanguage]) {
            currentLanguage = savedLanguage;
        }

        // 載入主題設定
        const savedTheme = localStorage.getItem('calendarTheme');
        if (savedTheme) {
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }

    } catch (error) {
        console.error('載入本地儲存資料時出錯:', error);
    }
}

// 儲存資料到本地儲存
function saveToLocalStorage() {
    try {
        localStorage.setItem('schedules', JSON.stringify(schedules));
        localStorage.setItem('scheduleTypes', JSON.stringify(scheduleTypes));
        localStorage.setItem('calendarTitle', calendarTitle);
        localStorage.setItem('calendarLanguage', currentLanguage);
        localStorage.setItem('calendarTheme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    } catch (error) {
        console.error('儲存資料到本地儲存時出錯:', error);
    }
}

// 更新主題按鈕
function updateThemeButtons() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    themeBtns.forEach(btn => {
        if ((btn.dataset.theme === 'dark' && isDarkTheme) || 
            (btn.dataset.theme === 'light' && !isDarkTheme)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 生成唯一ID
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// 格式化日期為 YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 渲染日曆
function renderCalendar() {
    // 更新月份和年份顯示
    const months = translations[currentLanguage].months;
    currentMonthYear.textContent = `${months[currentMonth]} ${currentYear}`;

    // 計算當前月份的第一天和最後一天
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // 計算上個月的最後幾天
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfWeek = firstDay.getDay(); // 0 = 星期日, 1 = 星期一, ...

    // 計算下個月的前幾天
    const lastDayOfWeek = lastDay.getDay();
    const nextDays = 6 - lastDayOfWeek;

    // 清空日曆
    calendarBody.innerHTML = '';

    // 獲取星期名稱
    const weekdays = translations[currentLanguage].weekdays;
    const tableHeader = calendarBody.parentElement.querySelector('thead tr');
    // Ensure tableHeader is found before attempting to modify it
    if (tableHeader) {
        tableHeader.innerHTML = ''; // 清空現有標頭
        weekdays.forEach(day => {
            tableHeader.innerHTML += `<th>${day}</th>`;
        });
    }

    // 創建日曆行
    let date = 1;
    let nextMonthDate = 1; // 初始化 nextMonthDate 變數
    
    // 計算需要的行數
    const totalDays = firstDayOfWeek + lastDay.getDate() + nextDays;
    const rows = Math.ceil(totalDays / 7);

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            
            // 上個月的日期
            if (i === 0 && j < firstDayOfWeek) {
                const prevDate = prevMonthLastDay - firstDayOfWeek + j + 1;
                cell.innerHTML = `<div class="date-number other-month">${prevDate}</div>`;
                cell.classList.add('other-month');
                
                // 設置上個月的日期資料
                const prevMonthDate = new Date(currentYear, currentMonth - 1, prevDate);
                cell.dataset.date = formatDate(prevMonthDate);
            } 
            // 當前月份的日期
            else if (date <= lastDay.getDate()) {
                const currentDateObj = new Date(currentYear, currentMonth, date);
                const dateStr = formatDate(currentDateObj);
                
                cell.innerHTML = `<div class="date-number">${date}</div>`;
                cell.dataset.date = dateStr;
                
                // 標記今天
                if (dateStr === formatDate(new Date())) {
                    cell.classList.add('today');
                }
                
                // 標記選中的日期
                if (selectedDate && dateStr === selectedDate) {
                    cell.classList.add('selected');
                }
                
                // 添加該日期的行程指示器
                const dateSchedules = schedules.filter(schedule => schedule.date === dateStr);
                if (dateSchedules.length > 0) {
                    // 創建行程圓點容器
                    const scheduleDots = document.createElement('div');
                    scheduleDots.className = 'schedule-dots';
                    
                    // 獲取該日期的所有行程類型
                    const uniqueTypes = [...new Set(dateSchedules.map(s => s.type))];
                    
                    // 最多顯示5個類型指示器
                    const maxDots = 5;
                    const displayTypes = uniqueTypes.slice(0, maxDots);
                    
                    // 創建類型圓點
                    displayTypes.forEach(typeId => {
                        const type = scheduleTypes.find(t => t.id === typeId) || scheduleTypes[0];
                        const dot = document.createElement('div');
                        dot.className = 'schedule-dot';
                        dot.style.backgroundColor = type.color;
                        scheduleDots.appendChild(dot);
                    });
                    
                    // 如果有更多行程，顯示 +n 更多
                    if (dateSchedules.length > maxDots) {
                        const moreDot = document.createElement('div');
                        moreDot.className = 'schedule-dot';
                        moreDot.style.backgroundColor = '#999';
                        moreDot.textContent = '+';
                        scheduleDots.appendChild(moreDot);
                    }
                    
                    cell.appendChild(scheduleDots);
                }
                
                date++;
            } 
            // 下個月的日期
            else {
                cell.innerHTML = `<div class="date-number other-month">${nextMonthDate}</div>`;
                cell.classList.add('other-month');
                
                // 設置下個月的日期資料
                const nextMonth = new Date(currentYear, currentMonth + 1, nextMonthDate);
                cell.dataset.date = formatDate(nextMonth);
                
                nextMonthDate++;
            }
            
            // 添加點擊事件
            cell.addEventListener('click', () => handleDateClick(cell.dataset.date));
            
            row.appendChild(cell);
        }
        
        calendarBody.appendChild(row);
    }
    
    // 更新行程資訊區域
    if (selectedDate) {
        updateScheduleInfo(selectedDate);
    } else {
        scheduleInfo.innerHTML = `<h3>${translations[currentLanguage].selectDate}</h3>`;
    }
}

// 處理年份和月份變更
function handleYearMonthChange() {
    currentYear = parseInt(yearDropdown.value);
    currentMonth = parseInt(monthDropdown.value);
    renderCalendar();
}

// 處理日期點擊
function handleDateClick(dateStr) {
    // 移除之前選擇的日期的高亮
    const prevSelected = document.querySelector('.calendar td.selected');
    if (prevSelected) {
        prevSelected.classList.remove('selected');
    }
    
    // 高亮當前選擇的日期
    const cells = document.querySelectorAll('.calendar td');
    for (let cell of cells) {
        if (cell.dataset.date === dateStr) {
            cell.classList.add('selected');
            break;
        }
    }
    
    selectedDate = dateStr;
    updateScheduleInfo(dateStr);
}

// 更新行程資訊區域
function updateScheduleInfo(dateStr) {
    const dateObj = new Date(dateStr);
    const formattedDate = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
    const weekdays = translations[currentLanguage].weekdays;
    const weekday = weekdays[dateObj.getDay()];
    
    const dateSchedules = schedules.filter(schedule => schedule.date === dateStr);
    
    let html = `
        <div class="schedule-date-header">
            <h3>${formattedDate} (${weekday})</h3>
            <button class="add-button" onclick="openAddScheduleModal('${dateStr}')">
                ${translations[currentLanguage].addSchedule}
            </button>
        </div>
    `;
    
    if (dateSchedules.length > 0) {
        html += '<div class="schedule-list">';
        
        // 按類型分組顯示行程
        const typeGroups = {};
        dateSchedules.forEach(schedule => {
            if (!typeGroups[schedule.type]) {
                typeGroups[schedule.type] = [];
            }
            typeGroups[schedule.type].push(schedule);
        });
        
        // 遍歷每個類型組
        Object.keys(typeGroups).forEach(typeId => {
            const type = scheduleTypes.find(t => t.id === typeId) || scheduleTypes[0];
            const scheduleGroup = typeGroups[typeId];
            
            // 為每個行程創建項目
            scheduleGroup.forEach(schedule => {
                html += `
                    <div class="schedule-item" onclick="openEditScheduleModal('${schedule.id}')">
                        <div class="schedule-type" style="background-color: ${type.color}; color: white;">
                            ${type.name}
                        </div>
                        <div class="schedule-details">
                            ${schedule.details}
                        </div>
                        <button class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                `;
            });
        });
        
        html += '</div>';
    } else {
        html += `<p class="no-schedules">${translations[currentLanguage].noSchedules}</p>`;
    }
    
    scheduleInfo.innerHTML = html;
}

// 打開新增行程模態框
function openAddScheduleModal(dateStr = null) {
    modalTitle.textContent = translations[currentLanguage].addSchedule;
    scheduleId.value = '';
    scheduleDate.value = dateStr || selectedDate || formatDate(new Date());
    scheduleType.value = 'default';
    scheduleDetails.value = '';
    deleteBtn.style.display = 'none';
    
    // 更新行程類型下拉選單
    updateScheduleTypeDropdown();
    
    scheduleModal.style.display = 'block';
}

// 打開編輯行程模態框
function openEditScheduleModal(id) {
    const schedule = schedules.find(s => s.id === id);
    if (!schedule) return;
    
    modalTitle.textContent = translations[currentLanguage].editSchedule;
    scheduleId.value = schedule.id;
    scheduleDate.value = schedule.date;
    scheduleType.value = schedule.type;
    scheduleDetails.value = schedule.details;
    deleteBtn.style.display = 'block';
    
    // 更新行程類型下拉選單
    updateScheduleTypeDropdown();
    
    scheduleModal.style.display = 'block';
}

// 關閉行程模態框
function closeScheduleModal() {
    scheduleModal.style.display = 'none';
}

// 處理行程提交
function handleScheduleSubmit(e) {
    e.preventDefault();
    
    const id = scheduleId.value || generateId();
    const date = scheduleDate.value;
    const type = scheduleType.value;
    const details = scheduleDetails.value;
    
    if (!date || !details) return;
    
    // 如果是編輯現有行程
    if (scheduleId.value) {
        const index = schedules.findIndex(s => s.id === scheduleId.value);
        if (index !== -1) {
            schedules[index] = { id, date, type, details };
        }
    } 
    // 如果是新增行程
    else {
        schedules.push({ id, date, type, details });
    }
    
    saveToLocalStorage();
    
    // 關閉模態框
    closeScheduleModal();
    
    // 更新日曆和行程資訊
    renderCalendar();
    if (selectedDate) {
        updateScheduleInfo(selectedDate);
    }
}

// 處理行程刪除
function handleScheduleDelete() {
    const id = scheduleId.value;
    if (!id) return;
    
    if (confirm(translations[currentLanguage].confirmDelete)) {
        const index = schedules.findIndex(s => s.id === id);
        if (index !== -1) {
            schedules.splice(index, 1);
            
            // 儲存資料
            saveToLocalStorage();
            
            // 關閉模態框
            closeScheduleModal();
            
            // 更新日曆和行程資訊
            renderCalendar();
            if (selectedDate) {
                updateScheduleInfo(selectedDate);
            }
        }
    }
}

// 更新行程類型下拉選單
function updateScheduleTypeDropdown() {
    scheduleType.innerHTML = '';
    for (let type of scheduleTypes) {
        const option = document.createElement('option');
        option.value = type.id;
        option.textContent = type.name;
        option.style.color = type.color;
        scheduleType.appendChild(option);
    }
}

// 打開標題編輯模態框
function openTitleModal() {
    calendarTitleInput.value = calendarTitle;
    titleModal.style.display = 'block';
}

// 儲存標題
function saveTitle() {
    const newTitle = calendarTitleInput.value.trim();
    if (newTitle) {
        calendarTitle = newTitle;
        calendarTitleElement.textContent = calendarTitle;
        
        // 儲存資料
        saveToLocalStorage();
        
        titleModal.style.display = 'none';
    }
}

// 打開新增類型模態框
function openAddTypeModal() {
    typeName.value = '';
    // 重置顏色選擇器
    document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    const firstColor = document.querySelector('.color-option');
    if (firstColor) {
        firstColor.classList.add('selected');
        typeColor.value = firstColor.dataset.color;
    }
    
    addTypeModal.style.display = 'block';
}

// 儲存行程類型
function saveScheduleType() {
    const name = typeName.value.trim();
    const color = typeColor.value;
    
    if (!name || !color) return;
    
    const id = generateId();
    scheduleTypes.push({ id, name, color });
    
    // 儲存資料
    saveToLocalStorage();
    
    // 關閉模態框
    addTypeModal.style.display = 'none';
    
    // 更新行程類型下拉選單
    updateScheduleTypeDropdown();
}

// 打開刪除類型模態框
function openDeleteTypeModal() {
    // 更新類型下拉選單
    deleteTypeSelect.innerHTML = '';
    for (let i = 1; i < scheduleTypes.length; i++) { // 跳過預設類型
        const type = scheduleTypes[i];
        const option = document.createElement('option');
        option.value = type.id;
        option.textContent = type.name;
        option.style.color = type.color;
        deleteTypeSelect.appendChild(option);
    }
    
    // 如果沒有可刪除的類型
    if (deleteTypeSelect.options.length === 0) {
        alert('沒有可刪除的類型');
        return;
    }
    
    deleteTypeModal.style.display = 'block';
}

// 刪除行程類型
function deleteScheduleType() {
    const id = deleteTypeSelect.value;
    if (!id) return;
    
    if (confirm(translations[currentLanguage].confirmDeleteType)) {
        const index = scheduleTypes.findIndex(t => t.id === id);
        if (index !== -1) {
            // 將使用此類型的行程重新分配到預設類型
            schedules.forEach(schedule => {
                if (schedule.type === id) {
                    schedule.type = 'default';
                }
            });
            
            // 刪除類型
            scheduleTypes.splice(index, 1);
            
            // 儲存資料
            saveToLocalStorage();
            
            // 關閉模態框
            deleteTypeModal.style.display = 'none';
            
            // 更新行程類型下拉選單
            updateScheduleTypeDropdown();
            
            // 更新日曆和行程資訊
            renderCalendar();
            if (selectedDate) {
                updateScheduleInfo(selectedDate);
            }
        }
    }
}

// 創建新日曆
function createNewCalendar() {
    if (confirm('確定要創建新的日曆嗎？這將清除所有現有的行程和類型。')) {
        schedules = [];
        scheduleTypes = [{
            id: 'default',
            name: translations[currentLanguage].default || '預設',
            color: '#1890ff'
        }];
        calendarTitle = "行程月曆";
        calendarTitleElement.textContent = calendarTitle;
        selectedDate = null;
        
        // 儲存資料
        saveToLocalStorage();
        
        // 更新日曆
        renderCalendar();
    }
}

// 從檔案載入日曆
function loadCalendarFromFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            if (data.schedules && data.scheduleTypes && data.calendarTitle) {
                schedules = data.schedules;
                scheduleTypes = data.scheduleTypes;
                calendarTitle = data.calendarTitle;
                calendarTitleElement.textContent = calendarTitle;
                
                // 儲存資料
                saveToLocalStorage();
                
                // 更新日曆
                renderCalendar();
            }
        } catch (error) {
            alert('無法讀取檔案：' + error.message);
        }
    };
    reader.readAsText(file);
    
    // 重置檔案輸入
    e.target.value = null;
}

// 將日曆儲存到檔案
function saveCalendarToFile() {
    const data = {
        schedules,
        scheduleTypes,
        calendarTitle
    };
    
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    calendarDownloadLink.href = url;
    calendarDownloadLink.download = `${calendarTitle}.json`;
    calendarDownloadLink.click();
    
    URL.revokeObjectURL(url);
}

// 更新語言
function updateLanguage(lang) {
    currentLanguage = lang;
    
    // 更新語言按鈕
    langBtns.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 更新月份下拉選單
    updateMonthDropdown();
   
    
    // 更新按鈕文字
    newCalendarBtn.textContent = translations[lang].newCalendar;
    loadCalendarBtn.textContent = translations[lang].loadCalendar;
    saveCalendarBtn.textContent = translations[lang].saveCalendar;
    addScheduleBtn.textContent = translations[lang].addSchedule;

    // 更新模態框標題文字
    // Update schedule modal
    if (scheduleModal) {
        // Update title based on whether it's add or edit
        const modalTitleElement = scheduleModal.querySelector('#modal-title');
        if (modalTitleElement) {
             // Check scheduleId value to determine if it's edit mode
             if (scheduleId.value) {
                 modalTitleElement.textContent = translations[lang].editSchedule; // Assuming scheduleId has a value in edit mode
             } else {
                 modalTitleElement.textContent = translations[lang].addSchedule;
             }
        }
        
        // Update labels
        scheduleModal.querySelector('label[for="schedule-date"]').textContent = translations[lang].date;
        scheduleModal.querySelector('label[for="schedule-type"]').textContent = translations[lang].scheduleType;
        scheduleModal.querySelector('label[for="schedule-details"]').textContent = translations[lang].details;

        // Update buttons
        scheduleModal.querySelector('button.save-button[type="submit"]').textContent = translations[lang].save;
        scheduleModal.querySelector('#delete-btn').textContent = translations[lang].delete;
    }

    // Update title edit modal
    if (titleModal) {
        titleModal.querySelector('.modal-header h3').textContent = translations[lang].editTitle;
        titleModal.querySelector('label[for="calendar-title-input"]').textContent = translations[lang].calendarTitle;
        titleModal.querySelector('#calendar-title-input').placeholder = translations[lang].calendarTitle; // Assuming same key for placeholder
        titleModal.querySelector('#save-title-btn').textContent = translations[lang].save;
    }

    // Update add type modal
    if (addTypeModal) {
        addTypeModal.querySelector('.modal-header h3').textContent = translations[lang].addType;
        addTypeModal.querySelector('label[for="type-name"]').textContent = translations[lang].typeName;
        addTypeModal.querySelector('label[for="type-color"]').textContent = translations[lang].typeColor;
        addTypeModal.querySelector('#type-name').placeholder = translations[lang].typeName; // Assuming same key for placeholder
        addTypeModal.querySelector('#save-type-btn').textContent = translations[lang].save;
    }

    // Update delete type modal
    if (deleteTypeModal) {
        deleteTypeModal.querySelector('.modal-header h3').textContent = translations[lang].deleteType;
        deleteTypeModal.querySelector('label[for="delete-type-select"]').textContent = translations[lang].selectTypeToDelete;
        deleteTypeModal.querySelector('#confirm-delete-type-btn').textContent = translations[lang].delete;
 }

    // 更新主頁面上的類型管理按鈕
    const addTypeBtn = document.getElementById('add-type-btn');
    if (addTypeBtn) {
        addTypeBtn.textContent = translations[lang].addType;
    }
    const deleteTypeBtn = document.getElementById('delete-type-btn');
    if (deleteTypeBtn) {
        deleteTypeBtn.textContent = translations[lang].deleteType;
        }

    // 更新日曆
    renderCalendar();

    // 更新行程資訊
    if (selectedDate) {
        updateScheduleInfo(selectedDate);
    }
}
