/*
 * @FilePath: /GS-admin/utils/cookie.ts
 * @author: Wibus
 * @Date: 2022-01-19 20:34:17
 * @LastEditors: Wibus
 * @LastEditTime: 2022-02-12 12:33:09
 * Coding With IU
 */
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

const TokenKey = 'gs-admin-token'

export function getToken(): string | null {
  const token = Cookies.get(TokenKey)
  const { access_token } = JSON.parse(token ?? '{}')
  return token ? `bearer ${access_token}` : null
}

export function setToken(token: string, expires: number | Date) {
  if (!token) {
    return
  }
  return Cookies.set(TokenKey, JSON.stringify(token), { expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
const LikePrefix = 'mx-like'
export function setLikeId(id: string) {
  const has = getLikes()
  if (!has) {
    Cookies.set(LikePrefix, JSON.stringify([id]), { expires: getTomorrow() })
  } else {
    if (isLikedBefore(id)) {
      return
    }
    Cookies.set(
      LikePrefix,
      JSON.stringify((JSON.parse(has) as string[]).concat(id)),
      { expires: getTomorrow() },
    )
  }
  // Cookies.set(LikePrefix + id, )
}

function getLikes() {
  return decodeURIComponent(Cookies.get(LikePrefix) ?? '')
}

export function isLikedBefore(id: string) {
  const has = getLikes()

  if (!has) {
    return false
  }
  const list = JSON.parse(has) as string[]
  // console.log(list, id, list.includes(id))

  return list.includes(id)
}

function getTomorrow() {
  return dayjs().add(1, 'd').set('h', 2).set('m', 0).toDate()
}
