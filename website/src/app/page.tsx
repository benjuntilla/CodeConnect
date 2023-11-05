"use client";
import React, { useState, useMemo, useRef, useEffect, useContext } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { getUserUID, initializeFirebase } from "@/lib/firebase";
import { recommendProjects } from "@/lib/api/project";
import { createApolloClient } from "@/lib/apollo";
import { Project } from "@/lib/types";
import { useUserContext } from "./components/UserProvider";

export default function Match() {
  const [lastDirection, setLastDirection] = useState("");
  // used for outOfFrame closure
  const [recs, setRecs] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  const context = useUserContext();

  useEffect(() => {
    let user_id = getUserUID();
    if (user_id != null) {
      recommendProjects(context.client, user_id, 10, 1).then((data) => {
        setRecs(data.data);
        setCurrentIndex(recs.length);
      });
    }
  }, []);

  const childRefs = useMemo(
    () =>
      Array(recs.length)
        .fill(0)
        .map((i) => React.createRef()),
    [recs.length]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < recs.length - 1;

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
    if (canSwipe && currentIndex < recs.length) {
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
    <div className="h-full w-full">
      <button
        className="btn btn-primary"
        disabled={!canGoBack}
        onClick={() => goBack()}
      >
        Undo swipe!
      </button>
      {lastDirection ? (
        <h2 key={lastDirection}>You swiped {lastDirection}</h2>
      ) : (
        <h2>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
      <div className="grid grid-cols-6">
        <div className="col-span-1 flex justify-center items-center">
          <button
            className="btn btn-primary"
            disabled={!canSwipe}
            onClick={() => swipe("left")}
          >
            <ImCross />
          </button>
        </div>
        <div className="cardContainer col-span-4 flex justify-center">
          {recs.map((project, index) => (
            <TinderCard
              ref={childRefs[index] as React.RefObject<any>}
              className="absolute"
              key={project.name}
              onSwipe={(dir) => swiped(dir, project.name, index)}
              onCardLeftScreen={() => outOfFrame(project.name, index)}
            >
              <div className="w-96 h-48 bg-base-100 shadow-xl">
                <figure>
                  <Image
                    src={project.project_img ?? "/images/placeholder.png"}
                    width={100}
                    height={100}
                    alt="Project image"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{project.name}</h2>
                  <p>{project.description}</p>
                  <div className="card-actions justify-end">
                    {project.skills_required.split(",").map((skill, index) => (
                      <div className="badge badge-outline" key={index}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="col-span-1 justify-center items-center">
          <button
            className="btn btn-primary"
            disabled={!canSwipe}
            onClick={() => swipe("right")}
          >
            <AiFillHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
