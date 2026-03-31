"use client";
import "./starrating.css"
type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function StarRating({ value, onChange }: Props) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    star: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;

    const isHalf = clickX < width / 2;
    const newValue = isHalf ? star - 0.5 : star;

    onChange(newValue);
  };

  return (
    <div className="star-rating">
      {stars.map((star) => {
        let fill = 0;

        if (value >= star) fill = 100;
        else if (value >= star - 0.5) fill = 50;

        return (
          <div
            key={star}
            className="star-container"
            onClick={(e) => handleClick(e, star)}
          >
            <div className="star-bg">★</div>
            <div
              className="star-fill"
              style={{ width: `${fill}%` }}
            >
              ★
            </div>
          </div>
        );
      })}
    </div>
  );
}