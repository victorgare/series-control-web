<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
            <!-- Card stats -->
            <b-row>
                <b-col xl="4" md="6">
                    <stats-card
                        title="Total animes"
                        type="gradient-primary"
                        :sub-title="data.totalAnimes"
                        icon="ni ni-world"
                        class="mb-4"
                    >
                        <template slot="footer">
                            <span class="text-nowrap mr-2"></span>
                        </template>
                    </stats-card>
                </b-col>
                <b-col xl="4" md="6">
                    <stats-card
                        title="Pendentes atualização"
                        type="gradient-red"
                        :sub-title="data.animesPendingUpdate"
                        icon="ni ni-ambulance"
                        class="mb-4"
                    >
                        <template slot="footer">
                            <span class="text-nowrap mr-2"></span>
                        </template>
                    </stats-card>
                </b-col>
                <b-col xl="4" md="6">
                    <stats-card
                        title="Atualizados"
                        type="gradient-green"
                        :sub-title="data.animesUpdated"
                        icon="ni ni-check-bold"
                        class="mb-4"
                    >
                        <template slot="footer">
                            <span class="text-nowrap mr-2">Nas ultimas 24h</span>
                        </template>
                    </stats-card>
                </b-col>
                <b-col xl="4" md="6">
                    <stats-card
                        title="Episódios assistido"
                        type="gradient-primary"
                        :sub-title="data.episodesWatchedLastDay"
                        icon="ni ni-bulb-61"
                        class="mb-4"
                    >
                        <template slot="footer">
                            <span class="text-nowrap mr-2">Nas ultimas 24h</span>
                        </template>
                    </stats-card>
                </b-col>
                <b-col xl="4" md="6">
                    <stats-card
                        title="Episódios assistido"
                        type="gradient-info"
                        :sub-title="data.episodesWatchedLastMonth"
                        icon="ni ni-tv-2"
                        class="mb-4"
                    >
                        <template slot="footer">
                            <span class="text-nowrap mr-2">Nos ultimos 30 dias</span>
                        </template>
                    </stats-card>
                </b-col>
                <b-col xl="4" md="6">
                    <stats-card
                        title="Usuários ativos"
                        type="gradient-orange"
                        :sub-title="data.activeUsersLastMonth"
                        icon="ni ni-single-02"
                        class="mb-4"
                    >
                        <template slot="footer">
                            <span class="text-nowrap mr-2">Nos ultimos 30 dias</span>
                        </template>
                    </stats-card>
                </b-col>
            </b-row>
        </base-header>

        <!--Charts-->
        <!-- <b-container fluid class="mt--7">
            <b-row>
                <b-col xl="8" class="mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <b-row slot="header" align-v="center">
                            <b-col>
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Sales value</h5>
                            </b-col>
                            <b-col>
                                <b-nav class="nav-pills justify-content-end">
                                    <b-nav-item
                                        class="mr-2 mr-md-0"
                                        :active="bigLineChart.activeIndex === 0"
                                        link-classes="py-2 px-3"
                                        @click.prevent="initBigChart(0)"
                                    >
                                        <span class="d-none d-md-block">Month</span>
                                        <span class="d-md-none">M</span>
                                    </b-nav-item>
                                    <b-nav-item
                                        link-classes="py-2 px-3"
                                        :active="bigLineChart.activeIndex === 1"
                                        @click.prevent="initBigChart(1)"
                                    >
                                        <span class="d-none d-md-block">Week</span>
                                        <span class="d-md-none">W</span>
                                    </b-nav-item>
                                </b-nav>
                            </b-col>
                        </b-row>
                        <line-chart
                            ref="bigChart"
                            :height="350"
                            :chart-data="bigLineChart.chartData"
                            :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>
                    </card>
                </b-col>

                <b-col xl="4" class="mb-5 mb-xl-0">
                    <card header-classes="bg-transparent">
                        <b-row slot="header" align-v="center">
                            <b-col>
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                                <h5 class="h3 mb-0">Total orders</h5>
                            </b-col>
                        </b-row>

                        <bar-chart ref="barChart" :height="350" :chart-data="redBarChart.chartData"> </bar-chart>
                    </card>
                </b-col>
            </b-row> -->
        <!-- End charts-->

        <!--Tables-->
        <!-- <b-row class="mt-5">
                <b-col xl="8" class="mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </b-col>
                <b-col xl="4" class="mb-5 mb-xl-0">
                    <social-traffic-table></social-traffic-table>
                </b-col>
            </b-row> -->
        <!--End tables-->
        <!-- </b-container> -->
    </div>
</template>
<script>
// Charts
// import SocialTrafficTable from '~/pages/Dashboard/SocialTrafficTable.vue'
// import PageVisitsTable from '~/pages/Dashboard/PageVisitsTable'
import * as chartConfigs from '~/components/Charts/config'
// import LineChart from '~/components/Charts/LineChart'
// import BarChart from '~/components/Charts/BarChart'

// Components
import StatsCard from '~/components/Cards/StatsCard'

// Tables
// import BaseProgress from '~/components/BaseProgress'

export default {
    components: {
        // LineChart,
        // BarChart,
        // BaseProgress,
        StatsCard,
        // PageVisitsTable,
        // SocialTrafficTable,
    },
    data() {
        return {
            data: {},
            bigLineChart: {
                allData: [
                    [0, 20, 10, 30, 15, 40, 20, 60, 60],
                    [0, 20, 5, 25, 10, 30, 15, 40, 40],
                ],
                activeIndex: 0,
                chartData: {
                    datasets: [
                        {
                            label: 'Performance',
                            data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
                        },
                    ],
                    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                },
                extraOptions: chartConfigs.blueChartOptions,
            },
            redBarChart: {
                chartData: {
                    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Sales',
                            data: [25, 20, 30, 22, 17, 29],
                        },
                    ],
                },
                extraOptions: chartConfigs.blueChartOptions,
            },
        }
    },
    mounted() {
        this.initBigChart(0)
        this.getDashboard()
    },
    methods: {
        initBigChart(index) {
            const chartData = {
                datasets: [
                    {
                        label: 'Performance',
                        data: this.bigLineChart.allData[index],
                    },
                ],
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            }
            this.bigLineChart.chartData = chartData
            this.bigLineChart.activeIndex = index
        },

        async getDashboard() {
            try {
                this.loading = true

                this.data = (await this.$axios.get(`/dashboard`)).data
            } catch (error) {
                this.$modalAlert.showError({
                    title: 'Erro',
                    text: error,
                })
            }
        },
    },
}
</script>
<style>
.el-table .cell {
    padding-left: 0px;
    padding-right: 0px;
}
</style>
