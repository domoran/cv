<template>
    <div class="flex flex-col px-4 w-full">
        <!-- Company Card -->
        <highlight :word="searchWord">
            <div class="mt-6" v-for="company in projectList.filter(searchWord, props.category)">
                <!-- Company Header-->
                <div class="flex flex-row justify-between">
                    <div class="font-bold"> {{ company.company }}</div>
                    <div v-if="company.time.start && company.time.end" class="font-bold">{{ company.time.start }} - {{
                        company.time.end }}</div>
                    <div v-if="company.time.start && !company.time.end" class="font-bold">since {{ company.time.start }}
                    </div>
                </div>

                <!-- Position Header -->
                <div class="text-right"> {{ company.position }}</div>

                <!-- Achievements -->
                <div class="text-sm -mt-5 ml-1 break-inside-avoid" v-if="company.achievements.length">
                    <div v-if="company.achievements" class="font-semibold mt-3 text-base"> Achievements: </div>
                    <ul v-if="company.achievements" class="list-disc pl-4">
                        <li v-for="achievement in company.achievements">{{ achievement }}</li>
                    </ul>
                </div>

                <!-- Project Card -->
                <div v-for="project in company.projects"
                    class="relative pl-2 flex flex-row text-sm text-pretty w-full break-inside-avoid">
                    <!-- left line with circle -->
                    <div class="border-l-2 mt-8" v-if="!short">
                        <svg class="absolute inline-block -ml-[6px] -mt-[8px]" width="12" height="12">
                            <circle cx="5" cy="5" r="5" fill="#808080" />
                        </svg>
                    </div>

                    <!-- Project Content -->
                    <div class="w-full" v-if="!short">
                        <!-- Project Title  -->
                        <div v-if="project.name" class="mt-4 mb-1 ml-4 w-full">
                            <span class="font-semibold">Project:</span>
                            {{ project.name }} <span class="text-sm" v-if="project.customer">({{ project.customer }})</span>
                        </div>

                        <div v-if="project.time" class="-mb-6 w-full text-right text-xs">
                            <span v-if="project.time && (project.time.end || project.time.start)">(</span>
                            <span v-if="project.time && project.time.start">{{ project.time.start }}</span>
                            <span v-if="project.time && project.time.end"> - {{ project.time.end }}</span>
                            <span v-if="project.time && (project.time.end || project.time.start)">)</span>
                        </div>

                        <!-- Project Description -->
                        <div class="pl-2 ml-4">
                            <div v-if="project.description" class="mt-3">
                                <span class="font-semibold">Description: </span>
                                <p class="text-pretty"> {{ project.description }}</p>
                            </div>

                            <div v-if="project.tasks.length" class="mt-3">
                                <span class="font-semibold">Tasks: </span>
                                <ul v-if="project.tasks" class="list-disc pl-4">
                                    <li v-for="task in project.tasks">{{ task }}</li>
                                </ul>
                            </div>

                            <div v-if="project.technologies.length" class="mt-3">
                                <div class="font-semibold">Technologies: </div>
                                <p>
                                    <span v-for="technology, index in project.technologies">
                                        <span v-if="index != 0">, </span>
                                        {{ technology }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </highlight>
    </div>
</template>

<script setup lang="ts">
import projectList from './ProjectList'
import { h, defineComponent } from 'vue'

const props = defineProps(['category', "searchWord", "short"])

const highlight = defineComponent(
    (props, ctx) => {
        // use Composition API here like in <script setup>

        return () => {
            const childs = (ctx.slots && ctx.slots.default) ? ctx.slots.default() : []

            const keyword = props.word ? props.word : ''
            if (!keyword) return childs;

            function processItem(item: any) {
                if (item.children instanceof Array) {
                    return h(item.type, item.props, item.children.map(processItem))
                }

                if (typeof (item.children) == "string") {
                    const vals = item.children.split(new RegExp(`(${keyword})`, 'gi'));
                    const newChilds = vals.map((value: string) => {
                        if (value.toLowerCase() === keyword.toLowerCase()) {
                            return h('span', { style: { backgroundColor: 'yellow' } }, value);
                        } else {
                            return h('span', null, value)
                        }
                    });

                    const newType = item.type === Symbol.for('v-txt') ? "span" : item.type
                    const newNode = h(newType, item.props, newChilds)
                    return newNode
                }

            }

            const modified = childs.map(processItem)

            // render function or JSX
            return modified
        }
    },
    // extra options, e.g. declare props and emits
    {
        props: ['word']
    }
)

</script>