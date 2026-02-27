import client from './client'

export async function loginWithGoogle({ email, name, google_id, photo_url }) {
  const { data } = await client.post('/auth/google/login', {
    email,
    name,
    google_id,
    photo_url,
  })
  return data
}

export async function getOverviewStats() {
  const { data } = await client.post('/admin/stats/overview')
  return data
}

export async function getUsersTrend(dias = 30) {
  const { data } = await client.post('/admin/stats/users-trend', { dias })
  return data
}

export async function getTrainingStats(dias = 30) {
  const { data } = await client.post('/admin/stats/training', { dias })
  return data
}

export async function getSquadsStats() {
  const { data } = await client.post('/admin/stats/squads')
  return data
}

export async function getAllUsers() {
  const { data } = await client.post('/obtenerTodosUsuarios')
  return data
}

export async function editUser({ idUser, coins, permisos, activo = 1 }) {
  const { data } = await client.put('/editarUsuario', {
    idUser,
    coins,
    permisos,
    activo,
  })
  return data
}

export async function getAppInfo() {
  const { data } = await client.post('/app/info')
  return data
}

export async function updateAppInfo(payload) {
  const { data } = await client.post('/app/update', payload)
  return data
}
