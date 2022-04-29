class UI {
    static addToUi(newMission) {
        const list = document.getElementById("queue_of_missons")
        list.innerHTML +=
            `<tr>
        <td>${newMission.id}</td>
        <td>${newMission.target}</td>
        <td>${newMission.job}</td>
    </tr>`;
    }

    static displayMessage(data, type) {
        const region = document.getElementById("messages")
        const div = document.createElement("div")
        div.className = `alert alert-${type} alert-dismissible fade show`
        div.role = 'alert'
        div.textContent = data
        region.appendChild(div)

        setTimeout(function () {
            div.remove();
        }, 1500)
    }
    static loadData(data) {
        var list = document.getElementById("queue_of_missons")
        data.forEach(element => {
            list.innerHTML +=
                `<tr>
                    <td>${element.id}</td>
                    <td>${element.target}</td>
                    <td>${element.job}</td>
                </tr>`;
        });
    }
    static removeAll(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild)
        }
    }
}