import Dockerode, { ImageInfo } from "dockerode";


export class Dockerizer {
  docker: Dockerode;


  constructor(socketPath: string = "/var/run/docker.sock") {
    this.docker = new Dockerode({
      socketPath,
    });
  }

  getDockerInstance(): Dockerode {
    return this.docker;
  }

  getIsDockerConnected(): Promise<boolean> {
    return this.docker.ping()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      })
  }

  createNewContainer() {
    return this.docker.createContainer({
      Image: "hello-world",
      AttachStdout: true
    })
  }

  listImages(): Promise<string[]> {
    return this.docker.listImages()
      .then((images: ImageInfo[]) => {
        return images.map((image: ImageInfo) => { return image.Id });
      })
      .catch((reason: any) => {
        throw reason;
      })
  }
}

