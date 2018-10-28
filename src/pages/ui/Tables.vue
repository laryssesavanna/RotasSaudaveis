<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Sensores Disponíveis</h3>
        </v-flex>        
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Buscar sensor"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>     
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>         
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                select-all
                v-model="complex.selected"
                >
                <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
                  ></v-checkbox>
                </td>              
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.type }}</td>
                  <td>{{ props.item.datetime }}</td>
                  <td>{{ props.item.geo }}</td>
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>  
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { Items as Users } from '@/api/user';
export default {
  data () {
    return {
      search: '',
      complex: {
        selected: [],
        headers: [
          {
            text: 'Nome',
            value: 'name'
          },
          {
            text: 'Tipo',
            value: 'type'
          },
          {
            text: 'Última Leitura',
            value: 'datetime'
          },
          {
            text: 'Localização',
            value: 'geo'
          },
          {
            text: 'Ação',
            value: ''
          },
        ],
        items: Users
      }

    };
  }
};
</script>
