import { ThreadMessage, ThreadUser } from './ai-thread.types'

/**
 * Returns true if the given username has access to the thread.
 * Access is granted to the owner (username) or any participant.
 */
export function hasAccess(thread: { users: ThreadUser[] }, username: string): boolean {
  return thread.users.some((u) => u.userId === username)
}

/**
 * Returns true if the given username is the owner of the thread.
 * The owner is the first user in the users array.
 */
export function isOwner(thread: { users: ThreadUser[] }, username: string): boolean {
  return thread.users.length > 0 && thread.users[0]?.userId === username
}

export function partition(
  messages: ThreadMessage[],
  charBudget: number | undefined,
  ratio: number = 0.7
): {
  messages: ThreadMessage[]
  overflow: ThreadMessage[]
} {
  if (!charBudget || !messages.length) return { messages, overflow: [] }
  let overflowIndex = 0
  let count = 0
  const threshold = charBudget * ratio
  for (const message of messages) {
    count += message.length
    overflowIndex += count < threshold ? 1 : 0
  }
  if (count < charBudget) {
    return { messages, overflow: [] }
  }

  const underflow = messages.slice(0, overflowIndex)
  const overflow = messages.slice(overflowIndex)
  return {
    messages: underflow,
    overflow,
  }
}
