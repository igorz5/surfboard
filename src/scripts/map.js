ymaps.ready(function () {
  const map = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 14,
    controls: [],
  });

  const coords = [
    [55.76, 37.64],
    [55.77, 37.66],
    [55.78, 37.62],
    [55.79, 37.67],
  ];

  const collection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false,
      iconLayout: "default#image",
      iconImageHref: "../img/marker.svg",
      iconImageSize: [76, 95],
      iconImageOffset: [-40, -70],
    }
  );

  coords.forEach((coord) => {
    collection.add(new ymaps.Placemark(coord));
  });

  map.geoObjects.add(collection);

  map.behaviors.disable("scrollZoom");
});
