"use client";
import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";

interface Project {
  name: string;
  url: string;
  description: string;
}

const db: Project[] = [
  {
    name: "Richard Hendricks",
    url: "/CodeCupid-.png",
    description: "blah blah",
  },
  {
    name: "Erlich Bachman",
    url: "/CodeCupid-.png",
    description: "blah blah",
  },
  {
    name: "Monica Hall",
    url: "/CodeCupid-.png",
    description: "blah blah",
  },
  {
    name: "Jared Dunn",
    url: "/CodeCupid-.png",
    description: "blah blah",
  },
  {
    name: "Dinesh Chugtai",
    url: "/CodeCupid-.png",
    description: "blah blah",
  },
];

export default function Root() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState("");
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [],
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx &&
      (childRefs[idx].current as any).restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < db.length) {
      await (childRefs[currentIndex].current as any).swipe(dir); // Add type assertion here
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await (childRefs[newIndex].current as any).restoreCard(); // Add type assertion here
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        disabled={!canGoBack}
        onClick={() => goBack()}
      >
        Undo swipe!
      </button>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
      <div className="grid grid-cols-3 gap-4 p-4">
        <button
          className="btn btn-primary"
          disabled={!canSwipe}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <div className="cardContainer">
          {db.map((project, index) => (
            <TinderCard
              ref={childRefs[index] as React.RefObject<any>}
              className="swipe"
              key={project.name}
              onSwipe={(dir) => swiped(dir, project.name, index)}
              onCardLeftScreen={() => outOfFrame(project.name, index)}
            >
              <div className="w-96 h-48 bg-base-100 shadow-xl">
                <figure>
                  <Image
                    src={project.url}
                    width={100}
                    height={100}
                    alt="Project image"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {project.name}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{project.description}</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                  </div>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
        <button
          className="btn btn-primary"
          disabled={!canSwipe}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
    </div>
  );
}
