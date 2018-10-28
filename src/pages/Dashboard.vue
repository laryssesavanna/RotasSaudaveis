<template>
  <l-map ref="map" :zoom="12" :center="initialLocation" :options="mapOptions" :attribution="attribution"
    style="position: fixed !important; padding-top: 64px">
    <l-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tilelayer>
    <l-control-zoom :position="zoomPosition"/>
  </l-map>
</template>

<script>
import L from 'leaflet';
import * as Vue2Leaflet from 'vue2-leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  components: {
    'l-map': Vue2Leaflet.LMap,
    'l-tilelayer': Vue2Leaflet.LTileLayer,
    'l-popup': Vue2Leaflet.LPopup,
    'l-control-zoom': Vue2Leaflet.LControlZoom
  },
  data () {
    return {
      initialLocation: L.latLng(-5.822089, -35.215033),
      zoomPosition: 'topleft',
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        measureControl: true,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    };
  }
};

</script>
