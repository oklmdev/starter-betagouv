import React from 'react';

export function withContext<ContextType, Context extends React.Context<ContextType>>(
  Context: Context,
  value: ContextType,
  element: JSX.Element
) {
  return React.createElement(Context.Provider, { value }, element);
}
