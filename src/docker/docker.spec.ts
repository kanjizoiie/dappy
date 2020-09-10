import "jest";

import { connect } from "./docker";
import Dockerode from "dockerode";

describe("Verify that we can connect to docker in different ways.", () => {
    it("Test with default docker connection over internal docker socket", () => {
        const docker: Dockerode = connect();
        expect(docker).toBeTruthy();
    });

    it("Test with web docker connection over localhost", () => {
        const docker: Dockerode = connect("localhost");
        expect(docker).toBeTruthy();
    });
})