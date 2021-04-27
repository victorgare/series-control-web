<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <!-- <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Controlador de séries</small>
                    </div>
                    <div class="btn-wrapper text-center">
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/github.svg" /></span>
                            <span class="btn-inner--text">Github</span>
                        </a>
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/google.svg" /></span>
                            <span class="btn-inner--text">Google</span>
                        </a>
                    </div>
                </div> -->
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Sign in</small>
                    </div>
                    <form role="form" @submit.prevent="userLogin">
                        <base-input
                            v-model="model.email"
                            form-classes="input-group-alternative mb-3"
                            placeholder="Email"
                            addon-left-icon="ni ni-email-83"
                        >
                        </base-input>

                        <base-input
                            v-model="model.password"
                            form-classes="input-group-alternative mb-3"
                            placeholder="Senha"
                            type="password"
                            addon-left-icon="ni ni-lock-circle-open"
                        >
                        </base-input>
                        <div class="text-center">
                            <base-button :loading="loading" native-type="submit" type="primary" class="my-4"
                                >Sign in</base-button
                            >
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light"><small>Esqueceu a senha?</small></a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/register" class="text-light"><small>Criar nova conta</small></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    layout: 'AuthLayout',
    data() {
        return {
            model: {
                email: '',
                password: '',
            },
            loading: false,
        }
    },
    methods: {
        async userLogin() {
            try {
                this.loading = true
                await this.$auth.loginWith('local', {
                    data: this.model,
                })
            } catch (err) {
                this.$modalAlert.showError({
                    title: 'Erro',
                    text: `Problemas ao logar ${err}`,
                    okOnly: true,
                })
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
