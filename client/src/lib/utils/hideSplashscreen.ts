import { invoke } from '@tauri-apps/api/tauri'

export default async () => {
  await invoke('hide_splashscreen')
}
