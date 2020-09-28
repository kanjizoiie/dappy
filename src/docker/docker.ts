import Dockerode from "dockerode";


export class Dockerizer {
  docker: Dockerode;


  constructor(socketPath: string = "/var/run/docker.sock") {
    this.docker = new Dockerode({
      socketPath,
    });
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

  createNewContainer(image: string = "hello-world"): Promise<Dockerode.Container> {
    return this.docker.createContainer({
      Image: image
    })
    .catch(() => {
      return this.getImage(image)
        .then(fetchedImage => {
          return this.docker.createContainer({
            Image: fetchedImage.id
          })
          .catch(reason => {
            throw reason;
          });
        })
        .catch(reason => {
          throw reason;
        });
    })
  }

  removeImages(filter?: (image: Dockerode.ImageInfo, index: number) => Dockerode.ImageInfo[]) {
    return this.listImages(filter)
      .then(imageInfos => {
        imageInfos.map(imageInfo => {
          return this.getImage(imageInfo.Id)
            .then(image => {
              return this.removeImage(image)
                .catch(reason => {
                  throw reason
                });
            });
        });
      })
      .catch(reason => {
        throw reason;
      });
  }

  removeImage(image: Dockerode.Image) : Promise<void> {
    return image.remove();
  }

  listImages(filter?: (image: Dockerode.ImageInfo, index: number) => Dockerode.ImageInfo[]): Promise<Dockerode.ImageInfo[]> {
    return this.docker.listImages()
      .then(images => {
        return images.filter(filter ? filter : image => image)
      })
      .catch(reason => {
        throw reason;
      })
  }

  pullImage(image: string, options?: {}) : Promise<Dockerode.Image> {
    return this.docker.pull(image, options);
  }

  getImage(image: string, options?: {}) : Promise<Dockerode.Image> {
    return this.docker.getImage(image) ? new Promise((resolve, reject) => { resolve(this.docker.getImage(image)) }) : this.pullImage(image, options)
  }
}

