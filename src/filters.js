import Vue from 'vue'

Vue.filter('currency', (val, displayType) => {
   if(typeof val !== 'number') return val;

   return new Intl.NumberFormat('be-BE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
   }).format(val);
});