<template>
  <l-map ref="map" :zoom="12" :center="initialLocation" :options="mapOptions" attribution="attribution"
    style="position: fixed !important; padding-top: 64px">
    <l-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tilelayer>
    <l-control-zoom :position="zoomPosition"/>
      <template>
        <l-marker v-for="marker in markers" 
        title="Temperatura" :lat-lng="marker.position" :key="marker.id" :icon="getIcon(marker.color)">
          <l-popup>
            <div v-html="marker.title">
            </div>
          </l-popup>
        </l-marker>
      </template>
  </l-map>
</template>

<style lang="scss">
  @import '../../dist/static/routing/leaflet-routing-machine.css';

  .leaflet-bottom {
    position: fixed !important;
  }

</style>

<script type="text/javascript">

import L from 'leaflet';
import * as Vue2Leaflet from 'vue2-leaflet';
import { listByType } from '@/service/sensores';
import { http } from '@/service/configorion';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

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
    'l-marker': Vue2Leaflet.LMarker,
    'l-popup': Vue2Leaflet.LPopup,
    'l-control-zoom': Vue2Leaflet.LControlZoom
  },
  data () {
    return {
      initialLocation: L.latLng(-5.822089, -35.215033),
      zoomPosition: 'topright',
      teste: '',
      map: null,
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        measureControl: true,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      sensoresTemp: [],
      markers: []
    };
  },
  created () {
    this.getTempSensors();
    this.show();
  },
  mounted: function () {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
      // Remover após usar o método
      this.addToMap(
        [
          L.latLng(-5.826648, -35.203605),
          L.latLng(-5.7603142699, -35.254851689699995)
        ]
      );
    });
  },
  methods: {
    getTempSensors: async function () {
      let temperatureSensor = { name: 'Temperatura', type: 'Sensor_Temp', measured: '°C', color: 'red' };
      let pollutionSensor = { name: 'Poluição', type: 'Sensor_Poluicao', measured: '%', color: 'black' };
      await this.getSensors(temperatureSensor);
      await this.getSensors(pollutionSensor);
    },
    getSensors: async function (sensorType) {
      let sensors = [];
      let response = await listByType(sensorType.type);

      const forEachAsync = async function (array, callback) {
        for (let i = 0; i < array.length; i++) {
          await callback(array[i]);
        }
      };

      await forEachAsync(response.data.contextResponses, async (element) => {
        let lat;
        let lon;
        let medicao;
        console.log(element.contextElement);
        await forEachAsync(element.contextElement.attributes, async (attr) => {
          if (attr.name === 'lat') lat = attr.value;
          if (attr.name === 'lon') lon = attr.value;
          if (attr.name === 'Medicao') medicao = sensorType.name + ': <b>' + attr.value + '</b> ' + sensorType.measured;
        });
        console.log(lat, lon);
        let point = L.latLng(lat, lon);
        this.markers.push({ title: medicao, position: point, color: sensorType.color });
        sensors.push(element);
      });
      this.sensoresTemp = sensors;
    },
    getIcon (color) {
      return L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-' + color + '.png',
      });
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
    },
    addToMap (array) {
      L.Routing.control({
        waypoints: array,
        position: 'topleft',
        language: 'pt-BR',
        geocoder: L.Control.Geocoder.nominatim()
      }).addTo(this.map);
    }
  }
};

</script>
