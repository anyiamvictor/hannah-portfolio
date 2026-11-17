
import { useCallback, useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import styles from "./CreativeShowcase.module.scss";


//GRAPHICS
const conceptGraphics = new Set([9, 11, 12]);

const graphics = Array.from({ length: 12 }, (_, i) => {
  const number = i + 1;
  const isConcept = conceptGraphics.has(number);

  return {
    id: `graphic-${number}`,
    title: isConcept
      ? "Creative Concept"
      : "Client Promotional Design",
    src: `/images/creative/graphics/graphic-${number}.jpg`,
    mediaType: "image",
    type: isConcept ? "concept" : "client",
    ...(isConcept && {
      disclaimer:
        "Independent creative exploration. Not commissioned by or affiliated with the featured brand.",
    }),
  };
});

//VIDEOS
const videos = Array.from({ length: 2 }, (_, i) => ({
  id: `video-${i + 1}`,
  src: `/images/creative/videos/video-${i + 1}.mp4`,
  poster: `/images/creative/videos/video-${i + 1}.jpg`,
  mediaType: "video",
  type: "client",
}));

const categories = [
  { id: "graphics", label: "Flyers & Graphics", icon: ImageIcon },
  { id: "videos", label: "Videos & Reels", icon: Video },
];

export default function CreativeShowcase() {
  const [activeCategory, setActiveCategory] = useState("graphics");
  const [activeItem, setActiveItem] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  // Correct media type detection
  const isVideo = activeItem?.mediaType === "video";

  const currentItems =
    activeCategory === "graphics" ? graphics : videos;

  const openGraphic = (item) => {
    setActiveItem({ ...item, mediaType: "graphic" });
  };

  const openVideo = (item) => {
    setActiveItem({ ...item, mediaType: "video" });
  };

  const closePreview = useCallback(() => {
    setActiveItem(null);
    setTouchStart(null);
  }, []);

  // Navigate between graphics
  const navigateGraphic = useCallback(
    (direction) => {
      if (!activeItem || activeItem.mediaType !== "graphic") {
        return;
      }

      const currentIndex = graphics.findIndex(
        (item) => item.id === activeItem.id
      );

      const nextIndex =
        (currentIndex + direction + graphics.length) %
        graphics.length;

      setActiveItem({
        ...graphics[nextIndex],
        mediaType: "graphic",
      });
    },
    [activeItem]
  );

  // Keyboard navigation and background scroll locking
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePreview();
      }

      if (activeItem.mediaType === "graphic") {
        if (event.key === "ArrowLeft") {
          navigateGraphic(-1);
        }

        if (event.key === "ArrowRight") {
          navigateGraphic(1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeItem, closePreview, navigateGraphic]);

  // Mobile swipe navigation
  const handleTouchStart = (event) => {
    setTouchStart(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null || isVideo) return;

    const touchEnd = event.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;

    if (Math.abs(difference) > 60) {
      navigateGraphic(difference > 0 ? 1 : -1);
    }

    setTouchStart(null);
  };

  // Client / concept badge
  const renderProjectBadge = (item) => (
    <span
      className={`${styles.projectBadge} ${
        item.type === "concept"
          ? styles.conceptBadge
          : styles.clientBadge
      }`}
    >
      {item.type === "concept" ? "CONCEPT" : "CLIENT WORK"}
    </span>
  );

  // Concept disclaimer
  const renderDisclaimer = (item) =>
    item.type === "concept" && item.disclaimer ? (
      <span className={styles.disclaimer}>
        {item.disclaimer}
      </span>
    ) : null;

  return (
    <section className={styles.showcase}>
      <div className={styles.heading}>
        <span className={`${styles.eyebrow} ${styles.creative}`}>
          CREATIVE SHOWCASE
        </span>

        <h2>Selected Creative Work</h2>

        <p className={styles.creative}>
          A selection of visual content and promotional materials
          created for business communication and engagement.
        </p>
      </div>

      {/* Category tabs */}
      <div className={styles.categoryTabs} role="tablist">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeCategory === id}
            className={`${styles.categoryTab} ${
              activeCategory === id ? styles.activeTab : ""
            }`}
            onClick={() => setActiveCategory(id)}
          >
            <Icon size={17} strokeWidth={1.7} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div
        className={`${styles.gallery} ${
          activeCategory === "videos" ? styles.videoGallery : ""
        }`}
      >
        {currentItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={styles.galleryItem}
            onClick={() =>
              activeCategory === "graphics"
                ? openGraphic(item)
                : openVideo(item)
            }
            aria-label={`Preview ${item.title}`}
          >
            <div className={styles.thumbnail}>
              <img
                src={
                  activeCategory === "graphics"
                    ? item.src
                    : item.poster
                }
                alt={item.title}
                loading="lazy"
              />

              {renderProjectBadge(item)}

              {activeCategory === "videos" && (
                <span className={styles.playButton}>
                  <Play size={22} fill="currentColor" />
                </span>
              )}

              {activeCategory === "graphics" && (
                <span className={styles.zoomHint}>
                  View artwork
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Preview overlay */}
      {activeItem && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={closePreview}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            type="button"
            className={styles.closeButton}
            onClick={closePreview}
            aria-label="Close preview"
          >
            <X size={24} />
          </button>

          {/* Graphic lightbox */}
          {activeItem.mediaType === "graphic" && (
            <>
              <button
                type="button"
                className={`${styles.navButton} ${styles.previousButton}`}
                onClick={(event) => {
                  event.stopPropagation();
                  navigateGraphic(-1);
                }}
                aria-label="Previous artwork"
              >
                <ChevronLeft size={28} />
              </button>

              <div
                className={styles.imagePreview}
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                />

                <span className={styles.previewCaption}>
                  {activeItem.title}
                </span>

                {renderDisclaimer(activeItem)}
              </div>

              <button
                type="button"
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={(event) => {
                  event.stopPropagation();
                  navigateGraphic(1);
                }}
                aria-label="Next artwork"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Video player */}
          {activeItem.mediaType === "video" && (
            <div
              className={styles.videoPreview}
              onClick={(event) => event.stopPropagation()}
            >
              <video
                src={activeItem.src}
                poster={activeItem.poster}
                controls
                autoPlay
                playsInline
              >
                Your browser does not support video playback.
              </video>

              <span className={styles.previewCaption}>
                {activeItem.title}
              </span>

              {renderDisclaimer(activeItem)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
