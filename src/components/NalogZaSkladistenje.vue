<template>
<b-container fluid>
    <b-row>
        <b-col>
            <b-form @submit="sacuvajNalog" @reset="resetujFormu">
                <b-form inline @submit="nadjiNalog">
                    <b-input-group prepend="Sifra" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input id="inline-form-input-sifra" v-model="nalog.id" type="number" placeholder="Unesi sifru naloga:"></b-form-input>
                    </b-input-group>
                    <b-button type="submit" variant="outline-primary">Pronadji</b-button>
                </b-form>
                <b-form-group id="input-group-datum" label="Datum:" label-for="input-datum">
                    <b-form-input id="input-datum" v-model="nalog.datum" type="date" required placeholder="Unesi datum"></b-form-input>
                </b-form-group>

                <b-card bg-variant="light">
                    <b-form @submit="sacuvajStavku" @reset="resetujStavku">
                        <b-form-group label-cols-lg="2" label="Stavke naloga" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0">
                            <b-table striped hover :items="items"></b-table>
                            <hr />
                            <b-form inline @submit="nadjiStavku">
                                <b-input-group prepend="R.B." class="mb-2 mr-sm-2 mb-sm-0">
                                    <b-input id="inline-form-input-name" v-model="nalog.rb" placeholder="Unesi redni broj stavke"></b-input>
                                </b-input-group>
                                <b-button type="submit" variant="outline-primary">Pronadji</b-button>
                            </b-form>
                            <b-form-group id="input-group-proizvod" label="Proizvod:" label-for="input-proizvod">
                                <b-form-select id="input-proizvod" v-model="nalog.proizvod" :options="optionsProizvod"></b-form-select>
                            </b-form-group>
                            <b-form-group id="input-group-kolicina" label="Kolicina:" label-for="input-group-kolicina">
                                <b-form-input id="input-kolicina" v-model="nalog.kolicina" type="number" placeholder="Unesi kolicinu"></b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-napomena" label="Napomena:" label-for="input-napomena">
                                <b-form-textarea id="input-napomena" v-model="nalog.napomena" required placeholder="Unesi napomenu" rows="3" max-rows="6"></b-form-textarea>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Ubaci</b-button>
                            <b-button variant="secondary">Izmeni</b-button>
                            <b-button variant="danger">Obrisi</b-button>
                        </b-form-group>

                    </b-form>
                </b-card>
                <hr />
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-col>
    </b-row>
    <b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ nalog }}</pre>
            </b-card>
</b-container>
</template>

<script>
export default {
    data() {
        return {
            nalog: {
                id: 0,
                datum: '',
                proizvod: 0,
                kolicina: 0,
                rb: 0,
                napomena: '',
            },
            optionsProizvod: [{
                    value: 1,
                    text: 'Proizvod 1'
                },
                {
                    value: 2,
                    text: 'Proizvod 2'
                },
                {
                    value: 3,
                    text: 'Proizvod 3'
                }
            ],
            items: [{
                    rb: 40,
                    proizvod: 'Dickerson',
                    kolicina: 'Macdonald',
                    napomena: ''
                },
                {
                    rb: 21,
                    proizvod: 'Larsen',
                    kolicina: 'Shaw',
                    napomena: ''
                },
                {
                    rb: 89,
                    proizvod: 'Geneva',
                    kolicina: 'Wilson',
                    napomena: ''
                },
                {
                    rb: 38,
                    proizvod: 'Jami',
                    kolicina: 'Carney',
                    napomena: ''
                }
            ]
        }
    },
    methods: {
        nadjiNalog(evt) {
            evt.preventDefault()
            console.log('Nadji nalog. ID: ' + this.nalog.id)
        },
        nadjiStavku(evt) {
            evt.preventDefault()
            console.log('Nadji stavku. RB: ' + this.nalog.rb)
        },
        sacuvajNalog(evt) {
            evt.preventDefault()
            console.log('sacuvaj nalog')
        },
        resetujFormu(evt) {
            evt.preventDefault()
        },
        sacuvajStavku(evt) {
            evt.preventDefault()
            console.log('stavku')
        },
        resetujStavku(evt) {
            evt.preventDefault()
        }

    }
}
</script>

<style>

</style>
