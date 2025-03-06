<template>
  <HeaderFooter :selectedLanguage="selectedLanguage" :translations="translations">
    <div class="flex flex-col items-center justify-center p-6">
      <!-- Container met flexbox voor het uitlijnen in een rij -->
      <div class="flex flex-wrap justify-center gap-8">
        <!-- Feature Cards -->
        <FeatureCard
          v-for="feature in features[selectedLanguage]"
          :key="feature.title"
          :feature="feature"
        />
      </div>
    </div>
  </HeaderFooter>
</template>

<script setup>
import FeatureCard from '@/components/FeatureCard.vue';
import HeaderFooter from '~/components/Headerfooter.vue';

const selectedLanguage = ref('nl');

const translations = {
  nl: {
    title: "LittleStepsCare",
    subtitle: "Dé ultieme tool voor kinderopvang, ouders en nannies",
    experience: "Ervaring",
    features: "Functies",
    contact: "Contact",
    footer: "Alle rechten voorbehouden.",
  },
  en: {
    title: "LittleStepsCare",
    subtitle: "The ultimate tool for childcare, parents, and nannies",
    experience: "Experience",
    features: "Features",
    contact: "Contact",
    footer: "All rights reserved.",
  }
};

const features = {
  nl: [
    {
      title: "👶 Medewerkers Kinderopvang",
      description: "Houd eenvoudig kindprofielen bij, registreer dagverslagen met spraakgestuurde invoer en deel automatisch gegenereerde rapportages met ouders.",
      color: "bg-purple-200"
    },
    {
      title: "🏡 Voor Ouders",
      description: "Maak een digitaal bullet journal met foto's en verslagen van de opvang. Houd zelf de ontwikkeling van je kind bij en ontvang updates direct op je telefoon.",
      color: "bg-blue-200"
    },
    {
      title: "🍼 NannyCare",
      description: "Nannies kunnen hun beschikbaarheid, regio en tarieven invoeren, terwijl ouders eenvoudig een gekwalificeerde nanny in de buurt kunnen vinden en boeken.",
      color: "bg-green-200"
    },
    {
      title: "🤖 AI en Automatisering",
      description: "Gebruik AI-gestuurde spraakherkenning om dagverslagen te maken en laat het systeem automatisch foto's ordenen op basis van kindprofielen.",
      color: "bg-yellow-200"
    }
  ],
  en: [
    {
      title: "👶 Childcare Staff",
      description: "Easily track child profiles, register daily reports with voice input, and share automatically generated reports with parents.",
      color: "bg-purple-200"
    },
    {
      title: "🏡 For Parents",
      description: "Create a digital bullet journal with photos and reports from daycare. Keep track of your child's development and receive updates instantly.",
      color: "bg-blue-200"
    },
    {
      title: "🍼 NannyCare",
      description: "Nannies can enter their availability, region, and rates, while parents can easily find and book a qualified nanny nearby.",
      color: "bg-green-200"
    },
    {
      title: "🤖 AI & Automation",
      description: "Use AI-driven voice recognition to create daily reports and let the system automatically organize photos based on child profiles.",
      color: "bg-yellow-200"
    }
  ]
};
</script>

<style scoped>
/* Tailwind CSS zorgt voor de flex en layout */
</style>
