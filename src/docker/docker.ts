import Dockerode from "dockerode";

export class Dockerizer extends Dockerode{

  constructor(options?: any) {
    super(options);
  }

  async getIsDockerConnected(): Promise<boolean> {
    try {
      await this.ping();
      return true;
    } catch (e) {
      return false;
    }
  }

  async createNewContainer(image: string = "hello-world"): Promise<Dockerode.Container> {
    try {
      const fetchedImage = await this.getImage(image);
      return this.createContainer({
        Image: fetchedImage.id
      });
    } catch (reason) {
      throw reason;
    }
  }

  async removeImages(filter?: (image: Dockerode.ImageInfo, index: number) => Dockerode.ImageInfo[]): Promise<any> {
    const imageInfos = await this.filteredListImages(filter);
    imageInfos.map(async imageInfo => {
      const image = await this.getImage(imageInfo.Id);
      return this.removeImage(image);
    });
  }

  async removeContainers(filter?: (container: Dockerode.ContainerInfo, index: number) => Dockerode.ContainerInfo): Promise<any> {
    const containerInfos = await this.listContainters(filter);
    containerInfos.map(async containerInfo => {
      const container = await this.getContainer(containerInfo.Id);
      return this.removeContainer(container);
    });
  }

  removeImage(image: Dockerode.Image): Promise<void> {
    return image.remove();
  }

  removeContainer(container: Dockerode.Container): Promise<void> {
    return container.remove();
  }

  
  async filteredListImages(filter?: (image: Dockerode.ImageInfo, index: number) => Dockerode.ImageInfo[]): Promise<Dockerode.ImageInfo[]> {
    const images = await this.filteredListImages();
    return images.filter(filter ? filter : image => image);
  }

  async filteredListVolumes(filter?: (volume: Dockerode.VolumeInspectInfo, index: number) => Dockerode.VolumeInspectInfo): Promise<Dockerode.VolumeInspectInfo[]> {
    const volumes = await this.();
    return volumes.filter(filter ? filter : volume => volume);
  }

  async listContainters(filter?: (container: Dockerode.ContainerInfo, index: number) => Dockerode.ContainerInfo): Promise<Dockerode.ContainerInfo[]> {
    const containers = await this.listContainers();
    return containers.filter(filter ? filter : container => container);
  }


  pullImage(image: string, options?: {}): Promise<Dockerode.Image> {
    return this.pull(image, options);
  }

  getAsyncOrPullImage(image: string, options?: {}): Promise<Dockerode.Image> {
    return this.getImage(image) ? new Promise((resolve) => { resolve(this.getImage(image)) }) : this.pullImage(image, options)
  }

  getAsyncContainer(container: string): Promise<Dockerode.Container> {
    return new Promise(resolve => { resolve(this.getContainer(container)) });
  }
}

