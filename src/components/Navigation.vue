<template>
  <div class="flex flex-col max-w-5xl p-2 h-dvh mx-auto">
    <!-- Header -->
    <div
      class="flex flex-row justify-between print:hidden *:flex-row *:flex *:*:flex *:*:flex-col *:*:justify-center *:*:px-2">
      <!-- Left Header -->
      <div class="gap-2 ">
        <div class="p-3">
          <Icon class="scale-[60%]" />
        </div>
        <div class="font-extrabold">Gabriela Marraca</div>
      </div>
      <!-- Right Header -->
      <div class="flex flex-row py-4">
        <div :class="{ open }" class="group relative sm:hidden">
          <div class="group place-items-center" @mouseenter="openMenu" @mouseleave="closeWithTimeout">
            <svg viewBox="0 0 100 80" width="30" height="30">
              <rect width="100" height="12"></rect>
              <rect y="30" width="100" height="12"></rect>
              <rect y="60" width="100" height="12"></rect>
            </svg>
          </div>
          <div
            class="absolute z-10 bg-slate-100 rounded-xl top-full right-0  min-w-[15em] min-h-[60%] text-nowrap duration-100 scale-x-0 translate-x-[50%] group-[.open]:scale-x-100 group-[.open]:translate-x-0">
            <div class="flex flex-col gap-2 py-6 px-4" @mouseenter="openMenu" @mouseleave="closeWithTimeout">
              <div class="hover:bg-slate-200 py-2 px-2 rounded-md" @click="() => category = 'Professional Experience'">
                Professional Experience</div>
              <div class="hover:bg-slate-200 py-2 px-2 rounded-md" @click="() => category = 'Education'">Education</div>
              <div class="hover:bg-slate-200 py-2 px-2 rounded-md" @click="() => { category = 'About'; }">About</div>
              <hline class="border-[1px] border-slate-300"></hline>
              <div class="hover:bg-slate-200 py-2 px-2 rounded-md" @click="() => { category = ''; }"
                on-click="window.print()">Print View</div>
            </div>
          </div>
        </div>

        <div class="hidden *:hidden sm:flex sm:flex-row sm:*:block gap-5 place-items-center cursor-pointer">
          <a @click="() => category = 'Professional Experience'">Professional Experience</a>
          <a @click="() => category = 'Education'">Education</a>
          <a @click="() => { category = ''; }">Print View</a>
          <a @click="() => { category = 'About'; }">About</a>
        </div>

      </div>


    </div>

    <div class="flex flex-col grow p-2 screen:hidden"
      v-if="category == 'Education' || category == 'Professional Experience'">
      <SectionHeader>{{ category }}</SectionHeader>

      <div class="flex flex-row justify-between gap-10 place-items-center">
        <SearchField v-if="category == 'Education' || category == 'Professional Experience'" v-model="searchWord">
        </SearchField>
        <div class="flex flex-row gap-3 text-nowrap">
          <input type="checkbox" v-model="showAll">
          <label>Display Projects</label>
        </div>
      </div>
      <Projects :category="category" :searchWord="searchWord" :short="!showAll" />
    </div>

    <div class="flex flex-col grow p-2 screen:hidden" v-if="category == ''">
      <SectionHeader>Professional Experience</SectionHeader>
      <Projects category="Professional Experience" :searchWord="searchWord" :short="!showAll" />

      <SectionHeader>Education</SectionHeader>
      <Projects category="Education" :searchWord="searchWord" :short="!showAll" />
    </div>

    <div class="px-6" v-if="category == 'About'">
      <SectionHeader class="my-2">About Me</SectionHeader>
      <div class="flex flex-row gap-6 w-full place-items-center">
        <img class="block rounded-2xl h-32 sm:h-52" aspect-square src="/photo.jpg">
        <p class="block text-justify">
          Hi, I am Gabriela Marraca and have been working as a software developer and architect for over 18 years.
          I like flat hierarchies, open doors, honest discussions, challenging problems, team events and good coffee.
          I can offer creativity, very good developer and operative skills, broad, state-of-the-art IT knowledge and
          abstract,
          analytical thinking. Through my work as a consultant and as an architect in the Silicon Valley I am used to adapting
          my communication style to diverse audiences.
        </p>
      </div>

      <SectionHeader class="mt-6 mb-4">About This Page</SectionHeader>
      <p class="block text-justify">
        I created this page, mainly to give a small showcase about my affinity for technology and software development.
        Also since 18 years of experience are a little dry and long to read I was hoping to make the information a little
        more accessible, by having it partioned and searchable on this page.
        <br /><br />
        I am planning to provide documents on this page and also a personal video explaining my background.
        Since this whole page was done very quickly, these informations are yet to come.
        <br /><br />
        The page is hosted on AWS via their CloudFront CDN and written in VueJS using TailwindCSS as a CSS framework.
        It describes my experiences from a <a class="text-blue-600 hover:text-blue-300" href="/lebenslauf.yaml">YAML
          file</a>.
        I conciously kept styling to a minimum.
        <br /><br />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import Icon from './icons/IconClass.vue'
import Projects from './projects/Projects.vue'
import SearchField from './projects/SearchField.vue';
import SectionHeader from './projects/SectionHeader.vue'

const category = ref("Professional Experience")
const showAll = ref(true)

const searchWord = ref("")
const open = ref(false)
const timer: Ref<number | undefined> = ref()

const clearTimer = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = undefined
  }
}

const openMenu = () => {
  open.value = true
  clearTimer()
}

const closeMenu = () => {
  open.value = false
}

const closeWithTimeout = () => {
  timer.value = setTimeout(closeMenu, 500)
}

</script>
