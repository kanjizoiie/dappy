import Dockerode from "dockerode";
import "jest";

import { Dockerizer } from "./docker";

describe("Verify that we can connect to docker", () => {
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
});

describe("Verify that we can connect to docker and run containers.", () => {
    it("Connect and run hello-world container.", () => {
        const docker: Dockerizer = new Dockerizer();

        docker.getIsDockerConnected()
            .then(result => {
                expect(result).toBeTruthy();
            })
            .catch(result => {
                fail(result);
            })

        docker.createNewContainer()
            .then((container: Dockerode.Container) => {
                expect(container).toBeTruthy();
            })
            .catch(reason => {
                fail(reason);
            })
    });

    it("Connect and run run node container.", () => {
        const docker: Dockerizer = new Dockerizer();
        docker.createNewContainer("node:12.0")
            .then((container: Dockerode.Container) => {
                expect(container).toBeTruthy();
            })
            .catch(reason => {
                fail(reason);
            })
    });
});

describe("Verify that we can remove images from the local host", () => {
    it("Remove all containers", () => {
        const docker: Dockerizer = new Dockerizer();


        docker.createNewContainer("node:12.0")
            .then((container: Dockerode.Container) => {
                expect(container).toBeTruthy();
            })
            .catch(reason => {
                fail(reason);
            })

        docker.removeImages()
            .then((container: Dockerode.Container) => {
                expect(container).toBeTruthy();
            })
            .catch(reason => {
                fail(reason);
            })
    });
});
