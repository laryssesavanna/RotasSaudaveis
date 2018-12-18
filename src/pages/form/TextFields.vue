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
                      v-model="profile.nome"
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
                      v-model="profile.idade"
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
                      v-model="profile.peso"
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
                      v-model="profile.glicemia"
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
                        v-model="profile.hipertensao"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Diabetes"
                        color="red"
                        v-model="profile.diabetes"
                        value="red darken-3"
                        hide-details
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                      <v-checkbox
                        label="Asma"
                        color="orange"
                        v-model="profile.asma"
                        value="indigo"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Artrite"
                        color="red"
                        v-model="profile.artrite"
                        value="indigo darken-3"
                        hide-details
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                      <v-checkbox
                        label="Gripe inicial"
                        color="orange"
                        value="orange"
                        v-model="profile.gripe_inicial"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Gripe avançada"
                        color="red"
                        v-model="profile.gripe_avancada"
                        value="orange darken-3"
                        hide-details
                      ></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-btn color="primary" @click="save">Atualizar</v-btn>
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
import fs from 'fs';
import { getUser, postUser, putUser } from '@/service/users';

export default {
  components: {
    VWidget
  },
  data () {
    return {
      profile: {},
      post: false,
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
    user () {
      return this.$store.getters.conta.user;
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      getUser(this.user.id).then((response) => {
        if (response.status === 204) {
          this.post = true;
        } else {
          this.profile = response.data.data;
        }
      });
    });
  },
  methods: {
    save: function () {
      if (this.post) {
        this.profile['id'] = this.user.id;
        postUser(this.profile).then((response) => {
          console.log(response.data);
          this.$router.push({ path: '/dashboard' });
        });
      } else {
        putUser(this.user.id, this.profile).then((response) => {
          console.log(response.data);
          this.$router.push({ path: '/dashboard' });
        });
      }
    }
  }
};
</script>