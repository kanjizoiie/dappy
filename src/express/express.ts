import * as http from "http";

class HTTP {
    server: http.Server;
    constructor() {
        this.server = http.createServer((req, res) => {
            req.on("data", _chunk => {
                console.log("Gello")
            })
        }).listen(7000);

    }
}


