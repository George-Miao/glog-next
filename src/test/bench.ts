import { renderAllPost } from '../core/post/reduce'

const bench = async <T>(i: number, func: () => Promise<T> | T) => {
  const startMark = `start-${i}`,
    endMark = `end-${i}`
  performance.mark(startMark)
  await func()
  performance.mark(endMark)
  const { duration } = performance.measure('Start to end', startMark, endMark)
  console.log(`Took ${duration / 1000} s`)
}
;(async () => {
  for (let i = 0; i < 10; i++)
    await bench(i, renderAllPost)
})()

export {}
