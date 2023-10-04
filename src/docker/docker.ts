import Dockerode from "dockerode";

export class Dockerizer {
  private dockerode: Dockerode;

  constructor(options: Dockerode.DockerOptions) {
    this.dockerode = new Dockerode(options);
  }

  async getIsDockerConnected(): Promise<boolean> {
    try {
      await this.dockerode.ping();
      return true;
    } catch (e) {
      return false;
    }
  }

  async createNewContainer(image: string = "hello-world"): Promise<Dockerode.Container> {
    try {
      const fetchedImage = this.dockerode.getImage(image);
      if (fetchedImage) {
        return this.dockerode.createContainer({
          Image: fetchedImage.id
        });
      } else {
        throw new Error("Image Not Found!");
      }
    } catch (reason) {
      throw reason;
    }
  }

  removeImage(image: Dockerode.Image): Promise<void> {
    return image.remove();
  }

  removeContainer(container: Dockerode.Container): Promise<void> {
    return container.remove();
  }


  pullImage(image: string, options?: {}): Promise<Dockerode.Image> {
    return this.dockerode.pull(image, options);
  }

  getAsyncOrPullImage(image: string, options?: {}): Promise<Dockerode.Image> {
    return this.dockerode.getImage(image) ? new Promise((resolve) => { resolve(this.dockerode.getImage(image)) }) : this.dockerode.pull(image, options)
  }

  getAsyncContainer(container: string): Promise<Dockerode.Container> {
    return new Promise(resolve => { resolve(this.dockerode.getContainer(container)) });
  }
}

