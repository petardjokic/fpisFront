<template>
<b-container fluid>
    <b-row>
        <b-col cols=12>
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group inline id="input-group-id" label="Plan Provere ID:" label-for="input-group-id">
                    <b-form-input id="input-id" v-model="form.id" type="number" placeholder="ID plana provere"></b-form-input>
                    <b-button>Pronadji</b-button>
                </b-form-group>

                <b-form-group id="input-group-datum" label="Datum:" label-for="input-datum">
                    <b-form-input id="input-datum" v-model="form.datum" type="date" required placeholder="Unesi datum"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-predmetProvere" label="Predmet provere:" label-for="input-predmetProvere">
                    <b-form-input id="input-predmetProvere" v-model="form.predmetProvere" required placeholder="Unesi predmet provere"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-opis" label="Opis zahteva:" label-for="input-opis">
                    <b-form-textarea id="input-opis" v-model="form.opisZahteva" required placeholder="Unesi opis zahteva" rows="3" max-rows="6"></b-form-textarea>
                </b-form-group>

                <b-form-group id="input-group-posaljilac" label="Poslao:" label-for="input-posaljilac">
                    <b-form-select id="input-posaljilac" v-model="form.poslao" :options="optionsZaposleni"></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-primalac" label="Primio:" label-for="input-primalac">
                    <b-form-select id="input-primalac" v-model="form.primio" :options="optionsZaposleni"></b-form-select>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            <b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
            </b-card>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                id: '',
                datum: '',
                predmet: '',
                opisZahteva: '',
                poslao: 0,
                primio: 0
            },
            optionsZaposleni: [{
                    value: 1,
                    text: 'Zaposleni 1'
                },
                {
                    value: 2,
                    text: 'Zaposleni 2'
                },
                {
                    value: 3,
                    text: 'Zaposleni 3'
                }

            ],
            show: true
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.id = ''
            this.form.datum = ''
            this.form.predmet = '',
            this.form.opisZahteva = '',
            this.form.poslao = 0,
            this.form.primio = 0,
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>

<style>

</style>
