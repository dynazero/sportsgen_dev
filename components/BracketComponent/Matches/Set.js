import { lazy, Suspense, useContext } from 'react';
import { BracketContext } from '../../../context/bracketContext.js'

const componentImports = {
  6: lazy(() => import('./setdelta.js')),
  7: lazy(() => import('./seta.js')),
  8: lazy(() => import('./setb.js')),
  9: lazy(() => import('./setc.js')),
  10: lazy(() => import('./setd.js')),
  // Continue with the rest of your components
};

const SetComponent = () => {
  const context = useContext(BracketContext);
  if (!context) {
    console.error('BracketContext is undefined');
    return null; // or some fallback UI
  }
  
  let {
    participants,
  } = context;

  const participantsCount = participants.length;
  const Component = componentImports[participantsCount];
  
 
  // This will provide a fallback in case the participantsCount doesn't match any key in componentImports
  if (!Component) {
    return <div>No matching component found for participantsCount {participantsCount}</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

export default SetComponent;
