export class Recipe {
  name: string;
  description: string;
  imagePath: string;

  constructor(name: string, description: string, imagePath: string) {
    this.description = description;
    this.name = name;
    this.imagePath = imagePath;
  }
}
