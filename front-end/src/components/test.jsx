staticClient.getStaticImage({
    ownerId: 'mapbox',
    styleId: 'streets-v11',
    width: 200,
    height: 300,
    position: {
      coordinates: [12, 13],
      zoom: 3
    },
    overlays: [
      // Simple markers.
      {
        marker: {
          coordinates: [12.2, 12.8]
        }
      },
      {
        marker: {
          size: 'large',
          coordinates: [14, 13.2],
          label: 'm',
          color: '#000'
        }
      },
      {
        marker: {
          coordinates: [15, 15.2],
          label: 'airport',
          color: '#ff0000'
        }
      },