export default {
  'SET_CODE' (state, payload) {
    console.log(payload);
    state.conta.code = payload.code;
    state.conta.state = payload.state;
    state.conta.logado = true;
  },
  'SET_CONTA' (state, payload) {
    console.log(payload);
    state.conta.user = payload;
  },
  'LOGOUT' (state) {
    state.conta.logado = false;
    state.conta.code = null;
  }
};


// app_azf_domain: ""
// app_id: "f61a3dd3-a38f-4336-89d3-38e64b4ae697"
// authorization_decision: ""
// displayName: ""
// email: "douglasrolim@gmail.com"
// id: "9805e78d-9914-4057-a9aa-36457fb0eb42"
// isGravatarEnabled: false
// organizations: []
// roles: []
// trusted_applications: []
// trusted_apps: []
// username: "douglas"