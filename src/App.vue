<script setup lang="ts">
import {
  notes, activeIndex, current, rendered, editor,
  newNote, selectNote, format,
  contextIndex, isDark, toggleDark, onContextCommand,
} from './app'
</script>

<template>
  <el-container>
    <el-aside width="220px" class="flex flex-col">
      <div class="flex items-center justify-between p-2">
        <el-button type="primary" size="small" @click="newNote">+ New</el-button>
        <el-switch v-model="isDark" @change="toggleDark" />
      </div>
      <el-menu :default-active="activeIndex" @select="selectNote">
        <el-menu-item
          v-for="(note, i) in notes"
          :key="i"
          :index="String(i)"
        >
          <span class="truncate flex-1">{{ note.title || 'Untitled' }}</span>
          <el-dropdown trigger="click" @command="onContextCommand($event, i)" class="ml-auto cursor-pointer p-1 hover:bg-black/5 rounded">
            <span class="text-base leading-none">⋮</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="delete">Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <el-input v-model="current.title" placeholder="Title" size="large" />
      <div class="flex gap-1 my-2 flex-wrap">
        <el-button size="small" @click="format('**', '**')"><b>B</b></el-button>
        <el-button size="small" @click="format('*', '*')"><i>I</i></el-button>
        <el-button size="small" @click="format('# ')">H1</el-button>
        <el-button size="small" @click="format('## ')">H2</el-button>
        <el-button size="small" @click="format('### ')">H3</el-button>
        <el-button size="small" @click="format('- ')">List</el-button>
        <el-button size="small" @click="format('[](url)')">Link</el-button>
        <el-button size="small" @click="format('`', '`')">Code</el-button>
        <el-button size="small" @click="format('> ')">Quote</el-button>
      </div>
      <div class="flex gap-2.5" style="height: calc(100vh - 160px)">
        <el-input ref="editor" v-model="current.content" type="textarea" placeholder="Write markdown here..." class="flex-1 h-full" />
        <div v-html="rendered" class="flex-1 border border-[var(--el-border-color)] p-2.5 overflow-auto"></div>
      </div>
    </el-main>
  </el-container>
</template>
