<template>
    <div id="app" class="cart-form">

        <div class="cart-form__inputs">

            <div class="cart-form__col">
                <only-numbers-input
                        class="cart-form__input"
                        :value="currentPrice"
                        @input="onInputChangeDebounced('currentPrice', $event)"
                        placeholder="Price">
                </only-numbers-input>
                <div class="value-title">Price:</div>
                <div>{{ currentPrice }}</div>
            </div>

            <div class="cart-form__col">
                <only-numbers-input
                        class="cart-form__input"
                        :value="currentQuantity"
                        @input="onInputChangeDebounced('currentQuantity', $event)"
                        placeholder="Quantity">
                </only-numbers-input>
                <div class="value-title">Quantity:</div>
                <div>{{ currentQuantity }}</div>
            </div>

            <div class="cart-form__col">
                <only-numbers-input
                        class="cart-form__input"
                        :value="currentAmount"
                        @input="onInputChangeDebounced('currentAmount', $event)"
                        placeholder="Amount">
                </only-numbers-input>
                <div class="value-title">Amount:</div>
                <div>{{ currentAmount }}</div>
            </div>

            <div class="cart-form__col">
                <button class="cart-form__btn"
                        @click="submit"
                        :disabled="formInProcess">
                    Send
                </button>
                <div class="value-title">Saved data:</div>
                <div class="cart-form__code">{{ savedDataJSON }}</div>
            </div>

        </div>

        <div class="cart-form__log">
            <span class="cart-form__log-title">Logs</span>

            <div v-if="log.length">
                <p v-for="(logItem, index) in log"
                   :key="index + logItem.message"
                   :class="logItem.status ? logItem.status : ''">
                    {{ logItem.message }}
                </p>
            </div>
            <p v-else class="cart-form__log-placeholder">Events logging</p>
        </div>

        <DescriptionInfo></DescriptionInfo>
    </div>
</template>

<script>
import { debounce, capitalizeFirstLetter } from '@/helpers/utils';
import mockApi from '@/api/mockApi';
import { getStoreProp, setStoreProp } from '@/helpers/ls';
import DescriptionInfo from '@/components/DescriptionInfo.vue';
import OnlyNumbersInput from '@/components/OnlyNumbersInput.vue';

// props need be saved in LS
const persistProperties = [
    'currentPrice',
    'currentQuantity',
    'currentAmount',
    'currentNonce',
    'price',
    'quantity',
    'amount',
    'nonce',
    'log',
    'inputsMutationOrder',
]

export default {
    name: 'App', data() {
        return {

            // current values in inputs
            currentPrice: null,
            currentQuantity: null,
            currentAmount: null,
            currentNonce: 0,

            // saved values
            price: null,
            quantity: null,
            amount: null,
            nonce: null,

            log: [],

            inputsMutationOrder: ['currentPrice', 'currentQuantity', 'currentAmount'],

            formInProcess: false,
        }
    },

    computed: {
        earlierMutatedInput() {
            return this.inputsMutationOrder[2];
        },

        calculatingInput() {
            const nullInputs = this.inputsMutationOrder.filter(inputName => {
                return this[inputName] === null;
            })

            //  do nothing if filled only one input
            if (nullInputs.length === 2) {
                return null;
            }

            // if only one input haven't edited - calc value for it
            if (nullInputs.length === 1) {
                return nullInputs[0];
            }

            return this.earlierMutatedInput;
        },

        savedDataJSON() {
            return JSON.stringify({
                nonce: this.nonce,
                price: this.price,
                quantity: this.quantity,
                amount: this.amount
            });
        },

        currentDataJSON() {
            return JSON.stringify({
                nonce: this.currentNonce,
                price: this.currentPrice,
                quantity: this.currentQuantity,
                amount: this.currentAmount
            });
        },

    },

    methods: {
        calcInputValue() {
            if (this.calculatingInput === null) {
                return;
            }

            this[`calc${capitalizeFirstLetter(this.calculatingInput)}`]();
        },

        calcCurrentPrice() {
            if (this.currentAmount === '' || this.currentQuantity === '' || +this.currentQuantity === 0) {
                return;
            }
            this.currentPrice = String(this.currentAmount / this.currentQuantity);
        },

        calcCurrentQuantity() {
            if (this.currentAmount === '' || this.currentPrice === '' || +this.currentPrice === 0) {
                return;
            }
            this.currentQuantity = String(this.currentAmount / this.currentPrice)
        },

        calcCurrentAmount() {
            if (this.currentPrice === '' || this.currentQuantity === '') {
                return;
            }
            this.currentAmount = String(this.currentPrice * this.currentQuantity)
        },

        addLog({message, status}) {
            this.log.unshift({
                message, status
            });
        },

        submit() {
            this.addLog({message: `Send form data. Current saved data: ${this.savedDataJSON} Payload: ${this.currentDataJSON}`});
            this.formInProcess = true;

            mockApi.sendData({
                nonce: this.currentNonce,
                price: this.currentPrice,
                quantity: this.currentQuantity,
                amount: this.currentAmount
            }).then(({data}) => {
                this.nonce = data.nonce;
                this.price = data.price;
                this.quantity = data.quantity;
                this.amount = data.amount;
                this.currentNonce++;
                this.addLog({message: `Data saved successfully. New data: ${this.savedDataJSON}`, status: 'success'});
            }).catch(() => {
                this.addLog({message: `Error. Try later...`, status: 'error'})
            }).finally(() => {
                this.formInProcess = false;
            })
        },

        updateMutationOrder(changedInputName) {
            this.inputsMutationOrder = this.inputsMutationOrder.filter(inputName => inputName !== changedInputName);
            this.inputsMutationOrder.unshift(changedInputName);
        },

        initDataFromStore() {
            persistProperties.forEach(propName => {
                const propValue = getStoreProp(propName);
                if (propValue === null) {
                    return;
                }
                this[propName] = JSON.parse(propValue);
            })
        },

    },

    created() {
        this.onInputChangeDebounced = debounce((inputName, val) => {
            this[inputName] = val;
            this.updateMutationOrder(inputName);
            this.calcInputValue();
            this.addLog({message: `Input ${inputName.replace('current', '')} has changed`});
        })

        // watch props and save on change in LS
        persistProperties.forEach(propName => {
            this.$watch(vm => vm[propName], val => {
                setStoreProp(propName, JSON.stringify(val))
            })
        });

        this.initDataFromStore();
    },

    components: {
        DescriptionInfo,
        OnlyNumbersInput,
    },

}
</script>

<style src="./styles/app.scss" lang="scss"></style>
