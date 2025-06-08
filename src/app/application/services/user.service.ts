import { Injectable, Signal, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserService {
  private avatarPhotoUrl = signal<string | null>(null);

  public setAvatar(url: string): void {
    this.avatarPhotoUrl.set(url);
  }

  public getAvatar(): string | null {
    return this.avatarPhotoUrl();
  }
}
