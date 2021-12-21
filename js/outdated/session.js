
class SmartSession {
    constructor(data, name) {
        self.data = data;
        self.name = name;


    }

    createSession() {

        self.session = localStorage.setItem(self.name, JSON.stringify(self.data));

    }


    destroySession() {
        localStorage.removeItem(self.name);

    }
}

export { SmartSession };