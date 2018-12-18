<template>
  <l-map ref="map" :zoom="12" :center="initialLocation" :options="mapOptions" attribution="attribution"
    style="position: fixed !important; padding-top: 64px">
    <l-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tilelayer>
    <l-control-zoom :position="zoomPosition"/>
      <template>
        <l-marker v-for="marker in markers" 
        title="Temperatura" :lat-lng="marker.position" :key="marker.id" :icon="getIcon(marker.color, marker.value)">
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

  .my-div-icon {
    background: orange;
    border: 2px solid darkorange;
    border-radius: 5px;
    text-align: center;
    line-height: 20px;
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
        minZoom: 12,
        zoomControl: false,
        attributionControl: false,
        measureControl: true,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      route: null,
      sensoresTemp: [],
      markers: [],
      sensors: []
    };
  },
  watch: {
    route: function (val) {
      if (this.route !== null) {
        console.log(val);
        this.showingSensorProx();
      }
    }
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
      // this.markers.push({ title: 'Temperatura: <b>' + 31 + '</b> °C', position: L.latLng(-5.826748, -35.209605), color: 'red', value: 31 });
      // this.markers.push({ title: 'Temperatura: <b>' + 30 + '</b> °C', position: L.latLng(-5.826351, -35.218205), color: 'red', value: 30 });
      // this.markers.push({ title: 'Temperatura: <b>' + 29 + '</b> °C', position: L.latLng(-5.7303142699, -35.254951689699995), color: 'red', value: 29 });
      // this.markers.push({ title: 'Temperatura: <b>' + 28 + '</b> °C', position: L.latLng(-5.7103242699, -35.234941689699995), color: 'red', value: 28 });
      // this.markers.push({ title: 'Temperatura: <b>' + 27 + '</b> °C', position: L.latLng(-5.7203345699, -35.294251689699995), color: 'red', value: 27 });
      // this.markers.push({ title: 'Temperatura: <b>' + 26 + '</b> °C', position: L.latLng(-5.7304142179, -35.214351689699995), color: 'red', value: 26 });
    });
    console.log(this.checkDistance(L.latLng(-5.826748, -35.209605), L.latLng(-5.826351, -35.218205)));
  },
  methods: {
    checkDistance: function (p, q) {
      let dx   = p.lat - q.lat;
      let dy   = p.lng - q.lng;
      let dist = Math.sqrt(dx * dx + dy * dy);
      return dist;
    },
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
        let value;
        await forEachAsync(element.contextElement.attributes, async (attr) => {
          if (attr.name === 'lat') lat = attr.value;
          if (attr.name === 'lon') lon = attr.value;
          if (attr.name === 'Temperature') {
            medicao = sensorType.name + ': <b>' + attr.value + '</b> ' + sensorType.measured;
            value = attr.value + sensorType.measured;
          }
        });
        let point = L.latLng(lat, lon);
        this.sensors.push({ title: medicao, position: point, color: sensorType.color, value: value });
        sensors.push(element);
      });
      // this.sensoresTemp = sensors;
    },
    getIcon (color, value) {
      return L.divIcon({
        html: value,
        className: 'my-div-icon',
        iconSize: [50, 20]
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
      }).on('routeselected', (e) => {
        this.route = e.route;
      }).addTo(this.map);
    },
    showingSensorProx () {
      this.sensors.forEach((sensor) => {
        this.route.coordinates.every((point) => {
          // console.log(this.checkDistance(sensor.position, point));
          if (this.checkDistance(sensor.position, point) < 0.007) {
            this.markers.push(sensor);
            return false;
          }
          return true;
        });
      });
    }
  }
};

</script>
