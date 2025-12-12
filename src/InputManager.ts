export class InputManager {
  private readonly minimumDistance = 30;
  private startX: number = 0;
  private startY: number = 0;
  public onCall: (direction: string) => void = () => {};

  setup() {
    window.addEventListener("touchstart", (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        this.startX = touch.pageX;
        this.startY = touch.pageY;
      }
    });

    window.addEventListener("touchend", (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (!touch) {
        return;
      }

      const endX = touch.pageX;
      const endY = touch.pageY;

      const distanceX = Math.abs(endX - this.startX);
      const distanceY = Math.abs(endY - this.startY);

      if (distanceX > distanceY && distanceX > this.minimumDistance) {
        if (endX - this.startX > 0) {
          this.onCall("right")
        } else {
          this.onCall("left")
        }
      }

      if (distanceX < distanceY && distanceY > this.minimumDistance) {
        if (endY - this.startY < 0) {
          this.onCall("up")
        } else {
          this.onCall("down")
        }
      }
    });
  }
}
