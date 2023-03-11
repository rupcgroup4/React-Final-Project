import React, { useEffect, useLayoutEffect } from 'react';
import { graph } from '../file';

const GameMap = (props) => {
  //on the first time hte component is loaded it will create new Map to the screen
  //this happens only once
  useLayoutEffect(() => {
    if (props.map) {
      props.map.createMap(props.graph);

      return () => {
        props.map.root.dispose();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.map]);

  return (
    <div
      id='chartdiv'
      style={{
        width: '100%',
        height: '88vh',
        margin: '0 auto',
      }}
    ></div>
  );
};

export default GameMap;
