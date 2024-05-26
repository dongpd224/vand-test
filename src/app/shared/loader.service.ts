import { Injectable, signal } from "@angular/core";

@Injectable({   providedIn: 'root'})
export default class LoaderService {
  public loader = signal(false);
  setLoading(value : boolean = true) {
    this.loader.set(value)
  }
}