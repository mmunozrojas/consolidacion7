<template>
    <v-footer dark padless>
        <v-card class="flex" flat tile>
            <v-card-title class="deep-purple">
                <strong class="subheading">Síguenos en nuestras redes sociales!</strong>

                <v-spacer></v-spacer>

                <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="py-2 error text-center white--text">
                {{ new Date().getFullYear() }} — <strong>Cursos AlfaWeb Derechos Reservados</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
}
</script>

<style scoped></style>