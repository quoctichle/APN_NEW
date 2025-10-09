import { readFile } from 'fs/promises'
import { join } from 'path'

export default async (event: any) => {
  const filePath = join(process.cwd(), 'public', 'apndocomo.mobileconfig')
  try {
    const buf = await readFile(filePath)
    // Set headers to force download with correct Apple mobileconfig MIME type
    event.node.res.setHeader('Content-Type', 'application/x-apple-aspen-config')
    event.node.res.setHeader('Content-Disposition', 'attachment; filename="apn.mobileconfig"')
    event.node.res.setHeader('Content-Length', String(buf.length))
    return buf
  } catch (err) {
    event.node.res.statusCode = 404
    return { error: 'File not found' }
  }
}
