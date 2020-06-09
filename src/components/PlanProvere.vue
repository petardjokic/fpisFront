<template>
<b-jumbotron>
    <template v-slot:header>Internal check plan</template>

    <template v-slot:lead>
        <b-alert :show=message.show :variant=message.variant>{{message.text}}</b-alert>
    </template>

    <hr class="my-4">

    <b-container>
        <b-row>
            <b-col cols=12>
                <b-form @submit="sacuvajPlan" @reset="resetujFormu">
                    <b-form inline @submit="nadjiPlan">
                        <b-input-group prepend="ID" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input id="inline-form-input-sifra" v-model="form.id" type="number" placeholder="Plan ID:"></b-form-input>
                        </b-input-group>
                        <b-button type="submit" variant="outline-primary">Search</b-button>
                    </b-form>

                    <b-form-group id="input-group-datum" label="Date:" label-for="input-datum">
                        <b-form-input id="input-datum" v-model="form.date" type="date" required placeholder="Enter date"></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-predmetProvere" label="Check subject:" label-for="input-predmetProvere">
                        <b-form-input id="input-predmetProvere" v-model="form.checkSubject" required placeholder="Enter check subject"></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-opis" label="Description:" label-for="input-opis">
                        <b-form-textarea id="input-opis" v-model="form.description" required placeholder="Enter description" rows="3" max-rows="6"></b-form-textarea>
                    </b-form-group>
                    <b-row>
                        <b-col>
                            <b-form-group id="input-group-posaljilac" label="Sender:" label-for="input-posaljilac">
                                <b-form-select id="input-posaljilac" v-model="form.sender.id" :options="optionsZaposleni"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="input-group-primalac" label="Receiver:" label-for="input-primalac">
                                <b-form-select id="input-primalac" v-model="form.receiver.id" :options="optionsZaposleni"></b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-button-group>
                    <b-button type="submit" variant="outline-primary">Ok</b-button>
                    <b-button @click=obrisiPlan variant="outline-danger">Delete</b-button>
                    </b-button-group>
                </b-form>

            </b-col>
        </b-row>
    </b-container>
    <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
    </b-card> -->
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
            this.resetujMessage()
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
        obrisiPlan(){
            var url = FpisService.BASE_URL + FpisService.INTERNAL_CHECK_PLAN + this.form.id
            axios.delete(url).then(() => {
                this.resetujFormu()
                this.message.text = "Plan deleted!"
                this.message.show = true;
                this.message.variant = "success"
            }).catch(error => {
                this.message.text = "Invalid ID!"
                this.message.show = true;
                this.message.variant = "danger"
                console.log(error.response.data.message)
            })
        },
        sacuvajPlan(evt) {
            evt.preventDefault()
            axios.post(FpisService.BASE_URL + FpisService.INTERNAL_CHECK_PLAN, this.form).then(response => {
                this.resetujFormu()
                this.message.text = "Saved! ID: " + response.data.id
                this.message.show = true;
                this.message.variant = "success"
                console.log("Saved.ID:" + response.data.id)
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        resetujFormu() {
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
        },
        resetujMessage() {
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
