import React, { lazy, Suspense } from 'react';

const componentImports = {
  6: lazy(() => import('./seta')),
  7: lazy(() => import('./setb')),
  8: lazy(() => import('./setc')),
  9: lazy(() => import('./setd')),
  10: lazy(() => import('./sete')),
  // Continue with the rest of your components
};

const SetComponent = ({ participantsCount, bracketFS }) => {
    // console.log(participantsCount, 'participantsCount')
    const Component = componentImports[participantsCount];

    // This will provide a fallback in case the participantsCount doesn't match any key in componentImports
    if (!Component) {
      return <div>No matching component found for participantsCount {participantsCount}</div>;
    }

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component bracketFS={bracketFS} />
      </Suspense>
    );
}

export default SetComponent;
