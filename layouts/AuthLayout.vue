<template>
    <div class="main-content bg-default d-flex flex-column min-vh-100">
        <!-- Header -->
        <div class="header bg-gradient-success py-7 py-lg-8">
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg
                    x="0"
                    y="0"
                    viewBox="0 0 2560 100"
                    preserveAspectRatio="none"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        <!-- Page content -->
        <div class="container mt--8 pb-5">
            <Nuxt />
        </div>
        <footer class="py-5 fixed-bottom">
            <div class="container">
                <div class="row align-items-center justify-content-xl-between">
                    <div class="col-xl-6">
                        <div class="copyright text-center text-xl-left text-muted"> &copy; {{ year }} </div>
                    </div>
                </div>
            </div>
        </footer>
        <modal-alert />
    </div>
</template>
<script>
export default {
    name: 'AuthLayout',
    data() {
        return {
            year: new Date().getFullYear(),
            showMenu: false,
        }
    },
}
</script>
