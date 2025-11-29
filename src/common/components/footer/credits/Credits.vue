<script setup lang="ts">
  import Button from '@/common/components/ui/button/Button.vue';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/common/components/ui/dialog';

  const dataSources = [
    {
      name: 'Jeukendrup, A. (2014). A step towards personalized sports nutrition.',
      url: 'https://www.mysportscience.com/post/how-much-carbohydrate-can-you-really-absorb-per-hour',
    },
    {
      name: 'Jeukendrup, A. E. (2010). Carbohydrate and exercise performance.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/20351006/',
    },
    {
      name: 'Thomas, D. T. et al. (2016). Position of the Academy of Nutrition and Dietetics, Dietitians of Canada, and the ACSM: Nutrition and Athletic Performance.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26891166/',
    },
    {
      name: 'IOC Consensus Statement on Sports Nutrition (2010 & updates)',
      url: 'https://bjsm.bmj.com/content/44/10/647',
    },
    {
      name: 'ACSM Position Stand – Exercise and Fluid Replacement',
      url: 'https://pubmed.ncbi.nlm.nih.gov/15235353/',
    },
    {
      name: 'Sawka et al. (2007). Human hydration research',
      url: 'https://pubmed.ncbi.nlm.nih.gov/17622298/',
    },
    {
      name: 'Cheuvront & Kenefick. (2017). Sodium, fluid balance, and sweat rate references',
      url: 'https://journals.physiology.org/doi/full/10.1152/japplphysiol.00914.2016',
    },
    {
      name: 'Precision Hydration sweat-rate data',
      url: 'https://www.precisionhydration.com/pages/science',
    },
    {
      name: 'Baker et al. (2019). Variability of sweat sodium concentration in athletes',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30480738/',
    },
    {
      name: 'GSSI – sweat composition analysis',
      url: 'https://www.gssiweb.org/sports-science-exchange/article/sweat-rate-and-fluid-replacement',
    },
    {
      name: 'Precision Hydration – salt loss research summary',
      url: 'https://www.precisionhydration.com/pages/why-we-lose-salt-when-we-sweat',
    },
  ];
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="link"> Credits </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Credits</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h4 class="text-lg font-semibold">Visuals</h4>
            <div clas>
              <p>
                <strong>Runner's photo</strong> - Taken by me, at the Toronto Waterfront Marathon of
                2025
              </p>
              <p>
                <strong>Icons</strong> - Taken from
                <a href="https://lucide.dev/" target="_blank">Lucide</a>
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <h4 class="text-lg font-semibold">Data sources</h4>
            <ul>
              <li v-for="dataSource in dataSources" :key="dataSource.name">
                <a :href="dataSource.url" target="_blank">{{ dataSource.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>
