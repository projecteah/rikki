import { ref } from Vue';

export const menuVisible = ref(false);
export const menuX = ref(0);
export const menuY = ref(0);
export const menuIndex = ref(0);

export const showMenu = (e, i) => {
  menuX.value = e.clientX;
  menuY.value = e.clientY;
  menuIndex.value = i;
  menuVisible.value = true;
};

export const hideMenu = () => { menuVisible.value = false };

document.addEventListener('click', hideMenu);
