<template>
<b-jumbotron>
    <template v-slot:header>Plan Provere</template>

    <template v-slot:lead>
        <b-alert :show=message.show :variant=message.variant dismissible>{{message.text}}</b-alert>
    </template>

    <hr class="my-4">

    <b-container>
        <b-row>
            <b-col cols=12>
                <b-form @submit="sacuvajPlan" @reset="resetujFormu">
                    <b-form inline @submit="nadjiPlan">
                        <b-input-group prepend="Sifra" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input id="inline-form-input-sifra" v-model="form.id" type="number" placeholder="ID plana provere:"></b-form-input>
                        </b-input-group>
                        <b-button type="submit" variant="outline-primary">Pronadji</b-button>
                    </b-form>

                    <b-form-group id="input-group-datum" label="Datum:" label-for="input-datum">
                        <b-form-input id="input-datum" v-model="form.date" type="date" required placeholder="Unesi datum"></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-predmetProvere" label="Predmet provere:" label-for="input-predmetProvere">
                        <b-form-input id="input-predmetProvere" v-model="form.checkSubject" required placeholder="Unesi predmet provere"></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-opis" label="Opis zahteva:" label-for="input-opis">
                        <b-form-textarea id="input-opis" v-model="form.description" required placeholder="Unesi opis zahteva" rows="3" max-rows="6"></b-form-textarea>
                    </b-form-group>
                    <b-row>
                        <b-col>
                            <b-form-group id="input-group-posaljilac" label="Poslao:" label-for="input-posaljilac">
                                <b-form-select id="input-posaljilac" v-model="form.sender.id" :options="optionsZaposleni"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="input-group-primalac" label="Primio:" label-for="input-primalac">
                                <b-form-select id="input-primalac" v-model="form.receiver.id" :options="optionsZaposleni"></b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-button type="submit" variant="outline-primary">Sacuvaj</b-button>
                    <b-button type="reset" variant="outline-danger">Resetuj formu</b-button>
                </b-form>

            </b-col>
        </b-row>
    </b-container>
    <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
    </b-card>
</b-jumbotron>
</template>

<script>
import axios from 'axios'
import FpisService from '../_destinations/FpisApi'
export default {
    data() {
        return {
            form: {
                id: '',
                date: '',
                checkSubject: '',
                description: '',
                sender: {},
                receiver: {}
            },
            zaposleni: [],
            message: {
                text: '',
                variant: 'primary',
                show: false
            }

        }
    },
    mounted() {
        axios.get(FpisService.BASE_URL + FpisService.WORKERS).then(response => {
            this.zaposleni = response.data
        })
    },
    computed: {
        optionsZaposleni() {
            return this.zaposleni.map(wor => {
                return {
                    value: wor.id,
                    text: wor.firstName
                }
            });
        }
    },
    methods: {
        nadjiPlan(evt) {
            evt.preventDefault()
            axios.get(FpisService.BASE_URL + FpisService.INTERNAL_CHECK_PLAN + this.form.id).then(response => {
                console.log(response.data)
                this.form.id = response.data.id
                this.form.date = response.data.date
                this.form.checkSubject = response.data.checkSubject
                this.form.description = response.data.description
                this.form.sender.id = response.data.sender.id
                this.form.receiver.id = response.data.receiver.id
            }).catch(error => {
                this.message.text = error.response.data.message
                this.message.show = true;
                this.message.variant = "danger"
                console.log(error.response.data.message)
            })
        },
        sacuvajPlan(evt) {
            evt.preventDefault()
            axios.post(FpisService.BASE_URL + FpisService.INTERNAL_CHECK_PLAN, this.form).then(response => {
                this.message.text = "Saved.ID:" + response.data.id
                this.message.show = true;
                this.message.variant = "success"
                console.log("Saved.ID:" + response.data.id)
            })
        },
        resetujFormu(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.id = ''
            this.form.date = ''
            this.form.checkSubject = ''
            this.form.description = ''
            this.form.sender = {}
            this.form.receiver = {}
            this.message = {
                text: '',
                variant: 'primary',
                show: false
            }
        }
    }
}
</script>

<style>

</style>
