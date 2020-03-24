// src/DisplayMapClass.js
import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
          apikey: "kgSdjqerT-AJ-VhQvIwifffAhb9AuVu7LK3gMkbIweA"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
      // evento Tap que crea marker y toma volores de geoposicion

    let selecShape = []
    map.addEventListener('tap', (event) => {
      let position = map.screenToGeo(
        event.currentPointer.viewportX,
        event.currentPointer.viewportY
      )
      selecShape.push([position])
      console.log(selecShape)
      const marker = new H.map.Marker(position)
      map.addObject(marker)
  });

    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}
