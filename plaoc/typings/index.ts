export class ManifestEntry {
  url = null;
  method = "GET";
  contentType = "application/json";
  constructor(
    url: string,
    method: Mathod = Mathod.GET,
    contentType: string = "application/json"
  ) {
    url;
    method;
    contentType;
  }
  public getUrl() {
    return this.url;
  }
}

export enum Mathod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}
