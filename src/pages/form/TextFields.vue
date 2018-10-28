<template>
  <div id="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Dados da Saúde">
            <div slot="widget-content">
              <v-container>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Nome completo</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Nome completo"
                      value="Larysse Savanna Izidio da Silva"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>                
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Idade</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      name="input-1"
                      label="Idade"
                      value="23"
                      color="primary"
                      id="testing"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Peso</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Peso"
                      value="63.00"
                      suffix="kg"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Glicemia</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Glicemia"
                      value="70"
                    ></v-text-field>
                  </v-flex>
                </v-layout>      
                <v-layout row>
                  <v-flex xs12>
                    <v-subheader class="pa-0">Selecione as doenças</v-subheader>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                      <v-checkbox
                        label="Hipertensão"
                        color="red"
                        value="red"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Diabetes"
                        color="red"
                        value="red darken-3"
                        hide-details
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                      <v-checkbox
                        label="Asma"
                        color="orange"
                        value="indigo"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Artrite"
                        color="red"
                        value="indigo darken-3"
                        hide-details
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                      <v-checkbox
                        label="Gripe inicial"
                        color="orange"
                        value="orange"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Gripe avançada"
                        color="red"
                        value="orange darken-3"
                        hide-details
                      ></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-btn color="primary">Atualizar</v-btn>
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