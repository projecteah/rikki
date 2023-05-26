import { ElMessage } from 'element-plus'

export function useNotify() {
  const success = (msg: string) => {
    ElMessage.success(msg)
  }

  const error = (msg: string) => {
    ElMessage.error(msg)
  }

  const warning = (msg: string) => {
    ElMessage.warning(msg)
  }

  return { success, error, warning }
}
