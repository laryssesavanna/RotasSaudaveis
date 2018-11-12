<template>
  <l-map ref="map" :zoom="12" :center="initialLocation" :options="mapOptions"
    style="position: fixed !important; padding-top: 64px">
    <l-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tilelayer>
    <l-control-zoom :position="zoomPosition"/>
      <template>
        <l-marker v-for="marker in markers" 
        title="Temperatura" :lat-lng="marker.position" :key="marker.id" :icon="icon"/>
      </template>
  </l-map>
</template>

<script type="text/javascript">
import L from 'leaflet';
import Vue from 'vue';
import * as Vue2Leaflet from 'vue2-leaflet';
import { listByType } from '@/service/sensores';
import { http } from '@/service/configorion';

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
    'l-control-zoom': Vue2Leaflet.LControlZoom,
    'l-marker': Vue2Leaflet.LMarker
  },
  data () {
    return {
      initialLocation: L.latLng(-5.822089, -35.215033),
      zoomPosition: 'topleft',
      teste: '',
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        measureControl: true,
        // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      sensoresTemp: [],
      markers: [
        {
          position: { 
            lng: -35.205605,
            lat: -5.822648
          }
        },
        {
          position: { 
            lng: -35.255851689699995, 
            lat: -5.7703142699 
          }
        }
      ],
      icon: L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        iconSize: [30, 32]
      })
    };
  },
  created () {
    this.getTempSensors();
    this.show();
  },
  methods: {
    getTempSensors: async function () {
      let type = 'Sensor_Temp';
      let sensors = [];
      let response = await listByType(type);

      const forEachAsync = async function (array, callback) {
        for (let i = 0; i < array.length; i++) {
          await callback(array[i]);
        }
      };

      await forEachAsync(response.data.contextResponses, (element) => {
        sensors.push(element);
      });

      this.sensoresTemp = sensors;
    /*  Sensores.listByType('Sensor_Temp').then(response => {
        self.sensoresTemp = JSON.stringify(response.data.contextResponses);
        return self.sensoresTemp;
      }); */
    },
    getPosition () {
      return new Promise(function (resolve) {
        navigator.geolocation.getCurrentPosition(function (location) {
          resolve(location);
        });
      });
    },
    show (json) {
      /* console.log('ok');
      return L.latLng(-5.822089, -35.215033); */
    }
  }
};

</script>
