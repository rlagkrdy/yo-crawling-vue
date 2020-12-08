export interface MetaSelectorProperty {
  key: string;
  selector: string;
}

export interface MetaData {
  title: string,
  description: string,
  url: string,
  image: string,
  author: string,
  keywords: string[],
  date: Date | undefined
}
