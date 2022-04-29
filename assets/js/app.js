const form_queue = document.getElementById("form_queue")
const targetElement = document.getElementById("target")
const jobElement = document.getElementById("job")
const sub_body = document.getElementById("sub-card-body")
const panel = document.getElementById("Panel")
const first_list = document.getElementById("queue_of_missons")
const send_data = document.getElementById("send")

let last_stop = ""
let is_full

eventListener();

function eventListener() {
    document.addEventListener("DOMContentLoaded", function () {
        let data = Storage.getItemsFromStorage()
        UI.loadData(data)
    })
    panel.addEventListener("click", Panel)
}

function Panel(e) {
    if (e.target.id == "clear-all") {
        UI.removeAll(first_list)
        Storage.removeAll()
        last_stop = ""
        is_full = false
    }
    if (e.target.id == "send") {
        let data = Storage.getItemsFromStorage()
        let strData = JSON.stringify(data)
        let i
        for (i = 0; i < strData.length; i++) {
            strData = strData.replace(`"`, "")
        }
        var request = new ROSLIB.ServiceRequest({
            data: strData,
        });


        sendRoute.callService(request, function (result) {
            if (result == "correct")
                console.log("service is working correctly ")
            else
                console.log("it's not working")
            // todo: bu kısımda uı'daki şeyler kitlenecek bütün etkileşimler kısıtlanacak sadece izleyebileceğiz (sadece görevi durdur açık kalacak)
        });
    }
    if (e.target.id == "command") {
        let strData = "start"
        var request = new ROSLIB.ServiceRequest({
            data: strData,
        });
        sendCommand.callService(request, function (result) {
            if (result == "correct")
                console.log("service is working correctly ")
            else
                console.log("it's not working")
        });
    }
    if (e.target.id == "add") {
        const target = targetElement.value;
        const job = jobElement.value;
        //todo: seçimleri dinamik yap
        if (target == "-") {
            UI.displayMessage("lütfen gidilecek bir rota gir", "warning")
        }
        else if (last_stop == target) {
            UI.displayMessage("zaten o noktadasın yeni bir hedef belirle", "danger")
        }
        else if (is_full == false && job == "yük bırakılacak") {
            UI.displayMessage("üzerinde yük yok! yük bırakamzsın", "danger")
        }
        else if (is_full == true && job == "yük alınacak") {
            UI.displayMessage("üzerinde yük var! yük alamazsın", "danger")
        }
        else {
            id = document.getElementById("queue_of_missons").childElementCount
            const newMission = new Mission(id + 1, target, job, 0);
            Storage.addToStorage(newMission)
            UI.addToUi(newMission);
            UI.displayMessage("rota sıraya eklendi", "success")
            last_stop = target
            if (job == "yük alınacak") is_full = true
            else if (job == "yük bırakılacak") is_full = false
        }
    }
}