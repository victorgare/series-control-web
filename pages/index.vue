<template>
    <div>
        <div class="row">
            <div class="col-xl-12 mb-5 mb-xl-0">
                <Animes />
            </div>
        </div>
        <AddSerie />
    </div>
</template>
<script>
import AddSerie from '~/components/Series/AddSerie'
import Animes from '~/components/Series/Animes'

export default {
    components: {
        AddSerie,
        Animes,
    },
}
</script>
