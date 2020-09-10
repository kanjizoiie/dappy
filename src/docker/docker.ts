import Dockerode from "dockerode";


export function connect(socketPath: string = "/var/run/docker.sock"): Dockerode {
    return new Dockerode({
        socketPath: socketPath
    });
}

export function create_stack(docker: Dockerode): string {
    return "Done";
}