import React from 'react';

/**
 * Wrap a Component definition in React.createElement to enable hooks
 * See https://stackoverflow.com/questions/65982665/react-17-0-1-invalid-hook-call-hooks-can-only-be-called-inside-of-the-body-of
 * @param Component
 * @returns (props) => React.createElement(Component, props)
 */
export function withHooks<ComponentProps>(Component: (props: ComponentProps) => JSX.Element) {
  return (props: ComponentProps) => React.createElement(Component, props);
}
