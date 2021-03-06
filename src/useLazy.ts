import { RefObject, useEffect, useState } from 'react';

const OBSERVER_ROOT_MARGIN = '200px';

let cachedObserver: IntersectionObserver | undefined;
const observerCallbackEntries = [] as ObserverCallbackEntry[];

/**
 * Allows detecting when a given element is displayed in the viewport.
 */
export function useLazy<T extends HTMLElement>(
  elementRef: RefObject<T>,
  enabled = true
): { hasBeenDisplayed: boolean } {
  const [hasBeenDisplayed, setHasBeenDisplayed] = useState(!enabled);

  useEffect(() => {
    const element = elementRef.current;

    if (element && enabled) {
      const observer = getObserver();

      const callbackEntry = [
        element,
        () => {
          observer.unobserve(element);
          setHasBeenDisplayed(true);
        },
      ] as ObserverCallbackEntry;

      observer.observe(element);
      observerCallbackEntries.push(callbackEntry);

      return () => {
        observer.unobserve(element);
        observerCallbackEntries.splice(
          observerCallbackEntries.indexOf(callbackEntry),
          1
        );
      };
    }
  }, [elementRef, enabled]);

  return { hasBeenDisplayed };
}

function getObserver(): IntersectionObserver {
  if (cachedObserver === undefined) {
    cachedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observerCallbackEntries.find(
              ([element]) => element === entry.target
            )?.[1]();
          }
        });
      },
      { rootMargin: OBSERVER_ROOT_MARGIN }
    );
  }
  return cachedObserver;
}

type ObserverCallbackEntry = [HTMLElement, () => void];
