export default function getSettings() {
  if (localStorage.getItem('settings') !== null) {
    return JSON.parse(localStorage.getItem('settings') as string)
  } else {
    return false
  }
}
