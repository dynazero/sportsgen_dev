import { lazy, Suspense } from 'react';

const componentImports = {
  3: lazy(() => import('./setalpha')),
  4: lazy(() => import('./setbravo')),
  5: lazy(() => import('./setcharlie')),
  6: lazy(() => import('./seta')),
  7: lazy(() => import('./setb')),
  8: lazy(() => import('./setc')),
  9: lazy(() => import('./setd')),
  10: lazy(() => import('./sete')),
  // Continue with the rest of your components
};


const SetComponent = ({ participantsCount, bracketList }) => {
  // console.log(participantsCount, 'participantsCount')
  const Component = componentImports[participantsCount];
  
  // This will provide a fallback in case the participantsCount doesn't match any key in componentImports
  if (!Component) {
    return <div>No matching component found for participantsCount {participantsCount}</div>;
    }
console.log('bracketList', bracketList);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component participantsCount={participantsCount} bracketList={bracketList}  />
      </Suspense>
    );
}

export default SetComponent;
