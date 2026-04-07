const pageTurnExitDuration = 220;
const pageTurnEnterDuration = 320;

function resetAnimatedFace(faceElement: HTMLDivElement) {
  faceElement.style.transform = "";
  faceElement.style.opacity = "";
  faceElement.style.filter = "";
  faceElement.style.transformOrigin = "";
}

export function animateCalendarFaceMonthChange(options: {
  faceElement: HTMLDivElement;
  currentMonth: Date;
  nextMonth: Date;
  onMonthSwap: () => void;
  onComplete: () => void;
}) {
  const { faceElement, currentMonth, nextMonth, onMonthSwap, onComplete } =
    options;
  const turnsForward = nextMonth.getTime() > currentMonth.getTime();
  const exitRotate = turnsForward ? -72 : 72;
  const enterRotate = turnsForward ? 72 : -72;
  const exitOrigin = turnsForward ? "center top" : "center bottom";
  const enterOrigin = turnsForward ? "center bottom" : "center top";

  const exitAnimation = faceElement.animate(
    [
      {
        opacity: 1,
        transform: "perspective(2000px) rotateX(0deg) scale(1)",
        filter: "brightness(1)",
        transformOrigin: exitOrigin,
      },
      {
        opacity: 0.12,
        transform: `perspective(2000px) rotateX(${exitRotate}deg) scale(0.985)`,
        filter: "brightness(0.88)",
        transformOrigin: exitOrigin,
      },
    ],
    {
      duration: pageTurnExitDuration,
      easing: "cubic-bezier(0.45, 0, 0.65, 1)",
      fill: "forwards",
    },
  );

  exitAnimation.onfinish = () => {
    onMonthSwap();

    requestAnimationFrame(() => {
      const entryAnimation = faceElement.animate(
        [
          {
            opacity: 0.12,
            transform: `perspective(2000px) rotateX(${enterRotate}deg) scale(0.985)`,
            filter: "brightness(0.88)",
            transformOrigin: enterOrigin,
          },
          {
            opacity: 1,
            transform: "perspective(2000px) rotateX(0deg) scale(1)",
            filter: "brightness(1)",
            transformOrigin: enterOrigin,
          },
        ],
        {
          duration: pageTurnEnterDuration,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          fill: "forwards",
        },
      );

      entryAnimation.onfinish = () => {
        resetAnimatedFace(faceElement);
        onComplete();
      };

      entryAnimation.oncancel = () => {
        resetAnimatedFace(faceElement);
        onComplete();
      };
    });
  };

  exitAnimation.oncancel = () => {
    resetAnimatedFace(faceElement);
    onComplete();
  };
}
