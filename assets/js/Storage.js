class Storage {
    static addToStorage(newMission) {
        let queue = this.getItemsFromStorage();

        queue.push(newMission)

        localStorage.setItem("queue", JSON.stringify(queue))
    }

    static getItemsFromStorage() {
        let queue
        if (localStorage.getItem("queue") === null) {
            queue = [];
        }
        else {
            queue = JSON.parse(localStorage.getItem("queue"))
        }
        return queue
    }
    static removeAll(){
        localStorage.removeItem("queue")
    }
}