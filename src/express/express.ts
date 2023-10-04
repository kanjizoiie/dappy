import * as http from "http";

export default class HTTP {
  server: http.Server;
  constructor() {
    this.server = http.createServer(
      (req, res) => {
        req.on("data", _chunk => {
          res.statusCode = 200;
          res.write(_chunk);
        })
      }).listen(7000);
  }

  serverOpen(): boolean {
    return this.server.listening;
  }

  close(): void {
    this.server.close();
  }
}


