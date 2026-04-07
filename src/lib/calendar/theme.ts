type CalendarMonthImage = {
  months: number[];
  image: string;
};

export const calendarMonthImages: CalendarMonthImage[] = [
  {
    months: [0],
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [1],
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [2],
    image:
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [3],
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [4],
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [5],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [6],
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [7],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [8],
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [9],
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [10],
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    months: [11],
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80",
  },
];

export function getMonthImage(month: number) {
  return (
    calendarMonthImages.find((entry) => entry.months.includes(month))?.image ??
    calendarMonthImages[0].image
  );
}
