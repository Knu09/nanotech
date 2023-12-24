const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days"),
    prevNextIcon = document.querySelectorAll(".icons")

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

console.log(date, currYear, currMonth);

const months = ["January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"]

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth).getDay(), // first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // last date of previous month


    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // li for previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i < lastDateofMonth + 1; i++) { // li for all days of current month
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                                && currYear === new Date().getFullYear() ? "active" : "";

        liTag += `<li class="${isToday} default">${i}</li>`;
    }

    for (let i = lastDayofMonth;i < 6; i++) { // li for next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }


    let previousElement = null;

    function resetPrevious() {
        if(previousElement){
            previousElement.classList.remove('selected');
            previousElement.classList.add('default');
        }
    }

    function handleClick(event) {
        const clickedElement = event.target;

        resetPrevious();

        if (clickedElement === previousElement) {
            previousElement = null;
            return;
        }

        if (clickedElement.classList.contains('inactive')) {
            return;
        }

        clickedElement.classList.remove('default');
        clickedElement.classList.add('selected')

        previousElement = clickedElement;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    const dayElements = document.querySelectorAll('.days li')

    dayElements.forEach(element => {
       element.addEventListener('click', handleClick)
    });
}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // checks if the current month is exceeding 12 or subceeding 1
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // update new date year
            currMonth = date.getMonth(); //update new date month
        } else {
            date = new Date();
        }

        renderCalendar();
    })
})


