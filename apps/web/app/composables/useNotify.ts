import { useMessage } from 'naive-ui'

export function useNotify() {
	const message = useMessage()

	const success = (msg: string) => {
		message.success(msg)
	}

	const error = (msg: string) => {
		message.error(msg)
	}

	const warning = (msg: string) => {
		message.warning(msg)
	}

	return { success, error, warning }
}
