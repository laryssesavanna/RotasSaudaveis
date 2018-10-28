<template>
  <div id="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Cadastrar">
            <div slot="widget-content">
              <v-container>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Nome</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Nome"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>                
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Tipo</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      name="input-1"
                      label="Tipo"
                      color="primary"
                      id="testing"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Localização</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Lat/Lon"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn color="primary">Salvar</v-btn>
                <v-btn>Cancelar</v-btn>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
export default {
  components: {
    VWidget
  },
  data () {
    return {
      email: '',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        }    
      }  
    };
  },
  computed: {
  },  
  methods: {
  }
};
</script>