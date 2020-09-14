import Dockerode from "dockerode";
import "jest";

import { Dockerizer } from "./docker";

describe("Verify that we can connect to docker in different ways.", () => {
    it("Test with default docker connection over internal docker socket", () => {
        const docker: Dockerizer = new Dockerizer();

        docker.getIsDockerConnected()
            .then(result => {
                expect(result).toBeTruthy();
            })
            .catch(result => {
                fail(result);
            })

    });
})

describe("Verify that we can connect to docker and run the hello world container.", () => {
    it("Connect and run Hello World container.", () => {
        const docker: Dockerizer = new Dockerizer();
        docker.createNewContainer()
            .then((container: Dockerode.Container) => {
                expect(container).toBeTruthy();
            })
    });
})

