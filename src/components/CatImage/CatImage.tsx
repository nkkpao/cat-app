import React from "react";
import styles from "./CatImage.module.scss";

interface CatImageProps {
  imageUrl: string | null;
}

const CatImage: React.FC<CatImageProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <div className={styles.imageWrapper}>
      <img src={imageUrl} alt="Random Cat" className={styles.image} />
    </div>
  );
};

export default CatImage;
