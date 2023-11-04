"use client";
import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import type API from "react-tinder-card";

interface Project {
  name: string;
  url: string;
}

const db: Project[] = [
  {
    name: "Richard Hendricks",
    url: "./CodeCupid-.png",
  },
  {
    name: "Erlich Bachman",
    url: "./CodeCupid-.png",
  },
  {
    name: "Monica Hall",
    url: "./CodeCupid-.png",
  },
  {
    name: "Jared Dunn",
    url: "./CodeCupid-.png",
  },
  {
    name: "Dinesh Chugtai",
    url: "./CodeCupid-.png",
  },
];

function Advanced() {
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
      <div className="cardContainer flex justify-center">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button
          className="btn btn-primary"
          disabled={!canSwipe}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <button
          className="btn btn-primary"
          disabled={!canGoBack}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          className="btn btn-primary"
          disabled={!canSwipe}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Advanced;
