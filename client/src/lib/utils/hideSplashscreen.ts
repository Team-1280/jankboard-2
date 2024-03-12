import { invoke } from '@tauri-apps/api/tauri'

export default async () => {
  console.log('hiding')
  await invoke('close_splashscreen')
}
