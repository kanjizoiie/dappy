import "jest";
import HTTP from "./express";

describe("Server is opened", () => {
  it("If we instantiate the server does it start?", () => {
    const http = new HTTP()
    expect(http.server).toBeTruthy();
    expect(http.serverOpen).toBeTruthy();
    http.close();
  });

})