export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const storage = useStorage('data')
    const reports = [] as any[]
    for (const month of body.months) {
      const data = await storage.getItem(`lighthouse/${body.year}-${month}.json`)
      reports.push(data)
    }

    return {
      status: 200,
      metrics: reports.reverse()
    }
  } catch (error: any) {
    throw createError({
      message: `Error Getting Lighthouse Metrics: ${error.message}`,
      statusCode: 404
    })
  }
})