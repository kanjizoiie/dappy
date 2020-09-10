import "dockerode";
import Dockerode from "dockerode";

let docker = new Dockerode({
    socketPath: "/var/run/docker.sock",
});

docker.listContainers()