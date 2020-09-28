import Dockerode from "dockerode";




export class Dockerizer {
  docker: Dockerode;

  constructor(socketPath: string = "/var/run/docker.sock") {
    this.docker = new Dockerode({
      socketPath,
    });
  }

  async getIsDockerConnected(): Promise<boolean> {
    try {
      await this.docker.ping();
      return true;
    } catch (e) {
      return false;
    }
  }

  async createNewContainer(image: string = "hello-world"): Promise<Dockerode.Container> {
    try {
      return this.docker.createContainer({
        Image: image
      });
    } catch (e) {
      try {
        const fetchedImage = await this.getImage(image);
        try {
          return this.docker.createContainer({
            Image: fetchedImage.id
          });
        } catch (reason) {
          throw reason;
        }
      } catch (reason_1) {
        throw reason_1;
      }
    }
  }

  async removeImages(filter?: (image: Dockerode.ImageInfo, index: number) => Dockerode.ImageInfo[]): Promise<Dockerode.ImageInfo[]>{
    const imageInfos = await this.listImages(filter);
    imageInfos.map(async imageInfo => {
      const image = await this.getImage(imageInfo.Id);
      this.removeImage(image);
    });
  }

  removeImage(image: Dockerode.Image) : Promise<void> {
    return image.remove();
  }

  async listImages(filter?: (image: Dockerode.ImageInfo, index: number) => Dockerode.ImageInfo[]): Promise<Dockerode.ImageInfo[]> {
    const images = await this.docker.listImages();
    return images.filter(filter ? filter : image => image);
  }

  async listVolumes(filter?: (volume: Dockerode.VolumeInspectInfo, index: number) => Dockerode.VolumeInspectInfo): Promise<Dockerode.VolumeInspectInfo[]> {
    const volumes = await this.docker.listVolumes();
    return volumes.Volumes.filter(filter ? filter : volume => volume);
  }

  async listContainters(filter?: (container: Dockerode.ContainerInfo, index: number) => Dockerode.ContainerInfo): Promise<Dockerode.ContainerInfo[]> {
    const containers = await this.docker.listContainers();
    return containers.filter(filter ? filter : container => container);
  }


  pullImage(image: string, options?: {}) : Promise<Dockerode.Image> {
    return this.docker.pull(image, options);
  }

  getImage(image: string, options?: {}) : Promise<Dockerode.Image> {
    return this.docker.getImage(image) ? new Promise((resolve) => { resolve(this.docker.getImage(image)) }) : this.pullImage(image, options)
  }
}

