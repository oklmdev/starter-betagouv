import React, { Fragment } from 'react';

export function Nl2Br(str: string) {
  return str.split('\n').map((item, key) => (
    <Fragment key={`key${key}`}>
      {item}
      <br />
    </Fragment>
  ));
}
