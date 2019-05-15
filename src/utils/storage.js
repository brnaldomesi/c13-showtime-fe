const localStorageName = 'cadence__local_storage'

export function loadData() {
  try {
    const data = localStorage.getItem(localStorageName)
    return data ? JSON.parse(data) : {}
  } catch (e) {
    return {}
  }
}

export function saveData(data) {
  let savedData = loadData()
  savedData = savedData ? savedData : {}
  localStorage.setItem(
    localStorageName,
    JSON.stringify({
      ...savedData,
      ...data
    })
  )
}

export function clearData() {
  localStorage.setItem(localStorageName, JSON.stringify({}))
}
